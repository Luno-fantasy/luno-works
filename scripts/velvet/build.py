"""Regenerate the static VELVET pages. Requires Python 3.9+."""
from html import escape
import json
from pathlib import Path
import re
import struct

SOURCE = Path(__file__).resolve().parent
SITE = SOURCE.parents[1] / "velvet"
ASSETS = SITE / "assets"
UNITS = json.loads((SOURCE / "artists.json").read_text(encoding="utf-8"))


def image_shape(name):
    """Read dimensions from the existing WebP assets, without Pillow at build time."""
    data = (ASSETS / name).read_bytes()
    if data[:4] != b"RIFF" or data[8:12] != b"WEBP":
        raise ValueError(f"Expected WebP: {name}")
    kind = data[12:16]
    if kind == b"VP8X":
        return int.from_bytes(data[24:27], "little") + 1, int.from_bytes(data[27:30], "little") + 1
    if kind == b"VP8 ":
        width, height = struct.unpack_from("<HH", data, 26)
        return width & 0x3FFF, height & 0x3FFF
    if kind == b"VP8L":
        bits = int.from_bytes(data[21:25], "little")
        return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    raise ValueError(f"Unknown WebP encoding: {name}")


def img(prefix, name, alt="", attributes="", *, size=None):
    width, height = size or image_shape(name)
    return (f'<img src="{prefix}assets/{name}" alt="{escape(alt)}" '
            f'width="{width}" height="{height}" decoding="async"{attributes}>')


def header(prefix, home):
    index = f"{prefix}index.html"
    home_current = ' aria-current="page"' if home else ""
    artists_current = '' if home else ' aria-current="location"'
    return f"""<a class="skip" href="#main">本文へ移動</a>
<header class="site-header">
  <div class="wrap header-row">
    <a class="logo" href="{index}">{img(prefix, 'velvet-logo.webp', 'VELVET ENTERTAINMENT ホーム')}</a>
    <nav class="site-nav" aria-label="メインメニュー" lang="en">
      <a href="{index}"{home_current}>HOME</a>
      <a href="{index}#artists"{artists_current}>ARTISTS</a>
      <a href="{index}#about">ABOUT</a>
    </nav>
  </div>
</header>"""


def footer(prefix):
    return f"""<footer class="site-footer">
  <div class="wrap footer-row">
    <p class="footer-brand" lang="en">{img(prefix, 'velvet-icon.webp')}VELVET ENTERTAINMENT</p>
    <a class="footer-link" href="{prefix}../home.html">ÉTERNOAへ戻る</a>
  </div>
</footer>"""


def document(title, description, prefix, body, home=False, extra_stylesheet=None):
    extra_css = (f'\n  <link rel="stylesheet" href="{prefix}{extra_stylesheet}">'
                 if extra_stylesheet else "")
    body_class = ' class="velvet-home"' if home else ""
    return f"""<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{escape(description)}">
  <title>{escape(title)}</title>
  <link rel="icon" type="image/webp" href="{prefix}assets/velvet-icon.webp">
  <link rel="stylesheet" href="{prefix}velvet.css">{extra_css}
</head>
<body{body_class}>
{header(prefix, home)}
{body}
{footer(prefix)}
</body>
</html>
"""


def home_artist_links():
    links = []
    for i, unit in enumerate(UNITS):
        key = unit["id"]
        loading = ' loading="lazy"' if i >= 2 else ""
        links.append(f"""<a class="home-artist" href="artists/{key}.html">
  {img('', key + '-banner.webp', unit['unit'], attributes=loading)}
</a>""")
    return "\n".join(links)


