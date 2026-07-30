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
    <a class="brief-guide-link" href="index.html#boss-${boss.id}">看攻略</a>
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
      <h4>时间轴提醒</h4>
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
</article>`;
      })
      .join("");

  }

  renderNav();
  renderCards();
})();
