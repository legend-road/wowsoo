(function () {
  const data = window.SOO_CDS;
  const nav = document.getElementById("cdsNav");
  const list = document.getElementById("cdsList");
  if (!data || !nav || !list) return;

  const titleEl = document.getElementById("cdsTitle");
  const leadEl = document.getElementById("cdsLead");
  const rosterEl = document.getElementById("cdsRoster");
  if (titleEl) titleEl.textContent = data.title;
  if (leadEl) leadEl.textContent = data.lead;
  if (rosterEl) rosterEl.textContent = data.rosterNote || "";

  function cardGrid(items, kind) {
    return `<div class="cds-card-grid">${(items || [])
      .map(
        (s) => `
      <article class="cds-card cds-card--${kind}">
        <h5>${s.name}<span>${s.who || ""}</span></h5>
        ${s.effect ? `<p class="cds-effect">${s.effect}${s.cd ? ` · ${s.cd}` : ""}</p>` : ""}
        <p>${s.tip || ""}</p>
      </article>`
      )
      .join("")}</div>`;
  }

  function compsBlock() {
    return `<div class="cds-comp-grid">${(data.comps || [])
      .map(
        (c) => `
      <article class="cds-comp">
        <h5>${c.name}</h5>
        <p class="cds-comp-heals">${(c.healers || []).join(" · ")}</p>
        <p>${c.note || ""}</p>
      </article>`
      )
      .join("")}</div>`;
  }

  function bossBlock(b) {
    const rows = (b.slots || [])
      .map(
        (s) => `
      <tr>
        <th scope="row">${s.when}</th>
        <td><span class="cds-tag cds-tag-dr">减</span>${s.dr || "—"}</td>
        <td><span class="cds-tag cds-tag-heal">抬</span>${s.heal || "—"}</td>
        <td>${s.note || ""}</td>
      </tr>`
      )
      .join("");
    return `
    <article class="brief-card cds-boss" id="cds-${b.id}">
      <header class="brief-card-head">
        <h3>${b.name}</h3>
      </header>
      <div class="brief-card-body">
        <div class="cds-table-wrap">
          <table class="cds-table">
            <thead>
              <tr>
                <th>时机</th>
                <th>团减 / 外置</th>
                <th>抬血</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </article>`;
  }

  nav.innerHTML = `
    <a class="brief-nav-link" href="#cds-ref">技能速查</a>
    <a class="brief-nav-link" href="#cds-rules">排表原则</a>
    ${(data.bosses || [])
      .map(
        (b) =>
          `<a class="brief-nav-link" href="#cds-${b.id}" data-boss-id="${b.id}">${b.name}</a>`
      )
      .join("")}`;

  list.innerHTML = `
    <article class="brief-card" id="cds-ref">
      <header class="brief-card-head"><h3>建议编制</h3></header>
      <div class="brief-card-body">${compsBlock()}</div>
    </article>

    <article class="brief-card">
      <header class="brief-card-head"><h3>团队减伤</h3></header>
      <div class="brief-card-body">${cardGrid(data.raidDr, "dr")}</div>
    </article>

    <article class="brief-card">
      <header class="brief-card-head"><h3>抬血大技能</h3></header>
      <div class="brief-card-body">${cardGrid(data.raidHeal, "heal")}</div>
    </article>

    <article class="brief-card">
      <header class="brief-card-head"><h3>外置单体保命</h3></header>
      <div class="brief-card-body">${cardGrid(data.externals, "ext")}</div>
    </article>

    <article class="brief-card" id="cds-rules">
      <header class="brief-card-head"><h3>排表原则</h3></header>
      <div class="brief-card-body">
        <ul>${(data.rules || []).map((r) => `<li>${r}</li>`).join("")}</ul>
      </div>
    </article>

    <div class="cds-boss-head">
      <h3>按 Boss 减伤循环</h3>
      <p>默认按戒律 + 奶骑 + 奶萨理解「屏障 / 虔诚 / 链接·潮汐」。缺某专精时用同列替代技能。</p>
    </div>
    ${(data.bosses || []).map(bossBlock).join("")}
  `;
})();
