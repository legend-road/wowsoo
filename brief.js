(function () {
  const briefRoot = document.getElementById("briefList");
  const navRoot = document.getElementById("briefNav");
  if (!briefRoot || !window.SOO || !window.SOO_BRIEF) return;

  const bosses = window.SOO.bosses;
  const byId = Object.fromEntries(window.SOO_BRIEF.map((b) => [b.id, b]));

  function li(items) {
    return items.map((t) => `<li>${t}</li>`).join("");
  }

  function renderNav() {
    if (!navRoot) return;
    navRoot.innerHTML = bosses
      .map(
        (b) =>
          `<a href="#brief-${b.id}" class="brief-nav-link"><span class="brief-nav-idx">${b.idx}</span>${b.name}</a>`
      )
      .join("");
  }

  function renderCards() {
    briefRoot.innerHTML = bosses
      .map((boss) => {
        const br = byId[boss.id];
        if (!br) return "";
        return `
<article class="brief-card" id="brief-${boss.id}">
  <header class="brief-card-head">
    <span class="brief-idx">${boss.idx}</span>
    <div>
      <h3>${boss.name}</h3>
      <p class="brief-meta">${boss.en} · ${boss.zone} · 英雄</p>
    </div>
    <a class="brief-guide-link" href="h10.html#boss-${boss.id}">10H 详解</a>
  </header>

  <p class="brief-pull"><strong>开打前：</strong>${br.pull}</p>

  <div class="brief-grid">
    <section>
      <h4>人员分工</h4>
      <ul>${li(br.assign)}</ul>
    </section>
    <section>
      <h4>站位要点</h4>
      <ul>${li(br.positions)}</ul>
    </section>
    <section>
      <h4>时间轴 / 减伤提醒</h4>
      <ul>${li(br.timeline)}</ul>
    </section>
    <section class="brief-callouts">
      <h4>建议喊话</h4>
      <ul class="callout-chips">${br.callouts.map((c) => `<li>${c}</li>`).join("")}</ul>
    </section>
  </div>

  <section class="brief-red">
    <h4>红线（易灭）</h4>
    <ul>${li(br.redlines)}</ul>
  </section>
  <p class="brief-more"><a href="h10.html#boss-${boss.id}">查看该 Boss 10H 详解 →</a> · <a href="cds.html#cds-${boss.id}">减伤循环 →</a></p>
</article>`;
      })
      .join("");

  }

  renderNav();
  renderCards();
})();