def home():
    sources = ' srcset="assets/velvet-hero-small.webp 720w, assets/velvet-hero.webp 1440w" sizes="(min-width: 1024px) 960px, (min-width: 720px) calc(100vw - 64px), 100vw" fetchpriority="high"'
    body = f"""<main id="main" tabindex="-1">
  <section class="home-hero" aria-labelledby="home-title">
    <h1 id="home-title" class="home-banner" lang="en">{img('', 'velvet-hero.webp', 'VELVET ENTERTAINMENT', sources)}</h1>
    <p class="home-line wrap"><span>ステージの上では、みんなのもの。</span><span>ステージを降りたら、君だけのもの。</span></p>
  </section>
  <section id="artists" class="home-artists" aria-labelledby="artists-heading">
    <div class="wrap">
      <h2 id="artists-heading" class="home-heading" lang="en">ARTISTS</h2>
      <div class="home-artist-grid">
        {home_artist_links()}
      </div>
    </div>
  </section>
  <section id="about" class="home-about" aria-labelledby="about-heading">
    <div class="wrap home-about-inner">
      <h2 id="about-heading" class="home-heading" lang="en">ABOUT</h2>
      <p><span lang="en">VELVET ENTERTAINMENT</span>は、アイドル、ボーカリスト、俳優、ダンサーなど、多彩なアーティストが所属する総合芸能事務所です。一人ひとりの才能と表現を大切にしています。</p>
    </div>
  </section>
</main>"""
    return document("VELVET ENTERTAINMENT", "VELVET ENTERTAINMENTの所属アーティストと作品。", "",
                    body, home=True, extra_stylesheet="home-editorial.css")


def work_actions(work, lead_cover):
    links = []
    for link in work["links"]:
        label = escape(link["platform"])
        artwork = link.get("cover")
        cover = img("../", artwork, attributes=' loading="lazy"') if artwork and artwork != lead_cover else ""
        if not link["url"].startswith("https://"):
            raise ValueError(f"Expected HTTPS link for {work['title']}")
        links.append(f'<a class="work-link" href="{escape(link["url"])}">{cover}{label}で読む</a>')
    if links:
        return '<div class="work-links">' + "".join(links) + '</div>'
    status = "作品公開予定" if work.get("upcoming") else f'{work["platform"]}リンクは未設定です。'
    return f'<p class="unset">{escape(status)}</p>'


def editorial_text(value):
    """Use | for optional breaks, ~ for mobile lines, and ^ for mobile copy blocks."""
    blocks = []
    for block in value.split("^"):
        lines = (
            "<wbr>".join(f'<span class="editorial-phrase">{escape(part)}</span>'
                        for part in line.split("|"))
            for line in block.split("~")
        )
        blocks.append('<br class="editorial-mobile-break">'.join(lines))
    return blocks[0] + "".join(f'<span class="editorial-copy-block">{block}</span>'
                               for block in blocks[1:])


def profile_facts(member):
    entries = "".join(f"<div><dt>{escape(key)}</dt><dd>{editorial_text(value.replace('、', '、|'))}</dd></div>"
                      for key, value in member.get("facts", {}).items())
    return f"<dl>{entries}</dl>" if entries else ""


def other_artist_links(unit):
    return "\n".join(f'<a href="{other["id"]}.html" lang="en" style="--accent:{other["color"]}">{escape(other["unit"])}</a>'
                     for other in UNITS if other["id"] != unit["id"])


def editorial_profiles(members):
    if len(members) == 1:
        member = members[0]
        terms = member.get("bio_keep_together", [])
        term_pattern = re.compile("(" + "|".join(map(re.escape, terms)) + ")") if terms else None
        paragraphs = []
        for paragraph in [member["intro"], *member["bio"]]:
            if any(marker in paragraph for marker in "|~^"):
                body = editorial_text(paragraph)
            else:
                lines = []
                for line in paragraph.split("\n"):
                    parts = term_pattern.split(line) if term_pattern else [line]
                    lines.append("".join(
                        f'<span class="editorial-phrase">{escape(part)}</span>' if index % 2 else escape(part)
                        for index, part in enumerate(parts)
                    ))
                body = '<br class="editorial-mobile-break">'.join(lines)
            paragraphs.append(f"<p>{body}</p>")
        bio = "\n".join(paragraphs)
        return f"""<div class="editorial-profile-content">
      <div class="editorial-bio">{bio}</div>
      {profile_facts(member)}
    </div>"""
    profiles = []
    for member in members:
        bio = "\n".join(f"<p>{editorial_text(line)}</p>" for line in member["bio"])
        profiles.append(f"""<article>
        <h3>{escape(member['name'])}</h3>
        <div class="editorial-bio">{bio}</div>
        {profile_facts(member)}
      </article>""")
    return '<div class="editorial-roster">\n      ' + "\n      ".join(profiles) + '\n    </div>'


