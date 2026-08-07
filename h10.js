(function () {
  const data = window.SOO_H10;
  const listRoot = document.getElementById("h10List");
  const navRoot = document.getElementById("h10Nav");
  if (!data || !listRoot || !navRoot) return;

  const titleEl = document.getElementById("h10Title");
  const leadEl = document.getElementById("h10Lead");
  const rosterEl = document.getElementById("h10Roster");
  if (titleEl && data.title) titleEl.textContent = data.title;
  if (leadEl && data.lead) leadEl.textContent = data.lead;
  if (rosterEl) rosterEl.textContent = data.rosterNote || "";

  function ul(items) {
    return `<ul>${(items || []).map((t) => `<li>${t}</li>`).join("")}</ul>`;
  }

  function flowBrief(flow) {
    if (!flow || !flow.length) return "";
    return flow
      .map((f) => {
        const steps = (f.steps || []).slice(0, 4);
        return `<li><strong>${f.title}：</strong>${steps.join("；")}</li>`;
      })
      .join("");
  }

  function skillCards(skills) {
    return (skills || [])
      .map((s) => {
        const hClass = s.heroic
          ? s.heroic === "diff"
            ? " is-h-diff"
            : " is-h-only"
          : "";
        return `
      <div class="brief-skill${hClass}">
        <h5>${heroicBadge(s.heroic)}${s.name}${
          s.who ? `<span>${s.who}</span>` : ""
        }</h5>
        <p>${s.detail || ""}</p>
      </div>`;
      })
      .join("");
  }

  function heroicBadge(flag) {
    if (flag === true || flag === "only") {
      return `<abbr class="brief-h-badge brief-h-only" title="仅英雄难度出现">H特有</abbr>`;
    }
    if (flag === "diff") {
      return `<abbr class="brief-h-badge brief-h-diff" title="普通也有，但英雄难度机制/数值显著不同">H加强</abbr>`;
    }
    return "";
  }

  function mechanicCards(mechanics) {
    return (mechanics || [])
      .map((s) => {
        const meta = [s.phase, s.who].filter(Boolean).join(" · ");
        const dmg =
          s.dmg && s.dmg !== "—"
            ? `<p class="brief-dmg"><span>伤害</span>${s.dmg}</p>`
            : "";
        const hClass = s.heroic
          ? s.heroic === "diff"
            ? " is-h-diff"
            : " is-h-only"
          : "";
        return `
      <div class="brief-skill${hClass}">
        <h5>${heroicBadge(s.heroic)}${s.name}${
          meta ? `<span>${meta}</span>` : ""
        }</h5>
        ${dmg}
        <p>${s.detail || ""}</p>
      </div>`;
      })
      .join("");
  }

  function diagramBlock(diagram) {
    if (!diagram) return "";
    let media = "";
    if (diagram.img) {
      media = `<img src="${diagram.img}" alt="${
        diagram.alt || "站位图"
      }" loading="lazy" />`;
    } else if (diagram.svg) {
      media = diagram.svg;
    } else {
      return "";
    }
    return `
      <figure class="h10-diagram brief-diagram">
        ${media}
        ${
          diagram.caption
            ? `<figcaption class="h10-diagram-cap">${diagram.caption}</figcaption>`
            : ""
        }
      </figure>`;
  }

  function positionBlocks(positions) {
    return (positions || [])
      .map(
        (p) => `
      <div class="brief-phase">
        <h5>${p.phase}</h5>
        ${diagramBlock(p.diagram)}
        ${ul(p.points)}
      </div>`
      )
      .join("");
  }

  function defensiveBlocks(defensives) {
    return (defensives || [])
      .map(
        (d) => `
      <div class="brief-cd">
        <h5>${d.when}<span>${d.who || ""}</span></h5>
        <p>${d.detail || ""}</p>
      </div>`
      )
      .join("");
  }

  function flowBlocks(flow) {
    return (flow || [])
      .map(
        (f, i) => `
      <div class="brief-flow-step">
        <h5><span class="brief-step-num">${i + 1}</span>${f.title}</h5>
        ${ul(f.steps)}
      </div>`
      )
      .join("");
  }

  function timelineBlock(timeline, note) {
    if (!timeline || !timeline.length) return "";
    const rows = timeline
      .map((row) => {
        const highlight =
          /赐福|Gift/i.test(row.a || "") || /赐福|Gift/i.test(row.t || "")
            ? " brief-tl-gift"
            : "";
        return `<li class="brief-tl-row${highlight}"><time>${row.t}</time><span>${row.a}</span></li>`;
      })
      .join("");
    return `
  <section class="brief-block">
    <h4>循环时间轴</h4>
    ${note ? `<p class="brief-tl-note">${note}</p>` : ""}
    <ol class="brief-timeline">${rows}</ol>
  </section>`;
  }

  function cardId(id) {
    return `boss-${id}`;
  }

  function renderNav() {
    navRoot.innerHTML = data.bosses
      .map((b) => {
        const mark = b.brief ? "" : " · 旧版";
        return `<a href="#${cardId(b.id)}" class="brief-nav-link${
          b.brief ? " brief-nav-new" : ""
        }" data-boss-id="${b.id}"><span class="brief-nav-idx">${b.idx}</span>${b.name}${mark}</a>`;
      })
      .join("");
  }

  function bossById(id) {
    return data.bosses.find((b) => b.id === id);
  }

  function setActiveBoss(id, { updateHash = false } = {}) {
    const boss = bossById(id);
    if (!boss) return;

    navRoot.querySelectorAll(".brief-nav-link").forEach((a) => {
      const on = a.getAttribute("data-boss-id") === id;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });

    const bar = document.getElementById("h10ReadingBar");
    const idxEl = document.getElementById("h10NowIdx");
    const nameEl = document.getElementById("h10NowName");
    if (bar) bar.hidden = false;
    if (idxEl) idxEl.textContent = String(boss.idx);
    if (nameEl) nameEl.textContent = boss.name;

    const i = data.bosses.findIndex((b) => b.id === id);
    const prevBtn = document.getElementById("h10Prev");
    const nextBtn = document.getElementById("h10Next");
    if (prevBtn) prevBtn.disabled = i <= 0;
    if (nextBtn) nextBtn.disabled = i < 0 || i >= data.bosses.length - 1;

    if (updateHash) {
      history.replaceState(null, "", `#${cardId(id)}`);
    }
  }

  function scrollToBoss(id) {
    const el = document.getElementById(cardId(id));
    if (!el) return;
    setActiveBoss(id, { updateHash: true });
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function syncHeaderOffset() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const h = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--site-header-h", `${h}px`);
  }

  function bindReadingBar() {
    const prevBtn = document.getElementById("h10Prev");
    const nextBtn = document.getElementById("h10Next");
    const getActiveId = () => {
      const active = navRoot.querySelector(".brief-nav-link.is-active");
      return active && active.getAttribute("data-boss-id");
    };
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const id = getActiveId();
        const i = data.bosses.findIndex((b) => b.id === id);
        if (i > 0) scrollToBoss(data.bosses[i - 1].id);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const id = getActiveId();
        const i = data.bosses.findIndex((b) => b.id === id);
        if (i >= 0 && i < data.bosses.length - 1) {
          scrollToBoss(data.bosses[i + 1].id);
        }
      });
    }
    syncHeaderOffset();
    window.addEventListener("resize", syncHeaderOffset);
    if ("ResizeObserver" in window) {
      const header = document.querySelector(".site-header");
      if (header) new ResizeObserver(syncHeaderOffset).observe(header);
    }
  }

  function observeActiveBoss() {
    const cards = [...listRoot.querySelectorAll(".brief-card[id^='boss-']")];
    if (!cards.length || !("IntersectionObserver" in window)) {
      if (data.bosses[0]) setActiveBoss(data.bosses[0].id);
      return;
    }

    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.intersectionRatio);
        });
        let bestId = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (!bestId || bestRatio <= 0) return;
        const bossId = bestId.replace(/^boss-/, "");
        setActiveBoss(bossId);
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );
    cards.forEach((card) => io.observe(card));
  }

  function renderLegacy(b) {
    const opening = b.opening ? ul(b.opening.points) : "";
    const tacticsFlow = flowBrief(b.flow);
    return `
  <p class="brief-pull"><strong>一句话：</strong>${b.oneLiner || ""}</p>
  <p class="brief-legacy-note">本 Boss 仍为旧结构；将按「技能→站位→减伤→流程→职责」模板陆续升级（1–14 号已完成）。</p>

  <section class="brief-block">
    <h4>开打前编制</h4>
    ${ul(b.setup && b.setup.roster)}
    <h5>检查项</h5>
    ${ul(b.setup && b.setup.macros)}
  </section>

  <section class="brief-block">
    <h4>技能讲解</h4>
    <div class="brief-skill-grid">${skillCards(b.skills)}</div>
  </section>

  <div class="brief-grid">
    <section>
      <h4>人员分工</h4>
      ${ul(b.setup && b.setup.assign)}
    </section>
    <section>
      <h4>站位要点</h4>
      ${opening || "<p class='brief-empty'>待补充</p>"}
    </section>
    <section class="brief-span-2">
      <h4>战术流程</h4>
      <ul>${tacticsFlow}</ul>
    </section>
    <section class="brief-callouts">
      <h4>建议喊话</h4>
      <ul class="callout-chips">${(b.callouts || [])
        .map((c) => `<li>${c}</li>`)
        .join("")}</ul>
    </section>
    <section>
      <h4>10H 特别提示</h4>
      ${ul(b.tips10)}
    </section>
  </div>

  <section class="brief-red">
    <h4>红线（易灭）</h4>
    ${ul(b.redlines)}
  </section>`;
  }

  function renderBriefV2(b) {
    const br = b.brief;
    const timeline = br.timeline || b.timeline;
    const timelineNote = br.timelineNote || "";
    return `
  <p class="brief-pull"><strong>一句话：</strong>${b.oneLiner || ""}</p>

  <section class="brief-block">
    <h4>① 开打前编制</h4>
    ${ul(br.roster)}
    <h5>检查项</h5>
    ${ul(br.checks)}
  </section>

  <section class="brief-block">
    <h4>② 技能与机制细讲</h4>
    <p class="brief-h-legend">
      <abbr class="brief-h-badge brief-h-only" title="仅英雄难度出现">H特有</abbr>
      仅英雄难度出现的技能/机制；
      <abbr class="brief-h-badge brief-h-diff" title="普通也有，但英雄难度显著不同">H加强</abbr>
      普通也有，但 10H 机制或数值明显加压。
    </p>
    <div class="brief-skill-grid">${mechanicCards(br.mechanics)}</div>
  </section>

  <section class="brief-block">
    <h4>③ 分阶段站位</h4>
    <div class="brief-phase-grid">${positionBlocks(br.positions)}</div>
  </section>

  <section class="brief-block">
    <h4>④ 减伤循环安排</h4>
    <div class="brief-cd-grid">${defensiveBlocks(br.defensives)}</div>
  </section>

  <section class="brief-block">
    <h4>⑤ 打法流程</h4>
    <div class="brief-flow-grid">${flowBlocks(br.flow)}</div>
  </section>

  ${timelineBlock(timeline, timelineNote)}

  <section class="brief-block">
    <h4>⑥ 职责注意事项</h4>
    <div class="brief-roles">
      <div><h5>坦克</h5>${ul(br.roles.tank)}</div>
      <div><h5>DPS</h5>${ul(br.roles.dps)}</div>
      <div><h5>治疗</h5>${ul(br.roles.healer)}</div>
    </div>
  </section>

  <section class="brief-block">
    <h4>建议喊话</h4>
    <ul class="callout-chips">${(br.callouts || [])
      .map((c) => `<li>${c}</li>`)
      .join("")}</ul>
  </section>

  <section class="brief-red">
    <h4>红线（易灭）</h4>
    ${ul(br.redlines)}
  </section>`;
  }

  function renderCards() {
    listRoot.innerHTML = data.bosses
      .map((b) => {
        if (!b.ready) {
          return `
<article class="brief-card" id="${cardId(b.id)}">
  <header class="brief-card-head">
    <span class="brief-idx">${b.idx}</span>
    <div>
      <h3>${b.name}</h3>
      <p class="brief-meta">${b.en} · ${b.zone} · 10 人英雄</p>
    </div>
  </header>
  <p class="brief-pull">本 Boss 攻略待更新。</p>
</article>`;
        }

        return `
<article class="brief-card${b.brief ? " brief-card-v2" : ""}" id="${cardId(b.id)}">
  <header class="brief-card-head">
    <span class="brief-idx">${b.idx}</span>
    <div>
      <h3>${b.name}${b.brief ? '<span class="brief-badge">新模板</span>' : ""}</h3>
      <p class="brief-meta">${b.en} · ${b.zone} · 10 人英雄</p>
    </div>
    <a class="brief-guide-link" href="index.html#boss-${b.id}">主站对照</a>
  </header>
  ${b.brief ? renderBriefV2(b) : renderLegacy(b)}
</article>`;
      })
      .join("");
  }

  renderNav();
  renderCards();
  bindReadingBar();
  observeActiveBoss();

  navRoot.addEventListener("click", (e) => {
    const link = e.target.closest("a.brief-nav-link");
    if (!link) return;
    const id = link.getAttribute("data-boss-id");
    if (!id) return;
    e.preventDefault();
    scrollToBoss(id);
  });

  const hash = (location.hash || "").match(/^#(?:boss-|brief-h10-)?([a-z0-9-]+)$/i);
  if (hash && bossById(hash[1])) {
    requestAnimationFrame(() => scrollToBoss(hash[1]));
  } else if (data.bosses[0]) {
    setActiveBoss(data.bosses[0].id);
  }
})();
