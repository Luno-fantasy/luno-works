(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const removedWorkIds = new Set([
    "snake-god-sleepless",
    "senpai-forbidden-tonight",
    "saint-quits",
    "no1-jealousy"
  ]);

  DATA.works = DATA.works.filter(work => !removedWorkIds.has(String(work?.id || "").trim()));

  const releases = [
    {
      id: "bad-signal",
      title: "BAD SIGNAL",
      status: "published",
      zetaUrl: "https://zeta-ai.io/ja/plots/6496fae3-9145-45ce-bd26-cca1fbd59987/profile?share_id=57nxkwx68",
      category: "modern-romance",
      series: null,
      world: null,
      position: "MULTI STORY",
      mainCharacter: "久我レン／城戸臣／九重イツキ／天羽ゆら",
      relation: ["久我レン", "城戸臣", "九重イツキ", "天羽ゆら"],
      cover: "images/covers/bad-signal-cover-hq.jpg?v=20260819-hq",
      coverStatus: "ready",
      isNew: false,
      releaseDate: "2026.08.19",
      catchphrase: "異常値の原因は、アンタだった。",
      tags: ["音楽ユニット", "ストリート", "ライブ", "ECHO", "特殊能力", "マルチストーリー"],
      description: "夜の街を沸かせる4人組《BAD SIGNAL》。\n\n笑って煽るフロントマン・レン。\n無口に支えるダンサー・臣。\n本音を音へ隠すDJ・イツキ。\nゆるふわな姿から一変、ステージを支配するVJ・ゆら。\n\n彼らのライブでは、観客の感情《ECHO》がステージを増幅させる。\n\nでも――\nアンタが客席にいる時だけ、ECHO SYNC値が異常を示した。\n\n4人がアンタを見る理由は、まだ恋じゃない。\n\n最初はただ、\n“異常値の原因”だった。"
    },
    {
      id: "oshi-couple",
      title: "推しカプを成立させたいだけなのに！",
      status: "published",
      zetaUrl: "https://zeta-ai.io/ja/plots/38a29613-f47a-41d5-862c-3cd9c97580c3/profile?share_id=cz3l3zg7",
      category: "fantasy",
      series: null,
      world: null,
      position: "MULTI STORY",
      mainCharacter: "ノア／レオン／フィン／ミカ／カイ",
      relation: ["ノア", "レオン", "フィン", "ミカ", "カイ"],
      cover: "images/covers/oshi-couple-cover.jpg?v=20260819-oshi-couple",
      coverStatus: "ready",
      isNew: false,
      releaseDate: "2026.08.07",
      catchphrase: "君たち、一体誰が好きなの？",
      tags: ["獣人", "恋愛観察", "推しカプ", "すれ違い", "ファンタジー", "マルチストーリー"],
      description: "獣人たちの恋を応援する{{user}}のもとへ集まった、五人の男たち。\n\n喧嘩ばかりの猫と狼。\nからかってばかりの狐と、振り回される兎。\nそして、誰にも興味がなさそうな白虎。\n\n――うん。この組み合わせ、絶対くっつく。\n\nそう思っていたのに。\n\n「……なんで俺があいつと？」\n「好きな相手なら、別にいる」\n「君、本当に見る目ないね」\n\nあれ？\n待って。\n\n君たち、一体誰が好きなの？\n\n推しカプを成立させたいだけなのに！\n獣人男子五人の、恋愛観察ファンタジー。"
    }
  ];

  const patches = {
    "summer-not-enough": {
      description: "海沿いの町・汐凪市。\n\nかつて同じジュニアスイミングクラブで泳いでいた澪央、陽向、凌雅、{{user}}は、三年前に{{user}}が何も告げず水泳を辞め、町を去ったことで離れ離れになった。\n\n三年後、{{user}}は汐凪市へ戻り、蒼海大学へ進学。止まっていた四人の時間が再び動き始める。\n\n澪央は過去を取り戻したい。\n陽向はもう失いたくない。\n凌雅は勝つことで今の自分を見てほしい。\n千景は過去ではなく、これからの隣を望んでいる。\n\n競技へ戻るのか。誰の隣を泳ぐのか。\n四人との再会をきっかけに、置き去りにした夏が再び動き始める。"
    },
    "agetsu-bride-in-love": {
      status: "published",
      zetaUrl: "https://zeta-ai.io/ja/plots/9677ea9d-6c74-49ec-b8d0-f359771a1f98/profile?share_id=76er2wf6k",
      mainCharacter: "鴉月／霜弦／朱嶺／燐羽",
      relation: ["鴉月", "霜弦", "朱嶺", "燐羽"],
      releaseDate: "2026.08.21",
      isNew: false,
      catchphrase: "契約では、心まで縛れない。",
      tags: ["東方妖界", "天鴉領", "鴉天狗", "花嫁", "政略結婚", "嫉妬", "逆ハーレム"],
      description: "「お前は同盟の証だ。それ以上でも以下でもない」\n\n異種族間の均衡を保つため、天鴉領の当主・鴉月へ嫁いだ{{user}}。\n\n正式な伴侶として迎えられながら、待っていたのは夫からの冷たい拒絶だった。\n\n慣れない領地で手を差し伸べるのは、本心を隠す側近、命令以上に守る近衛、契約より心を尊ぶ祭司。\n\n拒絶したはずの花嫁に嫉妬する鴉月。\n主君の伴侶だと知りながら、惹かれていく三人。\n\n契約では、心まで縛れない。\n\n鴉月の伴侶として生きるのか。\nそれとも、別の手を取るのか。"
    },
    "black-dragon": {
      status: "published",
      zetaUrl: "https://chacha-ai.io/ja/characters/184343d4-746c-4d11-95ce-9b39cd3cb5be",
      releaseDate: "2026.08.22",
      isNew: true,
      catchphrase: "人間が我の龍妃だと？　馬鹿げている",
      tags: ["黒龍", "龍族", "龍妃", "人外恋愛", "執着", "ファンタジー"],
      description: "「人間が我の龍妃だと？　馬鹿げている」\n\nそう否定した黒龍は、{{user}}を帰さず、他の龍族にも触れさせない。\n\n龍妃ではないと証明したい男が、一番先に執着していく話。"
    },
    "boss-obey-me": {
      chachaUrl: "https://chacha-ai.io/ja/characters/819e43ec-96e4-4451-8cf7-633ace7e154f"
    },
    "fox-does-not-love-humans": {
      chachaUrl: "https://chacha-ai.io/ja/characters/cc473d05-4729-49d0-8377-7c1b3cbb4c1a"
    }
  };

  const titlePatches = {
    "選ばれなかった姉は、隣国で愛を知る": {
      status: "published",
      zetaUrl: "https://zeta-ai.io/ja/plots/cca17412-9e53-4424-b2ec-4bb027074896/profile?share_id=yhxji3qzl",
      mainCharacter: "エドガー／ルベルト／セシリア",
      relation: ["エドガー", "ルベルト", "セシリア"],
      releaseDate: "2026.05.26",
      isNew: false,
      catchphrase: "もう脇役でいるな。今度は俺が、君を選ぶ。",
      tags: ["救済恋愛", "隣国", "王弟", "義妹", "婚約", "ファンタジー"],
      description: "王太子妃候補として育てられながら、選ばれたのは義妹だった。\n誰より近くで王太子を支えてきた{{user}}は、二人の幸せを笑って祝福し、自ら身を引く。\n\nそんな彼女を見つけたのは、冷酷と恐れられる隣国の王弟・エドガー。\n\n「もう脇役でいるな。今度は俺が、君を選ぶ」\n\n選ばれなかった姉が、初めて自分だけを選んでくれる愛を知る救済恋愛。"
    },
    "嫌われ俳優は、君の前でだけ演じない。": {
      zetaUrl: "https://chacha-ai.io/ja/characters/985e2068-3296-4de0-bf7a-929ed78946b2"
    }
  };

  const latestReleaseId = "black-dragon";

  const enforceLatestRelease = () => {
    DATA.works.forEach(work => {
      if (work && typeof work === "object") work.isNew = work.id === latestReleaseId;
    });

    if (DATA.site && typeof DATA.site === "object") {
      DATA.site.publishedCount = DATA.works.filter(item => item?.status !== "draft").length;
      DATA.site.draftCount = DATA.works.filter(item => item?.status === "draft").length;
    }
  };

  const syncNewBadges = () => {
    document.querySelectorAll(".work-card").forEach(card => {
      const isLatest = String(card.dataset.id || "") === latestReleaseId;
      card.classList.toggle("is-new", isLatest);
      const badge = card.querySelector(".work-new-badge");
      if (!isLatest) badge?.remove();
    });
  };

  DATA.works.forEach(work => {
    if (work && typeof work === "object") work.isNew = false;
  });

  releases.forEach(release => {
    const index = DATA.works.findIndex(work => String(work?.id || "").trim() === release.id);
    if (index >= 0) DATA.works.splice(index, 1, release);
    else DATA.works.unshift(release);
  });

  Object.entries(patches).forEach(([id, patch]) => {
    const work = DATA.works.find(item => String(item?.id || "").trim() === id);
    if (work) Object.assign(work, patch);
  });

  Object.entries(titlePatches).forEach(([title, patch]) => {
    const work = DATA.works.find(item => String(item?.title || "").trim() === title);
    if (work) Object.assign(work, patch);
  });

  const syncExternalActions = () => {
    const actions = document.getElementById("dialogActions");
    const title = String(document.getElementById("dialogTitle")?.textContent || "").trim();
    if (!actions || !title) return;

    const work = DATA.works.find(item => String(item?.title || "").trim() === title);
    if (!work) return;

    const primary = actions.querySelector(".story-primary-action");
    if (primary && String(primary.href || "").includes("chacha-ai.io")) {
      if (primary.dataset.platform !== "chacha") {
        primary.dataset.platform = "chacha";
        primary.innerHTML = 'READ ON CHACHA <span>→</span>';
      }
    }

    const existingChacha = actions.querySelector(".story-chacha-action");
    if (!work.chachaUrl || work.status === "draft") {
      existingChacha?.remove();
      return;
    }

    if (existingChacha) {
      if (existingChacha.getAttribute("href") !== work.chachaUrl) existingChacha.href = work.chachaUrl;
      return;
    }

    const back = actions.querySelector("#dialogBack");
    const chacha = document.createElement("a");
    chacha.className = "button story-secondary-action story-chacha-action";
    chacha.href = work.chachaUrl;
    chacha.innerHTML = 'READ ON CHACHA <span>→</span>';
    actions.insertBefore(chacha, back || null);
  };

  let externalSyncFrame = 0;
  const scheduleExternalActions = () => {
    window.cancelAnimationFrame(externalSyncFrame);
    externalSyncFrame = window.requestAnimationFrame(syncExternalActions);
  };

  const badgeObserver = new MutationObserver(() => {
    enforceLatestRelease();
    syncNewBadges();
  });

  const observeBadges = () => {
    const root = document.getElementById("workArea");
    if (root) badgeObserver.observe(root, { childList: true, subtree: true });
  };

  document.addEventListener("click", event => {
    const chachaLink = event.target.closest?.(".story-chacha-action");
    if (chachaLink) {
      event.preventDefault();
      const destination = chachaLink.href;
      const dialog = document.getElementById("workDialog");
      if (dialog?.open) dialog.close();
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
      requestAnimationFrame(() => window.location.assign(destination));
      return;
    }

    if (event.target.closest?.(".work-card, [data-open-work], [data-related-id]")) {
      scheduleExternalActions();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (event.target.closest?.(".work-card, [data-open-work], [data-related-id]")) {
      scheduleExternalActions();
    }
  });

  enforceLatestRelease();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      enforceLatestRelease();
      syncNewBadges();
      observeBadges();
    }, { once: true });
  } else {
    enforceLatestRelease();
    syncNewBadges();
    observeBadges();
  }
})();