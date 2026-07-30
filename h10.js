(function () {
  const data = window.SOO_H10;
  const nav = document.getElementById("h10Nav");
  const panel = document.getElementById("h10Panel");
  if (!data || !nav || !panel) return;

  document.getElementById("h10Title").textContent = data.title;
  document.getElementById("h10Lead").textContent = data.lead;
  document.getElementById("h10Roster").textContent = data.rosterNote;

  let activeId = data.bosses.find((b) => b.ready)?.id || data.bosses[0].id;
  const hash = (location.hash || "").match(/^#(?:boss-)?([a-z0-9-]+)$/i);
  if (hash && data.bosses.some((b) => b.id === hash[1])) activeId = hash[1];

  const TLDR_LABEL = {
    p1: "P1",
    p2: "P2",
    general: "总则",
    rook: "洛克绝命",
    he: "何绝命",
    sun: "孙绝命",
  };

  function ul(items) {
    return `<ul>${(items || []).map((t) => `<li>${t}</li>`).join("")}</ul>`;
  }

  function renderNav() {
    nav.innerHTML = data.bosses
      .map((b) => {
        const cls = [
          "h10-nav-link",
          b.id === activeId ? "active" : "",
          b.ready ? "" : "soon",
        ]
          .filter(Boolean)
          .join(" ");
        return `<a class="${cls}" href="#${b.id}" data-id="${b.id}">
          <span class="h10-nav-idx">${b.idx}</span>
          <span>${b.name}${b.ready ? "" : " · 待更"}</span>
        </a>`;
      })
      .join("");

    nav.querySelectorAll("[data-id]").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        activeId = a.dataset.id;
        history.replaceState(null, "", `#${activeId}`);
        renderNav();
        renderPanel();
        panel.focus({ preventScroll: true });
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderPlaceholder(b) {
    return `
      <header class="h10-head">
        <span class="h10-idx">${b.idx}</span>
        <div>
          <h3>${b.name}</h3>
          <p class="h10-meta">${b.en} · ${b.zone} · 10 人英雄</p>
        </div>
      </header>
      <p class="h10-soon">本 Boss 的 10H 细致流程尚未写完，请先看主站攻略或战前安排。</p>
      <p><a class="btn btn-ghost" href="index.html#boss-${b.id}">打开主站攻略</a></p>
    `;
  }

  function renderReadyBoss(b) {
    const flow = (b.flow || [])
      .map(
        (f, i) => `
      <section class="h10-flow-block">
        <h4><span class="h10-step">${i + 1}</span>${f.title}</h4>
        ${ul(f.steps)}
      </section>`
      )
      .join("");

    const skills = (b.skills || [])
      .map(
        (s) => `
      <div class="h10-skill">
        <h5>${s.name}<span>${s.who}</span></h5>
        <p>${s.detail}</p>
      </div>`
      )
      .join("");

    const tables = (b.swellingTables || [])
      .map(
        (tbl) => `
      <section class="h10-block">
        <h4>${tbl.title}</h4>
        <table class="h10-table"><tbody>
          ${(tbl.rows || [])
            .map((r) => `<tr><th>${r.th}</th><td>${r.td}</td></tr>`)
            .join("")}
        </tbody></table>
      </section>`
      )
      .join("");

    const timeline = b.timeline
      ? `<section class="h10-block">
        <h4>开场时间轴（绝命后会错位，仅作参考）</h4>
        <table class="h10-table"><tbody>
          ${b.timeline.map((r) => `<tr><th>${r.t}</th><td>${r.a}</td></tr>`).join("")}
        </tbody></table>
      </section>`
      : "";

    const tldrKeys = b.tldr ? Object.keys(b.tldr) : [];
    const tldr = tldrKeys.length
      ? `<section class="h10-block">
        <h4>速查</h4>
        <div class="h10-roles" style="grid-template-columns: repeat(${Math.min(
          tldrKeys.length,
          4
        )}, 1fr)">
          ${tldrKeys
            .map(
              (k) =>
                `<div><h5>${TLDR_LABEL[k] || k}</h5>${ul(b.tldr[k])}</div>`
            )
            .join("")}
        </div>
      </section>`
      : "";

    const opening = b.opening
      ? `<section class="h10-block">
        <h4>${b.opening.title}</h4>
        <div class="h10-diagram h10-diagram-empty" aria-label="起手站位图（待补）">
          <p class="h10-diagram-placeholder">站位图留空，稍后补充</p>
        </div>
        ${ul(b.opening.points)}
      </section>`
      : "";

    return `
      <header class="h10-head">
        <span class="h10-idx">${b.idx}</span>
        <div>
          <h3>${b.name}</h3>
          <p class="h10-meta">${b.en} · ${b.zone} · 10 人英雄</p>
          <p class="h10-oneliner">${b.oneLiner || ""}</p>
        </div>
        <a class="h10-main-link" href="index.html#boss-${b.id}">主站对照</a>
      </header>

      ${opening}

      <section class="h10-block">
        <h4>编制与开打前</h4>
        ${ul(b.setup.roster)}
        <h5>人员分工</h5>
        ${ul(b.setup.assign)}
        <h5>开打前检查</h5>
        ${ul(b.setup.macros)}
      </section>

      <section class="h10-block">
        <h4>胜负条件</h4>
        ${ul(b.winCondition)}
      </section>

      <section class="h10-block">
        <h4>技能要点</h4>
        <div class="h10-skill-grid">${skills}</div>
      </section>

      ${timeline}

      <section class="h10-block h10-flow">
        <h4>整场战斗流程</h4>
        ${flow}
      </section>

      ${tables}

      <section class="h10-block">
        <h4>职责细则</h4>
        <div class="h10-roles">
          <div><h5>坦克</h5>${ul(b.roles.tank)}</div>
          <div><h5>治疗</h5>${ul(b.roles.healer)}</div>
          <div><h5>DPS</h5>${ul(b.roles.dps)}</div>
        </div>
      </section>

      <section class="h10-block">
        <h4>建议喊话</h4>
        <ul class="callout-chips">${(b.callouts || [])
          .map((c) => `<li>${c}</li>`)
          .join("")}</ul>
      </section>

      <section class="h10-block h10-red">
        <h4>红线</h4>
        ${ul(b.redlines)}
      </section>

      ${tldr}

      <section class="h10-block">
        <h4>10H 特别提示</h4>
        ${ul(b.tips10)}
      </section>
    `;
  }

  function renderPanel() {
    const b = data.bosses.find((x) => x.id === activeId);
    if (!b) return;
    panel.innerHTML = b.ready ? renderReadyBoss(b) : renderPlaceholder(b);
  }

  renderNav();
  renderPanel();
})();
