(function () {
  const data = window.SOO_ROSTER_BRIEF;
  const nav = document.getElementById("rbNav");
  const list = document.getElementById("rbList");
  if (!data || !nav || !list) return;

  const titleEl = document.getElementById("rbTitle");
  const leadEl = document.getElementById("rbLead");
  if (titleEl) titleEl.textContent = data.title;
  if (leadEl) leadEl.textContent = data.lead;

  function ul(items) {
    if (!items || !items.length) return "<p class='brief-empty'>待补充</p>";
    return `<ul>${items.map((t) => `<li>${t}</li>`).join("")}</ul>`;
  }

  function chips(items) {
    if (!items || !items.length) return "";
    return `<ul class="callout-chips">${items
      .map((c) => `<li>${c}</li>`)
      .join("")}</ul>`;
  }

  function rosterBlock() {
    const r = data.roster;
    const people = (r.members || [])
      .map(
        (m) =>
          `<span class="rb-tag rb-tag--${m.role === "坦" ? "tank" : m.role === "治疗" ? "heal" : "dps"}"><strong>${m.tag}</strong> ${m.spec}${m.flex ? ` <em>${m.flex}</em>` : ""}</span>`
      )
      .join("");
    const order = (r.cdsOrder || [])
      .map(
        (c) => `
      <article class="rb-cd-slot rb-cd-slot--dr">
        <h5><span class="rb-cd-num">${c.slot}</span>${c.who}</h5>
        <p class="rb-cd-skills">${c.skills || ""}</p>
        <p>${c.note || ""}</p>
      </article>`
      )
      .join("");
    const heals = (r.healOrder || [])
      .map(
        (c) => `
      <article class="rb-cd-slot rb-cd-slot--heal">
        <h5><span class="rb-cd-num rb-cd-num--heal">${c.slot}</span>${c.who}</h5>
        <p class="rb-cd-skills">${c.skills || ""}</p>
        <p>${c.note || ""}</p>
      </article>`
      )
      .join("");
    return `
    <article class="brief-card" id="rb-roster">
      <header class="brief-card-head">
        <span class="brief-idx">编</span>
        <div>
          <h3>固定阵容</h3>
          <p class="brief-meta">${r.note || ""}</p>
        </div>
      </header>
      <div class="brief-card-body">
        <div class="rb-tags">${people}</div>
        <h4>团减轮次（喊 1减 / 2减 / 3减）</h4>
        <div class="rb-cd-grid">${order}</div>
        <h4>抬血轮次（喊 1抬 / 2抬 / 3抬）</h4>
        <div class="rb-cd-grid">${heals}</div>
        <h4>补充说明</h4>
        ${ul(r.cdsHome)}
      </div>
    </article>`;
  }

  function bossCard(b) {
    if (b.status === "pending") {
      return `
<article class="brief-card rb-pending" id="rb-${b.id}">
  <header class="brief-card-head">
    <span class="brief-idx">${b.idx}</span>
    <div>
      <h3>${b.name}</h3>
      <p class="brief-meta">待共建</p>
    </div>
    <a class="brief-guide-link" href="h10.html#boss-${b.id}">10H 详解</a>
  </header>
  <p class="brief-empty">本 Boss 浓缩版尚未填写——聊到这里时再补。</p>
</article>`;
    }

    return `
<article class="brief-card" id="rb-${b.id}">
  <header class="brief-card-head">
    <span class="brief-idx">${b.idx}</span>
    <div>
      <h3>${b.name}</h3>
      <p class="brief-meta">本团浓缩 · 10H</p>
    </div>
    <a class="brief-guide-link" href="h10.html#boss-${b.id}">10H 详解</a>
  </header>

  <p class="brief-pull"><strong>开打前：</strong>${b.pull || ""}</p>

  <div class="brief-grid">
    <section>
      <h4>点名分工</h4>
      ${ul(b.assign)}
    </section>
    <section>
      <h4>检查项</h4>
      ${ul(b.checks)}
    </section>
    <section>
      <h4>减伤点名</h4>
      ${ul(b.cds)}
    </section>
    <section class="brief-callouts">
      <h4>建议喊话</h4>
      ${chips(b.callouts)}
    </section>
  </div>

  <section class="brief-red">
    <h4>红线</h4>
    ${ul(b.redlines)}
  </section>

  <p class="brief-more">
    <a href="h10.html#boss-${b.id}">10H 详解 →</a> ·
    <a href="cds.html#cds-${b.id}">减伤循环 →</a>
  </p>
</article>`;
  }

  nav.innerHTML = [
    `<a class="brief-nav-link" href="#rb-roster">编制</a>`,
    ...(data.bosses || []).map((b) => {
      const mark = b.status === "pending" ? " · 待" : "";
      return `<a class="brief-nav-link" href="#rb-${b.id}"><span class="brief-nav-idx">${b.idx}</span>${b.name}${mark}</a>`;
    }),
  ].join("");

  list.innerHTML =
    rosterBlock() + (data.bosses || []).map(bossCard).join("");
})();
