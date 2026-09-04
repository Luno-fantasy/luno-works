(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA) return;
  if (!Array.isArray(DATA.series)) DATA.series = [];
  const existing = DATA.series.find(item => String(item?.id || "") === "velvet-night");
  const series = {
    id:"velvet-night",
    name:"VELVET NIGHT",
    type:"series",
    works:["velvet-night-mikado-reiji","velvet-night-amagi-yo"]
  };
  if (existing) Object.assign(existing, series);
  else DATA.series.push(series);
})();