def detail(unit):
    key = unit["id"]
    members = unit["members"]
    group = len(members) > 1
    member = members[0]
    work = unit["work"]
    work_title = escape(work["title"])
    if "、" in work["title"]:
        first, rest = work["title"].split("、", 1)
        work_title = f'<span>{escape(first)}、</span><wbr><span>{escape(rest)}</span>'
    name = unit["unit"] if group else member["name"]
    roman = member.get("roman")
    name_text = escape(name)
    if roman:
        name_text = (f'<span class="editorial-roman" lang="en">{escape(roman)}</span>'
                     f'<span class="editorial-native-name">{name_text}</span>')
    heading_lang = ' lang="en"' if group else ""
    role = member.get("role")
    role_lang = ' lang="en"' if role and role.isascii() else ""
    role_line = f'<span{role_lang}>{escape(role)}</span>' if role else ""
    catch = unit.get("catchphrase") or unit.get("caption")
    theme = '' if key == "lux" else f' data-unit="{key}"'
    photo_alt = f"{name}の集合ビジュアル" if group else f"{name}のステージビジュアル"
    if group:
        photo_alt = f"{name}の三人の目元を並べたビジュアル"
    photo = img("../", unit["portrait"], photo_alt, ' fetchpriority="high"',
                size=unit.get("portrait_size"))
    unit_alt = "" if group else unit["unit"]
    body = f"""<main id="main" class="artist-editorial"{theme} tabindex="-1">
  <section class="wrap editorial-hero" aria-labelledby="artist-name">
    <figure class="editorial-photo">{photo}</figure>
    <div class="editorial-identity">
      <h1 id="artist-name" class="editorial-name{' editorial-display-name' if group else ''}"{heading_lang}>{name_text}</h1>
      <div class="editorial-unit">
        {img('../', unit['id'] + '-banner.webp', unit_alt)}
        <p>{role_line}<span>{escape(unit['type'])}</span></p>
      </div>
      <p class="editorial-catch">{editorial_text(catch)}</p>
    </div>
  </section>
  <section class="editorial-work" aria-labelledby="work-title">
    <div class="wrap editorial-release">
      {img('../', unit['feature'], f'『{work["title"]}』のカバー')}
      <div class="editorial-release-copy">
        <p class="editorial-label" lang="en">WORK</p>
        <h2 id="work-title">{work_title}</h2>
        <p class="editorial-work-intro">{editorial_text(work['intro'])}</p>
      </div>
      <div class="editorial-platform">{work_actions(work, unit['feature'])}</div>
    </div>
  </section>
  <section class="wrap editorial-profile" aria-labelledby="profile-heading">
    <h2 id="profile-heading" lang="en">PROFILE</h2>
    {editorial_profiles(members)}
  </section>
  <nav class="wrap editorial-other" aria-labelledby="other-heading">
    <h2 id="other-heading" lang="en">OTHER ARTISTS</h2>
    <div class="editorial-other-links">{other_artist_links(unit)}</div>
  </nav>
</main>"""
    title = f"{name} | VELVET ENTERTAINMENT" if group else f"{name} | {unit['unit']} | VELVET ENTERTAINMENT"
    return document(title, f"{name}のプロフィールと作品。", "../", body,
                    extra_stylesheet="artist-editorial.css")


if __name__ == "__main__":
    target = SITE / "artists"
    target.mkdir(exist_ok=True)
    (SITE / "index.html").write_text(home(), encoding="utf-8")
    for item in UNITS:
        (target / (item["id"] + ".html")).write_text(detail(item), encoding="utf-8")
