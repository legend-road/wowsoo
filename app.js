(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const bossNav = $("#bossNav");
  const bossPanel = $("#bossPanel");
  let activeBossId = window.SOO.bosses[0].id;

  /* ---------- SVG diagrams ---------- */
  function diagramSvg(type) {
    const base = (inner, caption) =>
      `<div class="diagram">${inner}<p class="diagram-caption">${caption}</p></div>`;

    const svgWrap = (content) =>
      `<svg viewBox="0 0 420 240" xmlns="http://www.w3.org/2000/svg" role="img">
        <rect width="420" height="240" rx="10" fill="#120904"/>
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#c9a06a"/>
          </marker>
        </defs>
        ${content}
      </svg>`;

    const diagrams = {
      immerseus: base(
        svgWrap(`
          <circle cx="210" cy="120" r="28" fill="#1e3a4a" stroke="#4eb6d1" stroke-width="3"/>
          <circle cx="210" cy="120" r="48" fill="none" stroke="#6b8f3a" stroke-width="8" opacity=".35"/>
          <text x="210" y="125" text-anchor="middle" fill="#d7f3ff" font-size="11">Boss</text>
          <text x="210" y="155" text-anchor="middle" fill="#6b8f3a" font-size="9">渗出的煞</text>
          <circle cx="95" cy="70" r="12" fill="#3a2010" stroke="#e85d2a" stroke-width="2"/>
          <text x="95" y="98" text-anchor="middle" fill="#e85d2a" font-size="10">黑软</text>
          <circle cx="325" cy="70" r="12" fill="#1a3328" stroke="#5fbf7a" stroke-width="2"/>
          <text x="325" y="98" text-anchor="middle" fill="#5fbf7a" font-size="10">白软</text>
          <circle cx="70" cy="160" r="6" fill="none" stroke="#9b6bc9" stroke-dasharray="3 2"/>
          <circle cx="110" cy="190" r="6" fill="none" stroke="#9b6bc9" stroke-dasharray="3 2"/>
          <text x="90" y="220" text-anchor="middle" fill="#b9a08a" font-size="10">煞能箭虚空</text>
          <path d="M55 120 Q210 35 365 120" fill="none" stroke="#c9a06a" stroke-dasharray="5 4"/>
          <text x="210" y="28" text-anchor="middle" fill="#c9a06a" font-size="12">25H 半弧散开 ≥5 码</text>
        `),
        "25H · 坦对侧 · 半弧散开 · 黑软打/白软奶"
      ),
      protectors: base(
        svgWrap(`
          <circle cx="110" cy="80" r="28" fill="#2a1810" stroke="#e85d2a" stroke-width="2"/>
          <text x="110" y="85" text-anchor="middle" fill="#f3e6d4" font-size="11">洛克</text>
          <circle cx="310" cy="80" r="28" fill="#2a1810" stroke="#d96b4a" stroke-width="2"/>
          <text x="310" y="85" text-anchor="middle" fill="#f3e6d4" font-size="11">何</text>
          <circle cx="210" cy="180" r="28" fill="#2a1810" stroke="#4a90d9" stroke-width="2"/>
          <text x="210" y="185" text-anchor="middle" fill="#f3e6d4" font-size="11">孙</text>
          <circle cx="210" cy="110" r="16" fill="#3a2818" stroke="#c9a06a"/>
          <text x="210" y="114" text-anchor="middle" fill="#c9a06a" font-size="10">团队</text>
          <text x="210" y="30" text-anchor="middle" fill="#b9a08a" font-size="12">三角站位，避免绝望重叠</text>
        `),
        "三角分拉 · 计划性压血"
      ),
      norushen: base(
        svgWrap(`
          <circle cx="210" cy="120" r="40" fill="#241028" stroke="#9b6bc9" stroke-width="3"/>
          <text x="210" y="125" text-anchor="middle" fill="#e8d5ff" font-size="11">混合物</text>
          <rect x="40" y="40" width="70" height="50" rx="8" fill="#160d08" stroke="#f0a35a"/>
          <text x="75" y="70" text-anchor="middle" fill="#f0a35a" font-size="11">考验</text>
          <path d="M110 65 L160 100" stroke="#c9a06a" marker-end="url(#arrow)"/>
          <text x="210" y="210" text-anchor="middle" fill="#b9a08a" font-size="12">轮流内视净化腐蚀</text>
        `),
        "中央混合物 · 轮换考验"
      ),
      pride: base(
        svgWrap(`
          <circle cx="210" cy="120" r="34" fill="#2a1810" stroke="#e85d2a" stroke-width="3"/>
          <text x="210" y="125" text-anchor="middle" fill="#f3e6d4" font-size="12">傲之煞</text>
          <rect x="50" y="40" width="24" height="50" rx="4" fill="#3a2a10" stroke="#f0a35a"/>
          <rect x="346" y="40" width="24" height="50" rx="4" fill="#3a2a10" stroke="#f0a35a"/>
          <rect x="50" y="150" width="24" height="50" rx="4" fill="#3a2a10" stroke="#f0a35a"/>
          <rect x="346" y="150" width="24" height="50" rx="4" fill="#3a2a10" stroke="#f0a35a"/>
          <text x="210" y="30" text-anchor="middle" fill="#f0a35a" font-size="12">泰坦赐福光柱</text>
          <circle cx="140" cy="70" r="10" fill="#402010" stroke="#e25b5b"/>
          <text x="140" y="95" text-anchor="middle" fill="#e25b5b" font-size="10">投影</text>
          <text x="210" y="215" text-anchor="middle" fill="#b9a08a" font-size="12">象限分散 · 高层数先踩赐福</text>
        `),
        "分散象限 · 赐福降傲气"
      ),
      galakras: base(
        svgWrap(`
          <rect x="160" y="20" width="100" height="36" rx="6" fill="#3a2010" stroke="#e85d2a"/>
          <text x="210" y="43" text-anchor="middle" fill="#f3e6d4" font-size="12">迦拉卡斯</text>
          <rect x="40" y="80" width="70" height="90" rx="8" fill="#1a120c" stroke="#c9a06a"/>
          <text x="75" y="128" text-anchor="middle" fill="#c9a06a" font-size="11">左塔</text>
          <rect x="310" y="80" width="70" height="90" rx="8" fill="#1a120c" stroke="#c9a06a"/>
          <text x="345" y="128" text-anchor="middle" fill="#c9a06a" font-size="11">右塔</text>
          <rect x="150" y="160" width="120" height="50" rx="8" fill="#24160f" stroke="#4a90d9"/>
          <text x="210" y="190" text-anchor="middle" fill="#9ec5f0" font-size="12">地面攻坚</text>
        `),
        "双塔开炮迫降 · 地面清增援"
      ),
      juggernaut: base(
        svgWrap(`
          <ellipse cx="210" cy="120" rx="55" ry="32" fill="#2a1810" stroke="#c9a06a" stroke-width="3"/>
          <text x="210" y="125" text-anchor="middle" fill="#f3e6d4" font-size="12">战蝎</text>
          <path d="M40 200 Q120 80 200 60" fill="none" stroke="#e85d2a" stroke-width="2" stroke-dasharray="6 4"/>
          <text x="90" y="100" fill="#e85d2a" font-size="11">激光跑道</text>
          <circle cx="300" cy="180" r="8" fill="#5a3010" stroke="#f0a35a"/>
          <circle cx="330" cy="160" r="8" fill="#5a3010" stroke="#f0a35a"/>
          <circle cx="350" cy="190" r="8" fill="#5a3010" stroke="#f0a35a"/>
          <text x="330" y="220" text-anchor="middle" fill="#b9a08a" font-size="11">地雷区</text>
        `),
        "外圈风筝激光 · 预留空间"
      ),
      shaman: base(
        svgWrap(`
          <circle cx="120" cy="120" r="30" fill="#2a1810" stroke="#4a90d9" stroke-width="2"/>
          <text x="120" y="125" text-anchor="middle" fill="#f3e6d4" font-size="11">哈洛姆</text>
          <circle cx="300" cy="120" r="30" fill="#2a1810" stroke="#5fbf7a" stroke-width="2"/>
          <text x="300" y="125" text-anchor="middle" fill="#f3e6d4" font-size="11">卡德里斯</text>
          <path d="M40 180 H380" stroke="#6b8f3a" stroke-width="10" opacity=".55"/>
          <text x="210" y="210" text-anchor="middle" fill="#b9a08a" font-size="12">污染之溪：横向躲开</text>
          <circle cx="210" cy="70" r="14" fill="#24160f" stroke="#c9a06a"/>
          <text x="210" y="74" text-anchor="middle" fill="#c9a06a" font-size="10">远程</text>
        `),
        "左右分拉 · 躲开污染之溪"
      ),
      nazgrim: base(
        svgWrap(`
          <circle cx="120" cy="120" r="34" fill="#2a1810" stroke="#e85d2a" stroke-width="3"/>
          <text x="120" y="125" text-anchor="middle" fill="#f3e6d4" font-size="11">纳兹戈林</text>
          <rect x="230" y="60" width="140" height="120" rx="10" fill="#1a120c" stroke="#f0a35a" stroke-dasharray="5 4"/>
          <text x="300" y="105" text-anchor="middle" fill="#f0a35a" font-size="12">小怪处理区</text>
          <text x="300" y="128" text-anchor="middle" fill="#b9a08a" font-size="11">旗 > 萨满 > 其他</text>
          <text x="210" y="220" text-anchor="middle" fill="#b9a08a" font-size="12">Boss 靠边，中央清增援</text>
        `),
        "姿态应对 · 转火增援"
      ),
      malkorok: base(
        svgWrap(`
          <circle cx="120" cy="120" r="34" fill="#2a1020" stroke="#9b6bc9" stroke-width="3"/>
          <text x="120" y="125" text-anchor="middle" fill="#f3e6d4" font-size="11">马尔考罗克</text>
          <path d="M120 120 L220 50" stroke="#9b6bc9" stroke-width="28" opacity=".35"/>
          <text x="200" y="45" fill="#c9a6e8" font-size="11">吐息朝外</text>
          <circle cx="280" cy="150" r="22" fill="none" stroke="#e85d2a" stroke-width="2"/>
          <circle cx="340" cy="100" r="22" fill="none" stroke="#e85d2a" stroke-width="2"/>
          <text x="310" y="200" text-anchor="middle" fill="#e85d2a" font-size="12">踩聚爆圈</text>
        `),
        "吐息朝外 · 歼灭标记 · 全员紫圈"
      ),
      spoils: base(
        svgWrap(`
          <rect x="30" y="40" width="160" height="160" rx="10" fill="#1a120c" stroke="#c9a06a"/>
          <text x="110" y="120" text-anchor="middle" fill="#c9a06a" font-size="14">左库房</text>
          <rect x="230" y="40" width="160" height="160" rx="10" fill="#1a120c" stroke="#c9a06a"/>
          <text x="310" y="120" text-anchor="middle" fill="#c9a06a" font-size="14">右库房</text>
          <text x="210" y="220" text-anchor="middle" fill="#b9a08a" font-size="12">限时开箱 · 分队推进</text>
        `),
        "左右分队 · 控制开箱节奏"
      ),
      thok: base(
        svgWrap(`
          <ellipse cx="210" cy="120" rx="50" ry="28" fill="#2a1810" stroke="#e85d2a" stroke-width="3"/>
          <text x="210" y="125" text-anchor="middle" fill="#f3e6d4" font-size="12">索克</text>
          <path d="M40 180 Q120 40 210 50 T380 180" fill="none" stroke="#f0a35a" stroke-dasharray="6 4"/>
          <text x="210" y="30" text-anchor="middle" fill="#f0a35a" font-size="12">锁定风筝跑道</text>
          <rect x="40" y="70" width="40" height="40" rx="4" fill="#24160f" stroke="#5fbf7a"/>
          <text x="60" y="95" text-anchor="middle" fill="#5fbf7a" font-size="10">囚</text>
        `),
        "外圈风筝 · 计划释放囚徒"
      ),
      blackfuse: base(
        svgWrap(`
          <rect x="40" y="30" width="340" height="36" rx="6" fill="#1a120c" stroke="#f0a35a"/>
          <text x="210" y="53" text-anchor="middle" fill="#f0a35a" font-size="12">传送带拆件区</text>
          <circle cx="140" cy="140" r="30" fill="#2a1810" stroke="#e85d2a" stroke-width="2"/>
          <text x="140" y="145" text-anchor="middle" fill="#f3e6d4" font-size="11">黑索</text>
          <rect x="250" y="110" width="100" height="70" rx="8" fill="#24160f" stroke="#4a90d9"/>
          <text x="300" y="150" text-anchor="middle" fill="#9ec5f0" font-size="11">武器处理</text>
          <text x="210" y="220" text-anchor="middle" fill="#b9a08a" font-size="12">传送带组 + 地面组分工</text>
        `),
        "拆件优先级 · 地面转火武器"
      ),
      paragons: base(
        svgWrap(`
          ${[0,1,2,3,4,5,6,7,8].map((i) => {
            const ang = (Math.PI * 2 * i) / 9 - Math.PI / 2;
            const x = 210 + Math.cos(ang) * 78;
            const y = 120 + Math.sin(ang) * 70;
            return `<circle cx="${x}" cy="${y}" r="14" fill="#2a1810" stroke="${i < 3 ? "#e85d2a" : "#c9a06a"}" stroke-width="2"/>
              <text x="${x}" y="${y + 4}" text-anchor="middle" fill="#f3e6d4" font-size="9">${i + 1}</text>`;
          }).join("")}
          <text x="210" y="125" text-anchor="middle" fill="#b9a08a" font-size="11">顺序击杀</text>
        `),
        "推荐击杀序 · 单点 · Debuff 分坦"
      ),
      garrosh: base(
        svgWrap(`
          <rect x="30" y="30" width="110" height="70" rx="8" fill="#24160f" stroke="#e85d2a"/>
          <text x="85" y="70" text-anchor="middle" fill="#f3e6d4" font-size="12">P1 军力</text>
          <rect x="155" y="30" width="110" height="70" rx="8" fill="#24160f" stroke="#9b6bc9"/>
          <text x="210" y="70" text-anchor="middle" fill="#f3e6d4" font-size="12">过渡煞域</text>
          <rect x="280" y="30" width="110" height="70" rx="8" fill="#24160f" stroke="#f0a35a"/>
          <text x="335" y="70" text-anchor="middle" fill="#f3e6d4" font-size="12">P2 王座</text>
          <rect x="120" y="130" width="180" height="70" rx="8" fill="#2a1010" stroke="#e85d2a" stroke-width="2"/>
          <text x="210" y="170" text-anchor="middle" fill="#ffb08a" font-size="13">P3 亚煞极之心</text>
          <text x="210" y="220" text-anchor="middle" fill="#b9a08a" font-size="12">转火 → 心控解救 → 斩杀爆发</text>
        `),
        "P1→过渡控能量 · P3 强化 · 英雄撞星"
      ),
    };

    return diagrams[type] || diagrams.immerseus;
  }

  /* ---------- Guide rendering ---------- */
  function renderNav() {
    bossNav.innerHTML = window.SOO.bosses
      .map(
        (b) => `
      <button type="button" data-id="${b.id}" class="${b.id === activeBossId ? "active" : ""}">
        <span class="bn-idx">BOSS ${String(b.idx).padStart(2, "0")}</span>
        <span class="bn-name">${b.name}</span>
      </button>`
      )
      .join("");

    bossNav.onclick = (e) => {
      const btn = e.target.closest("button[data-id]");
      if (!btn) return;
      activeBossId = btn.dataset.id;
      renderNav();
      renderBoss();
      bossPanel.focus({ preventScroll: true });
    };
  }

  function renderBoss() {
    const b = window.SOO.bosses.find((x) => x.id === activeBossId);
    if (!b) return;

    const mediaHtml =
      b.media && b.media.length
        ? `<div class="media-gallery">
            ${b.media
              .map(
                (m) => `
              <figure class="media-card">
                <img src="${m.src}" alt="${m.caption}" loading="lazy" />
                <figcaption>${m.caption}</figcaption>
              </figure>`
              )
              .join("")}
          </div>`
        : "";

    const refsHtml =
      b.refs && b.refs.length
        ? `<p class="boss-refs">参考：${b.refs
            .map((r) => `<a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.label}</a>`)
            .join(" · ")}</p>`
        : "";

    bossPanel.innerHTML = `
      <div class="boss-header">
        <div>
          <h3>${b.idx}. ${b.name}</h3>
          <p class="boss-en">${b.en} · ${b.zone}</p>
          ${refsHtml}
        </div>
        <div class="boss-tags">
          ${b.tags.map((t, i) => `<span class="tag ${i === 0 ? "hot" : ""}">${t}</span>`).join("")}
        </div>
      </div>

      <p style="margin:0 0 1rem;color:var(--muted)">${b.summary}</p>

      ${mediaHtml}

      <div class="boss-visual">
        ${diagramSvg(b.diagram)}
        <div class="quick-roles">
          <div class="role-tip tank"><strong>坦克要点</strong><p>${b.roles.tank}</p></div>
          <div class="role-tip healer"><strong>治疗要点</strong><p>${b.roles.healer}</p></div>
          <div class="role-tip dps"><strong>DPS 要点</strong><p>${b.roles.dps}</p></div>
        </div>
      </div>

      <div class="block">
        <h4>技能一览</h4>
        <div class="skill-grid">
          ${b.skills
            .map((s) => {
              const vids = []
                .concat(s.video || [])
                .concat(s.videos || [])
                .filter(Boolean);
              const videoHtml = vids.length
                ? `<div class="skill-videos">${vids
                    .map(
                      (v) => {
                        const src = typeof v === "string" ? v : v.src;
                        const cap = typeof v === "string" ? "" : v.caption || "";
                        return `<figure class="skill-video">
                          <video muted playsinline controls loop preload="metadata" src="${src}"
                            onerror="this.closest('figure').classList.add('video-broken');this.replaceWith(Object.assign(document.createElement('p'),{className:'video-fallback',textContent:'视频暂不可用（来源 CDN 失效），请对照文字说明。'}))"></video>
                          ${cap ? `<figcaption>${cap}</figcaption>` : ""}
                        </figure>`;
                      }
                    )
                    .join("")}</div>
                  <p class="video-credit">机制演示</p>`
                : "";
              return `
            <div class="skill-card${vids.length ? " has-video" : ""}">
              <h5>${s.name}</h5>
              <p>${s.desc}</p>
              ${videoHtml}
              <span class="who">关注：${s.who}</span>
            </div>`;
            })
            .join("")}
        </div>
      </div>

      <div class="block">
        <h4>机制与打法</h4>
        <ul class="checklist">
          ${b.mechanics.map((m) => `<li>${m}</li>`).join("")}
        </ul>
      </div>

      <div class="block">
        <h4>站位</h4>
        <p style="margin:0;color:var(--muted)">${b.positioning}</p>
      </div>

      <div class="note-box">
        <h5>注意事项</h5>
        <p>${b.notes}</p>
      </div>

      <div class="quest-box">
        <h5>特别任务 / 成就向</h5>
        <p>${b.quests}</p>
      </div>
    `;
  }

  /* init — 支持 #boss-<id> 从战前安排跳转 */
  const hashBoss = (location.hash || "").match(/^#boss-([a-z0-9-]+)$/i);
  if (hashBoss && window.SOO.bosses.some((b) => b.id === hashBoss[1])) {
    activeBossId = hashBoss[1];
  }
  renderNav();
  renderBoss();
  if (hashBoss && bossPanel) {
    requestAnimationFrame(() => {
      document.getElementById("guides")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();
