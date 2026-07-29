/* Siege of Orgrimmar — guide data
 * 机制综合 Warcraft Logs / MythicTrap 与 NGA 25H 实战
 * 测验题库见 questions.js
 */
window.SOO = {
  roles: {
    tank: { id: "tank", label: "坦克" },
    healer: { id: "healer", label: "治疗" },
    dps: { id: "dps", label: "DPS" },
  },
  sourceNote:
    "机制以 Warcraft Logs / MythicTrap 为准，并吸收 NGA 25H 开荒实战；技能演示视频来自 MythicTrap CDN，英雄专属机制已标注。",

  bosses: [
    {
      id: "immerseus",
      idx: 1,
      name: "伊墨苏斯",
      en: "Immerseus",
      zone: "怒焰裂谷深处",
      tags: ["腐蚀条", "本体/分裂", "英雄肿胀"],
      refs: [
        { label: "Warcraft Logs 指南", url: "https://classic.warcraftlogs.com/guide/immerseus" },
        { label: "MythicTrap", url: "https://www.mythictrap.com/en/siege-of-orgrimmar/immerseus" },
      ],
      summary:
        "目标不是“打死血条”，而是把腐蚀（Corruption）从 100 清到 0。本体阶段把血压到 0% 会分裂成黑软（煞能水滴 Sha Puddle）与白软（污染水滴 Contaminated Puddle）；成功击杀黑软或奶满白软各减 1 点腐蚀。重组后 Boss 血量百分比≈剩余腐蚀，越打本体阶段越短。硬狂暴约 10 分钟。",
      media: [
        {
          src: "assets/immerseus/p1-spread.jpg",
          caption: "本体阶段：环形散开 ≥5 码，换坦锥形背离大团，远离中央渗出的煞",
        },
        {
          src: "assets/immerseus/split.jpg",
          caption: "分裂阶段：打黑软吃 10 码伤害增益；奶白软吃 12 码治疗/回蓝增益",
        },
        {
          src: "assets/immerseus/heroic-pool.jpg",
          caption: "英雄：中央煞池会膨胀；踩入可缩小，建议减伤轮流短踩",
        },
      ],
      skills: [
        {
          name: "煞能箭（Sha Bolt）",
          desc: "约每 10 秒对全团射击：对目标及其 5 码内造成暗影伤害，并在脚下留下虚空区（持续到本阶段结束）。阶段结束时虚空区会向中心收回，别挡路。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/immerseus/shaBolt.mp4",
        },
        {
          name: "旋涡（Swirl）",
          desc: "地面涌出移动的污染水流，碰到会受伤并击飞；随后 Boss 向前方喷水柱并顺时针旋转约 10 秒。既要躲移动虚空，也要躲喷流正面。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/immerseus/swirl.mp4",
        },
        {
          name: "腐蚀冲击（Corrosive Blast）",
          desc: "对主目标锥形高额暗影伤害，并叠加长时间「暗影易伤」。约 35 秒一次，必须换坦。",
          who: "坦克",
        },
        {
          name: "渗出的煞（Seeping Sha）",
          desc: "Boss 模型/中央水域是禁区：靠近会受伤并击退。近战打边缘即可，不要穿模。",
          who: "近战 / 全员",
        },
        {
          name: "分裂：黑软 / 白软",
          desc: "黑软（约每 4 点当前腐蚀生成 1 只）需击杀；白软（约每已清除 4 点腐蚀生成 1 只）需奶满净化。越往后白软越多、黑软越少。软到达中心会炸团伤；净化白软到达则冻伤较低。",
          who: "DPS / 治疗",
        },
        {
          name: "残渣增益",
          desc: "黑软死亡：10 码内获得对黑软 +25% 伤害（可叠）。白软奶满：12 码内回 25% 法力且治疗量 +75%（可叠）。白软血越高移动越慢。",
          who: "DPS / 治疗",
        },
        {
          name: "【英雄】肿胀腐蚀",
          desc: "本体阶段获得层数≈腐蚀/2（开场约 50 层）。对 Boss 的单体攻击会消层，同时给攻击者可驱散的暗影 DoT，并刷出凝结的煞（Congealed Sha）。层数消完为止。",
          who: "DPS / 坦克 / 驱散",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/immerseus/swellingCorruption.mp4",
        },
        {
          name: "【英雄】煞能之池",
          desc: "分裂阶段中央出现会缓慢扩大的煞池；软到达会加速扩大。玩家踩进去会吃叠层暗影伤，但能让池子缩小。需轮流踩控大小。",
          who: "全团 / 减伤",
        },
      ],
      mechanics: [
        "嗜血建议开场交：第一段本体最长，后续本体可能短于嗜血持续时间。",
        "本体：背对大团换坦；全团绕 Boss 均匀散开 ≥5 码；脚下虚空区小步挪开，别把自己封死；旋涡看面向预走。",
        "分裂：人本来就在外环，就近处理落点软。DPS 尽量在黑软死亡点吃增益；治疗奶白软时贴 12 码吃回蓝/强疗。",
        "英雄肿胀：10 人可分两波消层（先叠 2–3 层 DoT 停手清凝结煞，再打第二波）；25 人通常可正常打。副坦/奶骑正义之怒等可帮聚怪。",
        "英雄煞池：有减伤的人短时轮流踩，防止池子铺满全场。",
      ],
      positioning:
        "圆形场地，Boss 固定中央。7 道水流仅视觉分区。大团环形散开并保证治疗覆盖；副坦站在主坦附近便于换坦绕行（不能穿 Boss）。分裂阶段保持外环站位覆盖全场软。",
      roles: {
        tank: "腐蚀冲击必换坦。面向始终背离人群。英雄阶段接凝结的煞，配合聚怪手段。",
        healer: "本体扛煞能箭与旋涡失误伤；分裂时奶白软并贴增益圈，同时抬软到达中心的团伤。英雄注意驱散肿胀 DoT、照看踩池的人。姓名版单独显示白软。",
        dps: "本体全力（英雄时控制肿胀消层节奏）。分裂优先黑软并吃死亡增益；不要无脑 AOE 打乱白软奶满节奏。",
      },
      notes:
        "官方机制上：奶满白软会变成净化水滴并继续走向中心，到达仍减腐蚀；黑软漏掉被吸收则不减腐蚀且炸伤更高。NGA 实战还强调末轮白软扎堆连吃多层增益救人。检查治疗宏勿把目标切到黑软。",
      quests: "传说披风等进度节点；详见 WCL 指南与掉落统计。",
      diagram: "immerseus",
    },
    {
      id: "protectors",
      idx: 2,
      name: "堕落的守护者",
      en: "The Fallen Protectors",
      zone: "怒焰裂谷深处",
      tags: ["三体议会", "绝命措施", "同步斩杀"],
      refs: [
        { label: "Warcraft Logs 指南", url: "https://classic.warcraftlogs.com/guide/fallen-protectors" },
        { label: "MythicTrap 正文", url: "https://www.mythictrap.com/en/siege-of-orgrimmar/fallen-protectors" },
      ],
      summary:
        "石蹄洛克、软足何、慈心孙三人不共享血量。各自在 66% / 33% 进入「绝命措施」离场刷化身（期间 Boss 身上 DoT 仍会继续跳）。控伤按顺序触发绝命，禁止多人同时绝命。斩杀时三人必须几乎同时到 1%——否则「金莲之缚」回约 30% 血。",
      skills: [
        {
          name: "金莲之缚（Bond of the Golden Lotus）",
          desc: "任一到约 1% 且同伴仍存活，则读条回复约 30% 生命。必须三人一起压到斩杀线并在读条结束前全部倒下。",
          who: "全团斩杀",
        },
        {
          name: "洛克：腐化酒桶 / 对撞+腐化踢 / 复仇打击",
          desc: "酒桶点远程，5 码伤+65% 减速，可躲开。对撞后原地旋转踢（约 10 码），全员跑开。复仇打击为正面锥形，坦克开减伤。",
          who: "全员 / 坦克",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/fallen-protectors/corruptedBrew.mp4",
              caption: "躲开腐化酒桶",
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/fallen-protectors/clash.mp4",
              caption: "对撞后远离洛克的旋转踢",
            },
          ],
        },
        {
          name: "洛克·绝命化身",
          desc: "刷出悲苦/哀伤/阴郁三化身。哀伤「炼狱打击」8 码分摊集合；阴郁「腐蚀震击」必打断；悲苦「亵渎地面」砸坦留永久黑圈，必须把悲苦拉出人群再放。",
          who: "全团 / 坦克 / 打断",
        },
        {
          name: "何：剧毒 / 锁喉 / 凿击",
          desc: "近战留毒池，躲开。锁喉流血持续到何进绝命才清除。凿击会瘫痪当前坦约 8 秒并让何锁定随机玩家——副坦立刻嘲讽；能背对时可减轻瘫痪效果。",
          who: "坦克 / 治疗",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/fallen-protectors/noxiousPoison.mp4",
        },
        {
          name: "何·绝命：苦痛印记（Mark of Anguish）",
          desc: "化身锁定带印记者：定身+DoT，并上「衰弱」约 90% 减甲（长时）。可用额外按钮 40 码内传递。化身平砍叠暗影易伤；每次传递还会给全团叠一层易伤。优先让有免疫/强减伤者短持再传，减少全团层数。",
          who: "传递链 / 减伤职业",
        },
        {
          name: "孙：煞能灼烧 / 暗言术：祸 / 灾祸",
          desc: "灼烧是读条溅射，应当打断（并避免 5 码重叠）。祸会跳跃，出现即驱。灾祸约 30% 最大生命团伤并清除所有祸，对齐减伤。",
          who: "打断 / 治疗",
        },
        {
          name: "孙·绝命：黑暗冥想",
          desc: "刷出绝望/绝望化身，孙持续半秒跳暗影伤。站在场地中央「冥想力场」内减伤，并在场内清化身。",
          who: "全团",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/fallen-protectors/darkMeditation.mp4",
        },
      ],
      mechanics: [
        "控血顺序示例：洛克 66% → 何 66%（顺便清锁喉）→ 孙 66% → 同样做 33% → 最后三线压平同步斩杀。",
        "绝命阶段 Boss 身上已有 DoT 仍会继续跳，注意别误压到下一阈值。",
        "洛克绝命：分摊哀伤 → 打断阴郁 → 悲苦拉外放黑圈。",
        "何绝命：免疫/强减持印记短传；别让化身一直平砍同一人。",
        "孙绝命：全员进中央力场；平时灼烧优先打断、祸秒驱。",
      ],
      positioning:
        "轻度散开。洛克背对大团；何外拉留毒池；孙靠近便于打断。孙绝命全员进中央力场；哀伤分摊短暂集合；悲苦黑圈永久，越靠边越好。",
      roles: {
        tank: "分坦洛克与何。凿击时副坦嘲讽；洛克绝命把悲苦拉出放圈；洛克锥形开减伤。",
        healer: "锁喉点抬；祸秒驱；灾祸/冥想开减伤。关注印记传递链血线。",
        dps: "按表控血；绝命转火化身；打断阴郁与孙的灼烧；斩杀三线同步。",
      },
      notes:
        "与 MythicTrap/WCL 嵌入攻略对齐。常见灭团：绝命重叠、斩杀不同步、悲苦黑圈铺满、印记乱传叠易伤、灼烧漏断。",
      quests: "成就向可能限制绝命次数；无强制剧情任务。",
      diagram: "protectors",
    },
    {
      id: "norushen",
      idx: 3,
      name: "诺鲁什",
      en: "Norushen",
      zone: "怒焰裂谷深处",
      tags: ["腐蚀 75", "三类考验", "净化增益"],
      refs: [
        { label: "Warcraft Logs 指南", url: "https://classic.warcraftlogs.com/guide/norushen" },
        { label: "MythicTrap 正文", url: "https://www.mythictrap.com/en/siege-of-orgrimmar/norushen" },
      ],
      summary:
        "真正对手是「腐蚀混合物」（Amalgam of Corruption），诺鲁什是协助者。全员开场 75 腐蚀（上限 100），腐蚀越高对混合物伤害越低。与「净化之光」互动进入职责考验，成功则腐蚀归 0 并获得「净化」职责增益。考验应分波进入，保证外场仍能处理小怪。约 7 分钟硬狂暴（隔离安全措施）。",
      skills: [
        {
          name: "腐蚀 / 净化（Corruption / Purified）",
          desc: "开场 75。腐蚀越高对混合物输出越低。腐蚀归 0 并保持时获得净化：DPS 增伤、治疗增疗、坦克减伤。0 腐蚀者无法再进考验。",
          who: "全员",
        },
        {
          name: "盲目仇恨（Blind Hatred）",
          desc: "Boss 与场地一角之间生成旋转光束，站在里面每秒吃暗影伤害，必须躲开。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/norushen/blindHatred.mp4",
        },
        {
          name: "释放的愤怒（Unleashed Anger）",
          desc: "对当前坦造成高额物理伤害，并叠层使后续该技能伤害提高约 50%。必须换坦。",
          who: "坦克",
        },
        {
          name: "冰寒恐惧（Icy Fear）",
          desc: "约每 3 秒全团冰霜伤害；混合物血量越低越痛，后期治疗需显著抬升。",
          who: "治疗",
        },
        {
          name: "DPS 考验：平静（Test of Serenity）",
          desc: "限时约 60 秒。打 1 只腐蚀具现 + 若干腐蚀精华（数量与进入时腐蚀有关）。具现有可躲的「撕裂现实」正面；精华读「驱逐腐蚀」直线球，可打断或躲开。打掉的怪会在外场以「释放」形态出现。",
          who: "DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/norushen/testOfSerenity.mp4",
        },
        {
          name: "治疗考验：信赖（Test of Reliance）",
          desc: "击杀大型腐蚀，同时保 3 个友方 NPC。技能含团伤笑、黑坑、以及 10 秒后爆炸的「残留腐蚀」Debuff——必须驱散。",
          who: "治疗",
        },
        {
          name: "坦克考验：信心（Test of Confidence）",
          desc: "对抗泰坦腐蚀约 1 分钟存活即可净化。躲正面砸、打断「投掷腐蚀」、躲地面爆发；平砍叠腐蚀 DoT；「穿透腐蚀」会穿透吸收盾。",
          who: "坦克",
        },
        {
          name: "50% 后：磨损 / 释放的具现",
          desc: "50% 起启用 Frayed，之后每掉约 10% 刷一只大型释放具现。具现周期性「愤怒爆发」团伤；死后留「残留腐蚀」圈，需 ≤75 腐蚀的玩家浸泡清除（英雄浸泡会 +25 腐蚀）。",
          who: "全团 / 浸泡组",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/norushen/burstOfAnger.mp4",
        },
        {
          name: "驱逐腐蚀（外场精华）",
          desc: "考验里精华死后，外场出现释放精华并射出暗影球。无人拦截则混合物获得「融合」约 +8% 伤害（短时）。必须有人挡/吃球。",
          who: "机动 / 全员",
        },
      ],
      mechanics: [
        "分波进考验：保持外场有人处理具现与拦截，同时让尽量多人处于净化状态打 Boss。",
        "DPS 考验打掉的怪会出外场——进考验等于给外场加活，指挥要算好节奏。",
        "尽量在 50% 前完成主要净化轮次，以应对冰寒恐惧 + Frayed 具现高潮。",
        "残留圈：腐蚀 ≤75 者浸泡；英雄注意浸泡涨腐蚀，可能需要再次考验。",
        "7 分钟硬狂暴，嗜血常见交在约 50%。",
      ],
      positioning:
        "混合物居中。光束旋转时沿边缘预留跑位。外场松散可治疗站位。残留圈只留给排班浸泡者；精华弹道路径上安排拦截人。",
      roles: {
        tank: "释放的愤怒换坦；拉外场具现；按表进信心考验或浸泡。考验内打断投掷、躲正面。",
        healer: "冰寒恐惧随血量抬升治疗。考验内保 NPC、秒驱残留 Debuff。外场具现存活期与愤怒爆发需爆发抬血。",
        dps: "按波进平静考验；归来立刻清外场具现/挡球。Adds 优先于盲目木桩 Boss。",
      },
      notes:
        "与 MythicTrap/WCL 嵌入攻略对齐。常见翻车：同时进考验过多外场崩盘、残留圈无人踩、精华球漏挡给 Boss 融合、0 腐蚀还想再进考验。",
      quests: "传说相关进度可能涉及；无强制额外任务。",
      diagram: "norushen",
    },
    {
      id: "pride",
      idx: 4,
      name: "傲之煞",
      en: "Sha of Pride",
      zone: "怒焰裂谷深处",
      tags: [
        "傲气资源",
        "肿胀傲气",
        "200秒软狂暴"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/sha-of-pride"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/sha-of-pride"
        }
      ],
      summary: "全员从 0 傲气开始累积；Boss 能量满施放「肿胀傲气」造成全团暗影伤害并 +5 傲气，再按当前傲气档位触发额外惩罚。100 傲气获得「克服」：生命翻倍并在随后肿胀时永久心控。诺鲁什每 25 秒赐「泰坦之赐」（约 20 秒免疫傲气），集合可叠「泰坦之力」（急速与伤害/治疗 +15%，15 秒）。30% 进入释放：诺鲁什死亡并「最终赠礼」清零傲气，之后每 10 秒全团伤害并 +5 傲气——约 200 秒后全团心控。",
      skills: [
        {
          name: "肿胀傲气（Swelling Pride）",
          desc: "Boss 能量满时全团高额暗影伤害并 +5 傲气。档位：0–24 无额外；25–49 爆裂傲气（脚下水池 3 秒后爆，4 码内重伤并 +5）；50–74 投影（约 15 码外，6 秒内站上去可化解）；75–99 傲气光环（25 秒，4 码脉冲伤友并 +5）；100 克服（心控至战斗结束，生命 +100%）。",
          who: "全员"
        },
        {
          name: "泰坦之赐 / 泰坦之力（Gift of the Titans）",
          desc: "约每 25 秒，诺鲁什给若干玩家赐福约 20 秒：期间免疫傲气获取。赐福玩家集合可获得泰坦之力（急速与伤害/治疗 +15%，持续约 15 秒）。",
          who: "全员"
        },
        {
          name: "受伤的傲气（Wounded Pride）",
          desc: "坦克吃到后，接下来约 15 秒内每次被近战命中 +5 傲气。期间必须换坦。",
          who: "坦克"
        },
        {
          name: "延伸攻击（Reaching Attack）",
          desc: "近战位无人时，随机玩家吃高额暗影伤害并 8 秒内暗影易伤 +25%。必须保持有人在近战。",
          who: "近战 / 坦克"
        },
        {
          name: "腐化牢笼（Corrupted Prison）",
          desc: "10 人锁 2 人 / 25 人锁 4 人。激活时 12 码内击飞、暗影伤害并 +5 傲气。被囚者昏迷并每秒重伤与 +5 傲气，直到队友踩锁符文解救。激活时远离，立刻派人踩锁。",
          who: "救援组",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/sha-of-pride/corruptedPrison.mp4"
        },
        {
          name: "傲慢印记（Mark of Arrogance）",
          desc: "10 人 2 个 / 25 人 5 个目标叠层暗影 DoT，单体驱散后消；驱散者 +5 傲气。治疗轮流驱，优先在泰坦之赐窗口驱，避免驱散者冲到 100。",
          who: "治疗"
        },
        {
          name: "自我反射（Self-Reflection）",
          desc: "随机玩家位置刷小型反射小怪，约 2 秒后 AoE 暗影伤并 +5 傲气。优先点名高傲气玩家。顺劈清掉即可。",
          who: "DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/sha-of-pride/selfReflection.mp4"
        },
        {
          name: "傲气具现 / 嘲讽冲击（Manifestation）",
          desc: "周期性召唤具现。可打断的嘲讽冲击对随机目标造成中等暗影伤并 +5 傲气。死亡时最近 2 名玩家各 +5 傲气。优先打断并尽快击杀。",
          who: "DPS / 打断",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/sha-of-pride/mockingBlast.mp4"
        },
        {
          name: "释放 / 最终赠礼（Unleashed）",
          desc: "30% 时傲之煞释放并杀死诺鲁什；诺鲁什施放最终赠礼将全团傲气降至 0。此后每 10 秒全团中等伤害并 +5 傲气；约 200 秒后全团克服心控。进入爆发收尾。",
          who: "全团"
        },
        {
          name: "【英雄】放逐 / 不稳定腐蚀",
          desc: "额外放逐进煞迷宫；场上裂隙可关闭但有副作用，需分区处理（英雄难度补充）。",
          who: "被点名 / 机动",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/sha-of-pride/banishment.mp4",
              caption: "放逐（英雄）"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/sha-of-pride/unstableCorruption.mp4",
              caption: "不稳定腐蚀（英雄）"
            }
          ]
        }
      ],
      mechanics: [
        "管理傲气档位：30% 前尽量少人进入 50+（投影）与 75+（光环），避免 100 克服。",
        "肿胀前：25–49 出团躲开自己的水池；50–74 限时站上投影；75–99 散开避免光环伤友。",
        "赐福玩家集合叠泰坦之力；驱散尽量卡在赐福免疫窗口。",
        "牢房：激活远离 12 码；立刻按分配踩锁救人（被囚每秒 +5 傲气）。",
        "具现：打断嘲讽冲击；击杀时注意最近 2 人会吃傲气。",
        "30% 释放阶段开嗜血爆发；约 200 秒硬时限前必须击杀。"
      ],
      positioning: "常规在 Boss 附近集合吃赐福与泰坦之力，并预留牢房激活的安全距离。肿胀与高傲气光环时临时散开，处理完再集合。保持近战位有人，避免延伸攻击。英雄按象限分工关裂隙。",
      roles: {
        tank: "受伤的傲气期间立刻换坦；始终保持近战位；协助拉具现/反射。",
        healer: "轮流驱散傲慢印记，优先赐福窗口；肿胀与释放阶段群抬；留意牢房被囚者。",
        dps: "优先转火具现并打断嘲讽冲击；顺劈反射；控傲气优先于极限木桩；赐福时集合。"
      },
      notes: "卡关常见：牢房未及时解锁导致傲气暴涨、投影超时、驱散者不轮换冲到 100、近战空位触发延伸攻击、30% 后拖过约 200 秒。",
      quests: "低傲气等成就；常见 ROLL 点。",
      diagram: "pride"
    },
    {
      id: "galakras",
      idx: 5,
      name: "迦拉卡斯",
      en: "Galakras",
      zone: "奥格瑞玛城门",
      tags: [
        "两阶段攻城",
        "双塔迫降",
        "火球拦截"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/galakras"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/galakras"
        }
      ],
      summary: "两阶段。P1 共约 8 波地面增援，同时派小队清双塔并占领防空炮；两侧炮同时开火击落迦拉卡斯。粗略优先级：治疗潮图腾与战旗 ASAP → 投石车/碎骨者 → 注意暗影追猎者传送并躲开暗影突击。P2 落地打龙：缓慢火球需多人拦截减免爆炸（拦截叠火焰 DoT），并硬顶脉冲火焰叠层软狂暴。友方 NPC 死亡即灭团。",
      skills: [
        {
          name: "战旗（War Banner）",
          desc: "龙喉旗手放下战旗，大幅强化附近敌方。必须第一优先级拆旗。",
          who: "DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/galakras/warBanner.mp4"
        },
        {
          name: "轰击 / 投石车（Bombard）",
          desc: "库卡隆投石车会持续轰击你正在打的那座塔，塔内玩家吃高额伤害。出现即优先击杀。",
          who: "地面 DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/galakras/bombard.mp4"
        },
        {
          name: "潮汐萨满：治疗潮图腾 / 治疗链 / 潮汐波",
          desc: "治疗潮图腾对附近敌人大量治疗，必拆。治疗链与潮汐波（伤+击退）应尽量打断。",
          who: "打断 / DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/galakras/healingTideTotem.mp4"
        },
        {
          name: "碎骨者：骨折 / 碎裂咆哮",
          desc: "冲向友方 NPC 读条骨折（约每秒 10% 目标生命）；持续碎裂咆哮伤团与 NPC。必须尽快击杀，保护 NPC。",
          who: "坦克 / DPS"
        },
        {
          name: "暗影追猎：暗影潜行 / 暗影突击",
          desc: "传送到随机玩家背后，数秒后暗影突击（极易秒杀）。被贴身后立刻挪开。",
          who: "全员"
        },
        {
          name: "火焰射手 / 步兵 / 原龙",
          desc: "射手留火圈勿站；步兵高近战伤需坦克拉住，远程可能吃投斧昏迷；空中原龙用塔顶防空炮击落。",
          who: "全员 / 坦克"
        },
        {
          name: "地面首领：蛇女柯尔格拉",
          desc: "约第 3 波（约 2 分钟）出场，常带 2 只暗影追猎者。叠层自然 DoT；50% 后「毒咒」开启剧毒箭雨团伤。脚下持续铺毒云，坦克风筝让近战躲开。",
          who: "坦克 / 治疗",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/galakras/curseOfVenom.mp4",
              caption: "毒咒后的团伤"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/galakras/poisonCloud.mp4",
              caption: "风筝躲开毒云"
            }
          ]
        },
        {
          name: "地面首领：高阶执行官索拉诺克",
          desc: "约第 7 波（约 4 分钟）。「粉碎者的召唤」钩 5/10 人（10/25 人）拉近，随后读条颅骨碎裂（2 秒）对 10 码内巨额伤害——被钩立刻跑出。另有顺劈，非坦勿贴正面。",
          who: "被钩玩家 / 坦克",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/galakras/crushersCall.mp4"
        },
        {
          name: "塔楼首领 / 防空炮",
          desc: "左塔波 4 解锁中尉库鲁格鲁克（弧形斩击正面击飞 + 雷霆一击叠减速）；右塔波 8 解锁炮手大师达戈林（枪口喷射多段正面击飞）。清塔占炮；两侧同时开火迫降迦拉卡斯。塔内楼梯也有小怪。",
          who: "塔楼组"
        },
        {
          name: "P2：伽拉克隆之焰",
          desc: "落地后对随机玩家缓慢飞来火球。路径上多人拦截可减免到达爆炸；拦截者叠火焰 DoT。常设近战一组、远程稍后一组形成拦截链。",
          who: "路径经过者",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/galakras/flamesOfGalakrond.mp4"
        },
        {
          name: "P2：脉冲火焰",
          desc: "持续全团火焰伤，Boss 叠层使火焰伤害每层约 +2%。尽快击杀，形成软狂暴。",
          who: "治疗 / DPS"
        },
        {
          name: "【英雄】塔门 NPC",
          desc: "英雄塔门不会自动开：需保护友方 NPC 约 90 秒解锁；NPC 死亡则进度重置。应派一组守在塔门附近护卫。",
          who: "机动 / 护塔组"
        }
      ],
      mechanics: [
        "波次要点：波 3 蛇女、波 4 左塔、波 7 索拉诺克、波 8 右塔。",
        "地面转火：旗/治疗潮图腾 → 投石车与碎骨者 → 其余；萨满技能尽量打断。",
        "双塔炮位就绪后尽量同时开炮再进 P2，可先清干净地面。",
        "P2 火球用站位链拦截，DoT 过高者可暂时离堆；嗜血常见交 P2。",
        "保护友方 NPC，死亡即灭团。"
      ],
      positioning: "P1 地面松散，躲开火圈与毒云；被暗影追猎贴身立刻挪开；被索拉诺克钩中立刻跑出 10 码。塔顶远离边缘防击飞。P2 近战贴龙一组，远程约 20–30 码再一组，保证火球路径必经有人。",
      roles: {
        tank: "拉步兵与地面首领；蛇女风筝毒云；索拉诺克顺劈背离人群；保护 NPC 不被碎骨者冲垮。",
        healer: "P1 地面/塔楼分队抬；蛇女 50% 后团伤抬升；P2 脉冲+火球 DoT。",
        dps: "拆旗/图腾与投石车优先；塔楼组以占炮为先；打断萨满；P2 参与火球拦截。"
      },
      notes: "与 MythicTrap/WCL 对齐。常见翻车：漏拆旗或图腾、投石车轰塔、暗影突击秒人、被钩后不跑颅骨碎裂、双塔不同时开炮、P2 火球无人拦截。",
      quests: "攻城场景成就。",
      diagram: "galakras"
    },
    {
      id: "juggernaut",
      idx: 6,
      name: "钢铁战蝎",
      en: "Iron Juggernaut",
      zone: "奥格瑞玛城门",
      tags: [
        "突击2分/攻城1分",
        "踩地雷",
        "震波靠墙"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/iron-juggernaut"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/iron-juggernaut"
        }
      ],
      summary: "严格计时两阶段循环：突击模式恰好 2 分钟（可移动、有近战）→ 攻城模式 1 分钟（原地、不近战）再循环。突击处理钻孔尖刺、迫击、火焰喷射换坦与爬行地雷；攻城有震波击退（背靠墙）、爆炸焦油、切割激光（绝不可拖进焦油）、地震脉冲与攻城炮。约每 20 秒身后刷 3 枚地雷，6 秒内未近战右键踩灭会团爆。",
      skills: [
        {
          name: "钻孔（Borer Drill）",
          desc: "从 Boss 向多方向射出移动地刺，碰到吃高额伤害。必须躲开。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/iron-juggernaut/borerDrill.mp4"
        },
        {
          name: "爬行地雷（Crawler Mine）",
          desc: "约每 20 秒在身后刷 3 枚，不可攻击、不移动。约 6 秒后爆炸造成高额全团伤。近战距离右键踩灭可阻止，踩雷者吃高额伤害并被击飞。通常副坦负责；有免疫也可协助。攻城阶段仍刷雷，双坦都可踩。",
          who: "副坦 / 免疫",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/iron-juggernaut/crawlerMineBlast.mp4"
        },
        {
          name: "迫击炮轰击（Mortar Blast）",
          desc: "约每 12 秒点名远程位置，3 秒后落地，8 码内极高伤害。看到红圈立刻离开。",
          who: "远程",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/iron-juggernaut/mortarBlast.mp4"
        },
        {
          name: "火焰喷射口（Flame Vents）",
          desc: "正面锥形高额火焰伤，并叠火焰易伤（每层约 +10%）。坦克必须换坦。",
          who: "坦克"
        },
        {
          name: "激光灼烧（Laser Burn）",
          desc: "随机玩家被激光命中吃高额伤害并留下跳动 DoT，治疗抬血。",
          who: "治疗"
        },
        {
          name: "震波（Shock Pulse）",
          desc: "攻城阶段全员击退。背后务必有墙/障碍，否则会被打飞出治疗范围。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/iron-juggernaut/shockPulse.mp4"
        },
        {
          name: "爆炸焦油（Explosive Tar）",
          desc: "攻城时刷焦油池：池内持续伤+减速。切割激光碰到焦油会爆炸，造成高额全团伤。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/iron-juggernaut/explosiveTar.mp4"
        },
        {
          name: "切割激光（Cutter Laser）",
          desc: "点名玩家追逐约 10 秒，碰到激光吃高伤。被点名沿安全路线风筝，严禁把激光带进焦油。",
          who: "被点名",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/iron-juggernaut/cutterLaser.mp4"
        },
        {
          name: "攻城炮 / 地震活动",
          desc: "随机射击玩家并对 6 码内溅射 → 适当散开。攻城全程每秒脉冲全团伤，治疗持续抬。",
          who: "全员 / 治疗"
        },
        {
          name: "【英雄】弹跳锯片（Ricochet）",
          desc: "仅突击模式：旋转锯片在场上移动，碰到受伤。躲开路径。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/iron-juggernaut/ricochet.mp4"
        },
        {
          name: "【英雄】迫击弹幕（Mortar Barrage）",
          desc: "仅攻城模式：持续在近战范围与随机位置刷高伤红圈。常见打法是墙边集合用减伤硬顶，仅激光目标短暂出列。",
          who: "近战 / 治疗",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/iron-juggernaut/mortarBarrage.mp4"
        }
      ],
      mechanics: [
        "计时：突击 2 分钟 → 攻城 1 分钟，循环。",
        "开战前选好攻城震波会撞墙的站位。",
        "地雷：6 秒内踩灭；突击时副坦主责，攻城双坦都可。",
        "切割激光严禁进入焦油。",
        "英雄：突击躲锯片；攻城墙边集合顶弹幕。"
      ],
      positioning: "突击：Boss 背对大团，远程散开躲迫击与地刺。攻城：全员预背靠墙/障碍；焦油区留空给激光风筝。英雄攻城更强调墙边大团。",
      roles: {
        tank: "火焰喷射换坦；组织踩雷（突击副坦为主）；面向背离人群。",
        healer: "激光灼烧 DoT、踩雷击飞、攻城地震与英雄弹幕是高压。",
        dps: "躲地刺/迫击/锯片优先；被激光点名按安全路径风筝并避开焦油。"
      },
      notes: "与 MythicTrap/WCL 对齐。最常见灭团：震波无墙、漏踩地雷团爆、激光拖进焦油。",
      quests: "无强制任务。",
      diagram: "juggernaut"
    },
    {
      id: "shaman",
      idx: 7,
      name: "库卡隆黑暗萨满",
      en: "Kor'kron Dark Shaman",
      zone: "奥格瑞玛城门",
      tags: [
        "共享血量",
        "85/65/50/25%",
        "场地压缩"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/korkron-dark-shaman"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/korkron-dark-shaman"
        }
      ],
      summary: "破地者哈洛姆与缚潮者卡德里斯共享血量，同时开战。各带座狼暗牙/血爪（顺劈即可，勿急杀）。每人开场各有基础技能，并在约 85% / 65% / 50% 解锁新技能；25% 双方嗜血（伤害与急速 +25%）。坦克需逐步挪位，因毒风暴、灰烬墙等持续压缩场地。",
      skills: [
        {
          name: "灵魂链接 / 座狼",
          desc: "双萨共享血量，可合理 cleave。座狼有正面挥击（背对大团）与叠层撕裂流血；DoT/顺劈慢慢清即可。",
          who: "坦克 / DPS"
        },
        {
          name: "霜暴打击 / 霜暴箭",
          desc: "哈洛姆：重冰霜伤并叠易伤（每层约 +25%，30 秒）→ 必须换坦。卡德里斯：约每 10 秒 1.5 秒读条霜暴箭打坦，高额冰霜伤。",
          who: "坦克 / 治疗"
        },
        {
          name: "毒雾图腾（约 85%）：毒雾 / 毒风暴",
          desc: "哈洛姆「毒雾」点名：30 秒每 3 秒自然伤，每次跳叠「毒性」约 +10% 自然易伤。卡德里斯「毒风暴」约 1.5 分钟毒云，9 码内每 2 秒重伤，并周期性刷毒龙卷风（击飞+持续自然伤）。",
          who: "全员 / 治疗",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/korkron-dark-shaman/toxicStorm.mp4"
        },
        {
          name: "污秽图腾（约 65%）：污秽水流",
          desc: "哈洛姆射出可躲的绿色地面线，数秒后爆炸高额自然伤。必须提前统一跑法出线。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/korkron-dark-shaman/foulStream.mp4"
        },
        {
          name: "污秽喷泉 / 污秽软泥",
          desc: "卡德里斯对坦克方向喷绿团：落地 3 码巨伤并刷污秽软泥。软泥有仇恨表，每秒脉冲自然伤，坦克需风筝并由远程优先清理，勿让其贴进近战堆。",
          who: "坦克 / 远程",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/korkron-dark-shaman/foulGeyser.mp4"
        },
        {
          name: "灰焰图腾（约 50%）：灰烬之墙",
          desc: "哈洛姆召唤一排不可移动的灰烬元素：近战距离会被平砍秒级伤害。墙永久占格；尽量把新墙与旧墙重叠以省空间。",
          who: "坦克 / 全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/korkron-dark-shaman/ashenWall.mp4"
        },
        {
          name: "坠灰（Falling Ash）",
          desc: "大片红区标记，约 15 秒后陨石落地：圈内致死级火焰伤 + 全团中等火焰伤。出圈并对齐团队减伤。",
          who: "全员 / 治疗",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/korkron-dark-shaman/fallingAsh.mp4"
        },
        {
          name: "嗜血强化（约 25%）",
          desc: "双方获得约 25% 急速与 25% 伤害加成。开减伤并尽快收尾。",
          who: "治疗 / 全团"
        },
        {
          name: "【英雄】铁之墓 / 铁之囚笼",
          desc: "约 95% 生锈铁图腾：哈洛姆「铁之墓」在随机位置刷永久铁柱占位（注意间距）。卡德里斯「铁之囚笼」给随机玩家约 60 秒倒计时，到期造成致死级物理伤——到期前必须抬满并用个人/团队减伤硬顶。",
          who: "全员 / 治疗",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/korkron-dark-shaman/ironTomb.mp4"
        }
      ],
      mechanics: [
        "叠打时坦克逐步绕场挪位，给毒风暴与灰烬墙留空间。",
        "阈值：85% 毒 → 65% 污秽 → 50% 灰烬/坠灰 → 25% 嗜血。",
        "污秽水流统一口令；软泥远程清、坦克风筝。",
        "灰烬墙尽量重叠放置；坠灰每次对齐减伤。",
        "英雄：铁墓占位 + 铁囚笼到点减伤；可考虑分边降低技能重叠。"
      ],
      positioning: "双萨相对靠近便于 cleave 时，坦克仍要绕场挪位。远程中间，注意毒云与灰墙。英雄可分边拉开。灰烬墙引导到已占区域重叠。",
      roles: {
        tank: "哈洛姆霜暴打击换坦；座狼挥击背离人群；污秽软泥风筝；灰烬墙重叠省地。",
        healer: "毒雾叠易伤末期、坠灰落地、25% 嗜血；英雄盯铁囚笼到点抬满+减伤。",
        dps: "共享血 cleave；喷泉阶段远程优先清软泥；严格躲线/毒云/坠灰。"
      },
      notes: "与 MythicTrap/WCL 对齐。常见翻车：水流坑队友、软泥进近战、灰墙铺满、坠灰漏减伤、英雄铁囚笼到期秒人。",
      quests: "常见 ROLL 点。",
      diagram: "shaman"
    },
    {
      id: "nazgrim",
      idx: 8,
      name: "纳兹戈林将军",
      en: "General Nazgrim",
      zone: "奥格瑞玛城门",
      tags: [
        "怒气技能",
        "三姿态",
        "增援潮"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/general-nazgrim"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/general-nazgrim"
        }
      ],
      summary: "战士式怒气 Boss：怒气技能约每 15 秒冷却结束后，释放当前怒气能负担的最贵技能。尽量少给怒气（躲机制、防御姿态停手）。姿态循环各约 1 分钟：战斗 → 狂暴 → 防御。周期性召唤库卡隆增援；小怪优先级：战旗 > 战萨 > 奥术织法者 > 刺客/铁刃（英雄含狙击手同末档）。",
      skills: [
        {
          name: "姿态：战斗 / 狂暴 / 防御",
          desc: "战斗：每秒 +1 怒气。狂暴：伤害与受伤均 +25%，怒气获取翻倍。防御：受伤 -10%，被击中时 +2 怒气（每秒最多一次）——开荒期应对 Boss 停手，只打小怪。",
          who: "指挥 / DPS"
        },
        {
          name: "破甲打击（Sundering Blow）",
          desc: "对当前坦高额物理并叠约 10% 减甲。施放给 Boss +5 怒气，目标每已有一层再 +5。约 2–3 层换坦。",
          who: "坦克"
        },
        {
          name: "碎骨者（Bonecracker）",
          desc: "随机玩家 30 秒流血：每秒小物理伤并降低约 10% 最大生命。治疗重点照顾。",
          who: "治疗"
        },
        {
          name: "英勇震波（30 怒气）",
          desc: "跳向随机玩家：落地 10 码高额物理伤，并刷出余波火焰线；踩到线吃巨额火焰伤且每名被击中玩家给 Boss +3 怒气。震波前散开并躲开余波。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/general-nazgrim/heroicShockwave.mp4"
        },
        {
          name: "库卡隆战旗（50 怒气）",
          desc: "召唤可攻击战旗：存在期间所有小怪攻击命中会给 Boss +3 怒气。出现立刻优先拆除。",
          who: "DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/general-nazgrim/korKronBanner.mp4"
        },
        {
          name: "战歌（70 怒气）",
          desc: "全团物理伤约等于各人最大生命的 65%。落地前抬满并对齐治疗/团队减伤。",
          who: "治疗 / 全团",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/general-nazgrim/warSong.mp4"
        },
        {
          name: "破坏者（100 怒气）",
          desc: "向随机位置扔出旋转武器，持续到战斗结束：6 码内巨额物理伤，每次打到人给 Boss +5 怒气。必须躲开旋刃。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/general-nazgrim/ravager.mp4"
        },
        {
          name: "增援：战萨 / 奥术 / 刺客 / 铁刃",
          desc: "战萨：打断强化治疗链；秒拆治疗潮图腾（每 3 秒奶附近盟友约 30%）；大地盾可驱散；把萨满拉离图腾。奥术织法者：打断奥术震击/魔击，魔法震击 DoT 可驱。刺客：猎人照明弹显形；背后背刺致死——减速/昏迷并风筝。铁刃：副坦拉到侧边，6 码旋风可用昏迷打断；50% 会开破釜沉舟约 +25% 最大生命。",
          who: "打断 / 转火 / 副坦"
        },
        {
          name: "【英雄】斩首 / 狙击手",
          desc: "约每 18 秒对当前坦施放斩首，高额物理，需主动减伤。额外召唤狙击手：猎人印记锁定非坦，射击与多重射击锥形——被标记者把面向带离大团；击杀优先级与刺客/铁刃同属末档。",
          who: "坦克 / 被标记"
        }
      ],
      mechanics: [
        "控怒气：躲震波余波、秒旗、防御姿态停手 Boss。",
        "小怪：战旗 > 战萨/治疗潮 > 奥术 > 刺客/铁刃（英雄+狙击手）。",
        "看怒气预判：30 震波 / 50 旗 / 70 战歌 / 100 破坏者。",
        "嗜血常见交狂暴姿态窗口。",
        "Adds 优先于 Boss；防御姿态只清场。"
      ],
      positioning: "震波前预散；躲开余波线与破坏者旋刃。铁刃与治疗潮拉离大团。远程相对集中但留出口。英雄狙击手把多重射击锥形背离人群。",
      roles: {
        tank: "主坦 2–3 层破甲换坦；副坦接小怪并拉离铁刃/图腾。英雄斩首预减伤。",
        healer: "战歌前抬满；碎骨者减最大生命需重点；驱散奥术 DoT/战萨大地盾。",
        dps: "Adds > Boss；防御姿态停手 Boss；秒旗/图腾；打断战萨与奥术。"
      },
      notes: "与 MythicTrap/WCL 对齐。最经典灭团：防御姿态继续木桩涨怒气 → 连续战歌/破坏者。",
      quests: "进入地下堡垒前节点。",
      diagram: "nazgrim"
    },
    {
      id: "malkorok",
      idx: 9,
      name: "马尔考罗克",
      en: "Malkorok",
      zone: "地下堡垒",
      tags: [
        "远古瘴气",
        "库卡隆之力/血之怒",
        "6分钟狂暴"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/malkorok"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/malkorok"
        }
      ],
      summary: "计时两阶段循环：库卡隆之力约 2 分钟（怒气 0→100）用圆弧斩、地震猛击、聚爆能量等；满怒进入血之怒约 20 秒（怒气每秒 -5 至 0），近战巨额物理可分摊或由坦克叠减伤硬吃。全程「远古瘴气」把治疗转为远古屏障（上限约 100% 最大生命），并每 2 秒暗影团伤——血之怒期间屏障失效。约 6 分钟「根除」硬狂暴。",
      skills: [
        {
          name: "远古瘴气 / 远古屏障",
          desc: "治疗被吸收并转化为远古屏障（可吸收伤害，含坠落）。治疗应尽量把盾铺满。瘴气每 2 秒对全团暗影伤。血之怒阶段屏障不生效。",
          who: "治疗"
        },
        {
          name: "致命打击（Fatal Strike）",
          desc: "平砍叠受伤提高约 10%/层，持续约 30 秒。约 15 层或 Debuff 将断时换坦。",
          who: "坦克"
        },
        {
          name: "圆弧斩（Arcing Smash）",
          desc: "点名随机玩家的约 40 码正面扇形，读条后高额物理伤。必须躲开。全场保持散开避免重叠吃斩。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/malkorok/arcingSmash.mp4"
        },
        {
          name: "亚煞极之息（Breath of Y'Shaarj）",
          desc: "在近期被圆弧斩命中过的区域引爆，致死级暗影伤。记住扇形落点，吐息前清空旧扇形，直到本阶段结束都勿再踩。",
          who: "全员"
        },
        {
          name: "地震猛击（Seismic Slam）",
          desc: "约每 15 秒点名随机玩家及其 5 码内：巨额物理伤并击飞。保持散开避免溅射。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/malkorok/seismicSlam.mp4"
        },
        {
          name: "聚爆能量（Imploding Energy）",
          desc: "场上刷 3（10 人）/ 7（25 人）个裂隙：有人在内爆炸时中等暗影伤；任一裂隙无人则全团巨额暗影伤。分配满盾玩家各踩一个。",
          who: "全员分配",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/malkorok/implodingEnergy.mp4"
        },
        {
          name: "血之怒 / 无情突袭",
          desc: "100 怒气进入血之怒：近战巨额物理可多人分摊，或坦克叠减伤/团队减伤单吃。每秒 -5 怒气，到 0 结束。结束后叠「无情突袭」约 +25% 伤害，后续压力递增。",
          who: "坦克 / 全团"
        },
        {
          name: "错位能量（Displaced Energy）",
          desc: "血之怒阶段随机 DoT（约 9 秒每 3 秒暗影伤）；到期或被驱散时 8 码巨额暗影爆炸，中者免疫自己的爆炸。出团后再安全驱散。",
          who: "被点名 / 驱散"
        },
        {
          name: "【英雄】亚煞极精华宝珠 / 活性腐蚀",
          desc: "约每 3 秒刷 2/5 个腐蚀宝珠并永久占场：碰到会炸掉并移除远古屏障，需减伤/免疫者定期清理。地震猛击额外刷活性腐蚀，8 码内强减速光环，尽快击杀。血之怒错位能量同样要远离队友。",
          who: "机动 / DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/malkorok/essenceOfYShaarj.mp4"
        }
      ],
      mechanics: [
        "库卡隆之力：散开躲圆弧斩与地震溅射；记扇形方向，吐息前清空；按表踩满盾紫圈。",
        "血之怒：屏障失效；分摊或坦克硬吃；错位点名出团再驱。",
        "盾破后再吃机制很难抬回。",
        "约 6 分钟根除硬狂暴。",
        "英雄：清理宝珠与活性腐蚀，避免盾被宝珠拆光。"
      ],
      positioning: "库卡隆之力阶段全场散开（≥5 码），预留踩紫圈站位。圆弧斩/吐息永远朝安全方向。血之怒可堆 Boss 分摊或按指挥坦克单吃；错位点名出 8 码。",
      roles: {
        tank: "约 15 层致命打击换坦；引导扇形；血之怒按指挥单吃或参与分摊。",
        healer: "持续铺满远古屏障；紫圈与血之怒高压；安全驱散错位能量。",
        dps: "按名单踩紫圈；躲斩与吐息；英雄清宝珠与活性腐蚀。"
      },
      notes: "与 MythicTrap/WCL 对齐。灭团三件套：漏紫圈、站旧扇形吃吐息、血之怒乱站/盾已破。",
      quests: "无强制任务。",
      diagram: "malkorok"
    },
    {
      id: "spoils",
      idx: 10,
      name: "潘达利亚战利品",
      en: "Spoils of Pandaria",
      zone: "地下堡垒",
      tags: [
        "双队象限",
        "开箱攒能量",
        "限时"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/spoils-of-pandaria"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/spoils-of-pandaria"
        }
      ],
      summary: "无本体 Boss。中控台开战后立刻跳下，避免不稳定防御系统伤害。两队各管半场：一组魔古→螳螂，另一组螳螂→魔古。开箱击杀小怪攒能量拉闸；轻/中/重箱约给 1 / 3 / 14 能量。先开熊猫人箱拿职责增益更稳。超时灭团。",
      skills: [
        {
          name: "开箱与能量 / 跳下",
          desc: "轻箱 1、中箱 3、重箱 14 能量。按缺口精确开箱，避免一次开爆。中控台启动后立刻跳下对应象限。",
          who: "指挥 / 全员"
        },
        {
          name: "熊猫人箱：酿酒 / 织雾 / 踏风",
          desc: "击杀后分别给本象限坦克/治疗/DPS 职责增益（百步刃、回响水杖、燃怒之爪）。酿酒扔酒桶减速+火焰吐息，酒桶+吐息可致迷惑需驱；织雾鹤踢拉人并自疗；踏风冲锋留火径，踩火会炸。",
          who: "全员",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/gustingCraneKick.mp4",
              caption: "织雾：鹤踢"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/kegToss.mp4",
              caption: "酿酒：酒桶"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/pathOfBlossoms.mp4",
              caption: "踏风：花径火"
            }
          ]
        },
        {
          name: "魔古重箱：韶天长老议会",
          desc: "「重回石像」击飞并刷石像；每尊石像给议会怪约 +10% 伤害，必须清石像。各长老另有团伤技能（暗影箭雨/熔岩拳/翡翠风暴/碎裂等）。",
          who: "魔古侧",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/returnToStone.mp4"
        },
        {
          name: "魔古中箱：物质扰乱 / 血红重组",
          desc: "活化魔古：两道光束必须有人站，否则全团巨伤（交换站位）。血红重组圈每秒给圈内敌人回约 15% 最大生命——坦克把怪拉出；英雄圈还会伤玩家。",
          who: "魔古侧",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/matterScramble.mp4",
              caption: "站进光束"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/crimsonReconstitution.mp4",
              caption: "怪拉出疗圈"
            }
          ]
        },
        {
          name: "魔古轻箱：火花 / 仪祭 / 石魔古等",
          desc: "葬瓮刷生命火花：4 码脉冲，死亡 8 码爆炸勿贴。暗影仪祭：禁魔打断、折磨驱散、符文可站输出但要把怪拉出。石魔古打断硬化血肉/大地碎片。奎林叠流血需坦克。",
          who: "魔古侧 / 打断"
        },
        {
          name: "螳螂：安放炸弹（Set to Blow）",
          desc: "拆毁者给玩家额外按钮与多层炸弹：跑到后续不去的死角尽快丢光，再离开避免被炸。存活期间信息素云持续自然伤。",
          who: "被点名",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/setToBlow.mp4"
        },
        {
          name: "螳螂：风暴 / 信息素 / 激怒等",
          desc: "驭风者龙卷风越来越快需躲；女皇之怒给友军 +50% 伤害应驱。琥珀祭司：残留 HoT 秒驱、召唤增援。战争召唤者激怒约 +350% 伤害并减速——坦克风筝。轰炸者散开躲炸与地池。虫群信息素云躲开。",
          who: "螳螂侧",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/windstorm.mp4"
        },
        {
          name: "【英雄】不稳定火花",
          desc: "一侧清完一箱的怪后，对侧刷不稳定火花，约 10 秒内不杀会超新星团伤。勿一次开太多箱把对侧火花刷爆；固定人盯火花。",
          who: "对侧远程",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/supernova.mp4"
        }
      ],
      mechanics: [
        "两队语音独立，互不串房；一组魔古→螳螂，另一组相反。",
        "先熊猫箱拿增益，再按能量表推进。",
        "魔古：清石像、站光束、怪离疗圈；螳螂：炸弹丢死角、驱散残留/女皇之怒。",
        "英雄：开箱节奏与对侧火花联动，精打细算。"
      ],
      positioning: "各房扇形拉怪；光束位预先站人；炸弹放后续不去的死角；龙卷风与信息素云预留跑位。",
      roles: {
        tank: "建仇；血红圈/符文把怪拉出；战争召唤者激怒时风筝。",
        healer: "分房抬；驱散折磨/残留/女皇之怒/酒桶迷惑；照看炸弹点名。",
        dps: "听开箱表；石像与火花优先；英雄盯对侧不稳定火花。"
      },
      notes: "与 MythicTrap/WCL 对齐。常见翻车：能量算错超时、光束无人、炸弹放中路、英雄火花刷爆对侧。",
      quests: "相关成就。",
      diagram: "spoils"
    },
    {
      id: "thok",
      idx: 11,
      name: "嗜血的索克",
      en: "Thok the Bloodthirsty",
      zone: "地下堡垒",
      tags: [
        "尖啸递增",
        "血污进P2",
        "开笼吞食"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/thok-the-bloodthirsty"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/thok-the-bloodthirsty"
        }
      ],
      summary: "两阶段循环。P1 可坦：能量满施放震耳尖啸（全团物理伤+打断），每次施放后能量回复加快；尽量拉长第一段 P1，嗜血与减伤链对齐尖啸叠层。血线低于约 50% 获得「血污」：10 人至少 5 人 / 25 人至少 15 人带血污并在 10 码内集合即进 P2。P2 锁定追人（正面撕咬秒杀），击杀狱卒拿钥匙开笼；索克吞食囚徒后强化下一轮 P1 技能。推荐开笼顺序：阿考里克 → 水语者古莱 → 战争大师蒙塔克。",
      skills: [
        {
          name: "震耳尖啸（Deafening Screech）",
          desc: "能量满时全团高额物理伤并打断施法。每施放一次，能量回复加快，尖啸越来越密。开减伤并停手读条。",
          who: "治疗 / 全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/thok-the-bloodthirsty/deafeningScreech.mp4"
        },
        {
          name: "血污（Bloodied）→ 进 P2",
          desc: "玩家掉到约 50% 以下获得血污（本身无额外效果）。足够人数带血污且互相在 10 码内时进入 P2。尽量控血延后；需要转阶段时再集合。",
          who: "指挥 / 治疗",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/thok-the-bloodthirsty/bloodied.mp4"
        },
        {
          name: "恐惧咆哮 / 尾扫",
          desc: "正面锥形叠「恐慌」约 +25% 受伤/层 → 换坦（阶段够短可不换）。尾部高伤+2 秒昏迷，禁止站尾。吞食不同囚徒后正面会被强化为酸/冰/火吐息。",
          who: "坦克 / 近战"
        },
        {
          name: "震荡冲击（Shock Blast）",
          desc: "随机中等自然伤。吞食后会升级为腐蚀/冰/燃烧血液等机制。",
          who: "治疗"
        },
        {
          name: "血之狂乱 / 锁定 / 撕咬",
          desc: "P2 无法坦住：锁定随机玩家并加速；正面小锥形撕咬秒杀。被锁定者沿预定跑道风筝；近战留意下一次锁定方向，勿挡正面。",
          who: "被锁定",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/thok-the-bloodthirsty/fixate.mp4",
              caption: "锁定风筝"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/thok-the-bloodthirsty/chomp.mp4",
              caption: "正面撕咬秒杀"
            }
          ]
        },
        {
          name: "狱卒 / 开笼吞食",
          desc: "P2 刷库卡隆狱卒，击杀掉落钥匙，开一扇笼释放囚徒。索克吞食后返回 P1，并强化恐惧咆哮与震荡冲击。",
          who: "坦克 / DPS"
        },
        {
          name: "囚徒强化：酸 / 冰 / 火",
          desc: "阿考里克：酸息减甲约 20%/层 + 腐蚀血液长 DoT。古莱：冰息 5 层冰墓需换坦；冰血叠层也会变冰墓，必须打碎。蒙塔克：灼热吐息火 DoT；燃烧血液留火池需躲开。",
          who: "全团"
        },
        {
          name: "【英雄】洞穴蝙蝠 / 饥饿雪人",
          desc: "第二次 P1 刷被俘洞穴蝙蝠需接住；第三次 P1 刷饥饿雪人在场内冲锋，躲路径通常不追求击杀。吞食囚徒时索克会回血，需减疗/爆发对冲。",
          who: "副坦 / 全员"
        }
      ],
      mechanics: [
        "第一段 P1 尽量拖长：嗜血 + 减伤链顶尖啸。",
        "需要进 P2 时再集合血污玩家；平时抬血避免误触。",
        "P2：风筝、躲正面、秒狱卒开笼。",
        "开笼顺序建议：阿考里克 → 古莱 → 蒙塔克。",
        "开完相关囚徒后再进 P2 可能无解，需在窗口内击杀。"
      ],
      positioning: "P1 侧面堆，正面与尾部留给空地。P2 外圈固定 A/B 风筝点。火阶段注意散开火池；冰阶段预留打冰墓站位。英雄预留雪人冲锋白道。",
      roles: {
        tank: "侧面换坦消恐慌/减甲/冰层；P2 接狱卒；英雄接蝙蝠。",
        healer: "尖啸锚点递增冷却；控血防误触 P2；冰墓/锁定点抬；转阶段回蓝。",
        dps: "被锁定先跑；狱卒优先；打冰墓；英雄清蝙蝠、躲雪人。"
      },
      notes: "与 MythicTrap/WCL 对齐。常见翻车：尖啸漏减伤、误集合进 P2、正面撕咬、火池铺满、冰墓不打。",
      quests: "无强制任务。",
      diagram: "thok"
    },
    {
      id: "blackfuse",
      idx: 12,
      name: "攻城匠师黑索",
      en: "Siegecrafter Blackfuse",
      zone: "地下堡垒",
      tags: [
        "传送带拆件",
        "自动撕裂者",
        "锯刃 / 磁铁"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/siegecrafter-blackfuse"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/siegecrafter-blackfuse"
        }
      ],
      summary: "单阶段工厂战，主目标是黑索 + 自动撕裂者。Boss 坦在西北传送带附近，撕裂者拉开 ≥35 码防自动修理光束。两队轮换跳管上第一段传送带，每波拆掉一件未组装武器，其余落到第二段传送带后激活。整波都不拆 →「充能防御矩阵」约 20 秒减伤；拆掉一件 →「防护狂暴」10 秒 100% 攻速。英雄：落到二带的武器里会有一件过载，技能显著加强。",
      skills: [
        {
          name: "发射锯刃（Launch Sawblade）",
          desc: "向随机玩家扔出永久锯刃，踩到被击退并吃高额物理（锯齿斩）。只能被激活电磁铁的「磁力碾压」清除。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/siegecrafter-blackfuse/launchSawblade.mp4"
        },
        {
          name: "自动撕裂者 / 反应装甲",
          desc: "周期性召唤。反应装甲被动减伤约 90%，需带「静电充能」的坦克接住才能有效击杀。高空坠击：起飞砸地，15 码内高伤，落地后 5 秒易伤 +200%。过载：非传送带玩家吃小伤，撕裂者伤害 +30%。距 Boss <35 码会被修理光束每 3 秒回 5% 最大生命。副坦应单独拉远，用充能易伤打。",
          who: "副坦 / DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/siegecrafter-blackfuse/reactiveArmor.mp4"
        },
        {
          name: "静电充能（Electrostatic Charge）",
          desc: "对主坦高额自然伤并叠层：每层再受充能伤害 +100%，需换坦。同时使带反应装甲的撕裂者受伤 +400%，是拆撕裂者的关键。",
          who: "坦克"
        },
        {
          name: "装配流水线 / 模式识别",
          desc: "跳管上带后获得「模式识别」约 1 分钟，期间不能再跳管，故需两队轮换。上带后躲开物质净化光束（踩死），在带尾前拆掉指定武器，再从管子回平台。",
          who: "传送带组",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/siegecrafter-blackfuse/patternRecognition.mp4"
        },
        {
          name: "震波导弹炮塔",
          desc: "放行后向平台发射导弹，钻头环由内向外扩散，踩环吃高额自然伤。英雄过载：可击杀的导弹连续咏唱震波，击杀后还会再来第二、第三枚，共三轮。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/siegecrafter-blackfuse/shockwaveMissile.mp4"
        },
        {
          name: "激光炮塔 / 过热",
          desc: "放行后点名玩家追踪光束，留火路；火上每秒叠火焰 DoT（最多约 20），火也能伤撕裂者。英雄过载：改为三圈火环，不再追人。",
          who: "被点名 / 全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/siegecrafter-blackfuse/superheated.mp4"
        },
        {
          name: "电磁铁 / 磁力碾压",
          desc: "放行后持续拉人并每秒物理伤；场上锯刃也会被吸向磁铁，可清锯但路径极危，勿夹在锯与磁铁之间。英雄过载：推/拉交替。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/siegecrafter-blackfuse/magneticCrush.mp4"
        },
        {
          name: "爬行者地雷 / 引爆！",
          desc: "放行后跳下锁定玩家。首分钟「磨合期」可控；之后「就绪」免疫控制并加速。追上则「引爆！」中等火焰伤+击飞。可把 Boss 坦在刷点附近，落地用控制+顺劈清。英雄过载：击杀后分裂成两只，继续顺劈。",
          who: "被锁定 / DPS",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/siegecrafter-blackfuse/detonate.mp4",
              caption: "普通 · 锁定风筝 / 控杀"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/siegecrafter-blackfuse/detonateHC.mp4",
              caption: "英雄 · 击杀分裂"
            }
          ]
        },
        {
          name: "充能防御矩阵 / 防护狂暴",
          desc: "整波传送带都不拆件 → Boss 约 20 秒减伤。每拆掉一件武器 → Boss 10 秒 100% 攻速，坦克开减伤。",
          who: "指挥 / 坦克"
        }
      ],
      mechanics: [
        "两队轮换上带（模式识别 1 分钟）。",
        "每波必拆一件；MythicTrap 参考拆件序：1–5/7–8/10–11 导弹，6 地雷，9/12 激光（可按公会改表）。",
        "定期放行磁铁清锯刃；多数波次优先拦导弹。",
        "撕裂者拉开修理距离，用充能坦接杀。",
        "英雄：放行武器中一件会过载——导弹三连、激光三环火、磁铁推拉、地雷分裂。"
      ],
      positioning: "Boss 靠西北传送带；撕裂者单独远端。激光火路拉向无锯区；磁力阶段给锯刃让出通道；地雷刷点附近便于顺劈。",
      roles: {
        tank: "换坦消充能；副坦独拉撕裂者；拆件/狂暴窗口开减伤；磁力阶段注意锯刃路径。",
        healer: "充能换坦与防护狂暴窗口抬坦；分散处理火路/导弹环/地雷爆炸；过载阶段减伤。",
        dps: "传送带组按表拆件、躲净化光束；地面转火撕裂者落地易伤、控杀地雷、躲锯/环/火。"
      },
      notes: "与 MythicTrap/WCL 对齐。最冤翻车：整波不拆件吃矩阵减伤、撕裂者被修好、磁力夹锯、模式识别叠班无人上带。",
      quests: "成就常与特定武器组合相关。",
      diagram: "blackfuse"
    },
    {
      id: "paragons",
      idx: 13,
      name: "卡拉克西英杰",
      en: "Paragons of the Klaxxi",
      zone: "暴君的黄昏",
      tags: [
        "九英杰同时三只",
        "击杀回血",
        "尸体增益"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/paragons-of-the-klaxxi"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/paragons-of-the-klaxxi"
        }
      ],
      summary: "九名英杰，场上通常同时只有三只激活；击杀一只后下一位入场。普通：击杀时其余激活英杰回满并获「英杰之志」约 +8% 伤害。英雄：伤增改为约每 50 秒全局叠层，拖时间更危险。禁止无规划 cleave。MythicTrap 推荐击杀序：斯卡尔 → 里卡尔 → 柯尔文 → 希赛克 → 夏克里尔 → 伊约库克 → 卡兹提克 → 克尔鲁克 → 卡罗兹。尸体可捡一次英杰之力（按职责）。",
      skills: [
        {
          name: "英杰之志 / 就绪开战",
          desc: "击杀一只 → 其余激活英杰回满（普通另加伤增）。下一位入场前带「就绪开战」光环。必须单点集火。",
          who: "指挥 / DPS"
        },
        {
          name: "觅血者斯卡尔 · 放血 / 劈砍",
          desc: "放血：打坦并掉血量约 10%，召唤血球；球碰到英杰按其剩余血量百分比回血（可晕可控）。若优先秒斯卡尔可忽略血球。劈砍叠层增加受里卡尔伤害 → 斯卡尔与里卡尔不可同坦。尸体「嗜血」：DPS 攻击溅血球，踩球回 10% 最大生命。",
          who: "坦克 / DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/bloodletting.mp4"
        },
        {
          name: "切割者里卡尔 · 变异 / 注射",
          desc: "约每 30 秒把当前坦变成蝎子 20 秒（可用爪/横扫/钉刺；「捕食」秒杀琥珀寄生虫）。注射 12 秒后刷寄生虫，到期时开主动减伤可防止刷出；寄生虫每 10 秒满血回复，需蝎形态捕食。基因改变：叠层增加受斯卡尔伤害 → 与斯卡尔分坦。英雄：必须杀寄生虫才能解除蝎形态。尸体「疯狂科学家」：变蝎 30 秒，伤害跟攻强，适合带复仇的坦克。",
          who: "坦克",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/mutate.mp4"
        },
        {
          name: "至尊者柯尔文 · 琥珀包裹",
          desc: "对自己或血量到 50% 的激活英杰施放琥珀茧，10 秒内打不掉则目标回满（约 30 秒 CD）。盾击：主坦倒地昏迷 6 秒后接残暴突袭（正面 6 段递增顺劈）→ 副坦嘲讽接手。英雄：茧无法被团队普攻打掉，需卡罗兹平台「强腿」扔琥珀炸开。尸体「琥珀大师」：坦克额外按钮 5 秒免疫。",
          who: "全团 / 坦克",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/encaseInAmber.mp4"
        },
        {
          name: "虫群卫士希赛克 · 瞄准 / 急速射击",
          desc: "瞄准：点名玩家（45 码内击退），直线高额物理伤由路径上所有人分摊，或被点名者带减伤独吃并躲开他人。急速射击：向四周发射加速弹幕球，必须躲开。多重射击点名小伤。尸体「复眼」：远程「狙击」距离越远越痛，并上死亡标记 +15% 受伤 10 秒。",
          who: "被点名 / 全员",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/aim.mp4",
              caption: "瞄准 · 排线分摊或独吃"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/rapidFire.mp4",
              caption: "急速射击弹幕"
            }
          ]
        },
        {
          name: "毒心者夏克里尔 · 毒性注射",
          desc: "全员注入红/蓝/黄毒素；催化剂按颜色反应——红：自身+10 码火焰（散开）；蓝：高额冰霜可 10 码内分摊；黄：脚下毒云约 30 秒持续自然伤。腐蚀之血：坦克叠自然 DoT，有主动减伤时打不上；10 层触发血腥爆炸全团火伤。嫩化打击：叠层增加受克尔鲁克伤害 → 勿与克尔鲁克同坦。英雄：一次催化剂同时点两种颜色。尸体「广博药理」：治疗「易爆药膏」把治疗存成受伤缓冲（约 30 秒 CD）。",
          who: "全员 / 坦克 / 治疗"
        },
        {
          name: "明澈者伊约库克 · 炎界 / 计算",
          desc: "计算：每人随机形状/颜色/数字。疯狂计算·炎界：点名玩家并按其某项分配连线，火线伤人，被点名尽量散开，其他人躲线。削弱：打随机玩家约 34% 生命，低于 25% 直接斩杀。英雄：炎界额外多线。尸体「机巧」：治疗技能会复制到同种族（英雄改为同职业）。",
          who: "全员 / 治疗",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/insaneCalculationFieryEdge.mp4"
        },
        {
          name: "操纵者卡兹提克 · 吞噬 / 音波",
          desc: "刷饥饿的昆虫：用吞噬拉人，每秒 +5 能量并物理伤；转火打到约 30% 打断喂食救人。靠近会被「整个吞噬」秒杀。未喂食时厚壳免疫伤害。能量满蜕变成熟昆虫，正面横扫高伤。音波投射：向随机玩家射音波环，躲开。尸体「傀儡大师」：召唤幼年昆虫助战 40 秒。",
          who: "全团",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/devour.mp4",
              caption: "吞噬 · 转火救人"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/sonicProjection.mp4",
              caption: "音波投射"
            }
          ]
        },
        {
          name: "掠风者克尔鲁克 · 天降 / 凿击",
          desc: "天降：跳到随机玩家上空砸下，8 码物理伤，散开减顺劈。凿击昏迷主坦后接毁伤 → 副坦嘲讽接手。暴露血管：叠层增加受夏克里尔伤害 → 勿与夏克里尔同坦。英雄另有「凿击/收割」类技能；尸体「收割」可跃击破昆虫厚壳。",
          who: "坦克 / 全员",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/deathFromAbove.mp4",
              caption: "天降 · 散开"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/reave.mp4",
              caption: "收割（尸体/英雄）"
            }
          ]
        },
        {
          name: "暴食蝗虫卡罗兹 · 闪光 / 投掷琥珀",
          desc: "闪光：场内冲锋点名，命中者旋转 4 秒并伤及附近。投掷琥珀：跳上平台扔琥珀留毒池（腐蚀琥珀持续自然伤）。尸体「强腿」：跃上平台，有琥珀可扔下造成爆炸（也可炸开柯尔文琥珀茧），完成后自动返回。",
          who: "全员 / DPS",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/flash.mp4",
              caption: "闪光冲锋 · 散开"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/paragons-of-the-klaxxi/hurlAmber.mp4",
              caption: "投掷琥珀毒池"
            }
          ]
        }
      ],
      mechanics: [
        "推荐击杀序：斯卡尔 → 里卡尔 → 柯尔文 → 希赛克 → 夏克里尔 → 伊约库克 → 卡兹提克 → 克尔鲁克 → 卡罗兹。",
        "单点集火；击杀回血，勿乱 cleave。",
        "坦克 Debuff 配对：斯卡尔≠里卡尔；夏克里尔≠克尔鲁克。",
        "尸体增益按职责捡（嗜血/复眼/药理/强腿等）。",
        "英雄：伤增每约 50 秒叠；茧不可普攻打掉；催化剂双色；炎界多线；蝎形态需杀寄生解除。"
      ],
      positioning: "希赛克居中便于瞄准排线；卡罗兹冲锋散开；毒素红散黄靠边；昆虫拉出近战核心；头前顺劈背离团。",
      roles: {
        tank: "分坦配对；盾击/凿击换坦；蝎形态捕食寄生；减伤挡腐蚀之血。",
        healer: "瞄准/催化剂/削弱/天降窗口抬血；血勿掉 25% 以下；捡药理存疗。",
        dps: "单目标；控血球/打茧/转火昆虫；瞄准分摊或独吃；捡复眼/强腿/收割。"
      },
      notes: "与 MythicTrap/WCL 对齐。常见翻车：误杀第二目标回血、Debuff 同坦、茧回满、蓝毒未分摊、削弱斩杀、昆虫能量满成熟。",
      quests: "尾王前门成就向。",
      diagram: "paragons"
    },
    {
      id: "garrosh",
      idx: 14,
      name: "加尔鲁什·地狱咆哮",
      en: "Garrosh Hellscream",
      zone: "暴君的黄昏",
      tags: [
        "三阶段 + 过渡",
        "钢铁之星",
        "心控 / 英雄 P4"
      ],
      refs: [
        {
          label: "Warcraft Logs 指南",
          url: "https://classic.warcraftlogs.com/guide/garrosh-hellscream"
        },
        {
          label: "MythicTrap",
          url: "https://www.mythictrap.com/en/siege-of-orgrimmar/garrosh-hellscream"
        }
      ],
      summary: "三阶段 + 亚煞极领域过渡。P1 真部落打到约 10%：亵渎武器、战歌、战争使者/狼骑/攻城工程师与钢铁之星。过渡约 1 分钟：清化身、吃减伤/增益球、躲歼灭锥形；越快结束，加尔鲁什带入 P2 的能量越低。P2 每约 2.5 分钟再进过渡，能量阈值解锁强化技能；P2 再打到约 10% → 回血至约 25% 进 P3（仅用强化版技能）直至 0%。英雄：P3 清零后进 P4 暴风城港（恶意分摊、轰炸、钢铁之星撞断「具现狂怒」）。",
      skills: [
        {
          name: "【P1】亵渎（Desecrate）",
          desc: "点名远程脚下刷亵渎武器，周围虚空圈持续伤人；打武器血量可缩小圈，不必必杀但会压缩场地。远程可堆叠控落点。",
          who: "远程 / 全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/desecrate.mp4"
        },
        {
          name: "【P1】爆炸钢铁之星 / 攻城工程师",
          desc: "两侧各出工程师召唤钢铁之星。至少杀掉一侧工程师；放行另一侧之星可碾小怪，人踩路径会被「钢铁之星冲击」秒杀。",
          who: "远程 / 机动",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/explodingIronStar.mp4"
        },
        {
          name: "【P1】战歌 / 狼骑 / 战争使者",
          desc: "地狱咆哮的战歌：约每 30 秒给存活小怪 +150% 伤害与生命。先知狼骑连锁治疗/闪电，打断治疗；每断一次叠先祖狂怒 +25% 施法速，尽量只断治疗。战争使者成组出场，有断筋；英雄改为锁定玩家且无法坦克。优先狼骑。",
          who: "打断 / DPS / 坦克"
        },
        {
          name: "【过渡】歼灭 / 化身球",
          desc: "领域内有小怪存活时加尔鲁什免疫伤害；接战后读「歼灭」正面锥形秒杀，必须清完再接或始终躲开正面。青龙寺·具现疑虑 → 信仰球；永春台·具现恐惧 → 勇气球（约 -50% 受伤）；红鹤寺·具现绝望（两只需分边）→ 希望球。英雄过渡顺序固定：青龙寺 → 永春台 → 红鹤寺。",
          who: "全团",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/annihilate.mp4",
              caption: "歼灭 · 躲正面"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/consumedFaith.mp4",
              caption: "信仰球（青龙寺）"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/consumedCourage.mp4",
              caption: "勇气球（永春台）"
            }
          ]
        },
        {
          name: "【P2】旋风腐蚀 / 强化",
          desc: "引导约 6 秒全团伤，距离越远越低。能量约 25 起强化：额外对随机玩家 8 码爆发并召唤亚煞极爪牙，同时把场上爪牙回满。",
          who: "治疗 / 全员",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/empoweredWhirlingCorruption.mp4",
              caption: "旋风腐蚀（含强化：拉开 + 点名溅射 + 刷爪牙）"
            }
          ]
        },
        {
          name: "【P2】亚煞极之触 / 强化心控",
          desc: "心控随机玩家，被控者会对他人读心控；可打断，打到约 20% 解除。能量约 50 起强化：被控免疫控制、血量更高。勿误杀。",
          who: "全团",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/touchOfYShaarj.mp4",
              caption: "心控解救"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/empoweredTouchOfYShaarj.mp4",
              caption: "强化心控（更硬）"
            }
          ]
        },
        {
          name: "【P2/P3】绝望之握 / 亵渎强化 / 爪牙",
          desc: "绝望之握叠层换坦；能量满强化后，层数消散/移除时触发爆炸绝望，层数越高越痛。P3 亵渎强化：武器会回血且无法击杀，远程堆叠控点后整体挪场。爪牙死亡会给其他爪牙「强化腐蚀」（回满 + 大幅增伤增血）；英雄爪牙每次近战 +10 能量，满 100 自获强化腐蚀，需风筝/分开杀。",
          who: "坦克 / 远程 / DPS",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/desecrateP2.mp4",
              caption: "P2 亵渎"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/empoweredDesecrate.mp4",
              caption: "P3 强化亵渎（不可击杀）"
            }
          ]
        },
        {
          name: "【英雄 P4】恶意 / 轰炸 / 具现狂怒",
          desc: "恶意：15 秒点名，需 10 人 2 人 / 25 人 5 人近距分摊并叠恶意冲击（受伤递增）→ 分摊组轮换；无人吃则全团大伤且 Boss +5 能量。轰炸：地面火圈躲开。轰炸后若有足够人堆叠（10 人≥3 / 25 人≥7，约 8 码）会落钢铁之星锁定最近玩家，风筝撞向读「具现狂怒」的 Boss 以打断（能量满刷无技能小怪，必须撞断）。",
          who: "分摊组 / 坦克 / 全员",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/malice.mp4",
              caption: "恶意分摊轮换"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/bombardment.mp4",
              caption: "轰炸火圈"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/ironStarImpact.mp4",
              caption: "钢铁之星落地 / 风筝"
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/garrosh-hellscream/manifestRage.mp4",
              caption: "具现狂怒 · 用星打断"
            }
          ]
        }
      ],
      mechanics: [
        "P1：至少杀一侧工程师；狼骑优先并只断治疗；星轨清怪、人躲路径。",
        "过渡：越快越好控 P2 开场能量；躲歼灭；青龙/红鹤分边清。",
        "P2：能量≈25 强化旋风，≈50 强化心控，满能量强化绝望；约每 2.5 分钟再过渡。",
        "P3：四技能全强化；亵渎不可杀，堆叠挪场；爪牙分开风筝勿同时死。",
        "英雄 P4：恶意轮换分摊；堆叠造星；能量满前备好星撞断狂怒。"
      ],
      positioning: "P1 中场拉 Boss，两侧星轨预标。过渡按房间分边。P2/P3 远程堆叠控亵渎，旋风集体外拉，心控区固定。P4 恶意三点/中心轮换，造星点固定，风筝圈预留。",
      roles: {
        tank: "换坦绝望层；P1 接战争使者（英雄改锁定）；P4 配合造星与撞 Boss。",
        healer: "按阶段排减伤：旋风、心控解救、恶意轮、爆炸绝望；过渡吃勇气球。",
        dps: "P1 工程师/狼骑；过渡爆发；心控打断并打到解除；爪牙分开杀；P4 分摊与造星。"
      },
      notes: "与 MythicTrap/WCL 对齐。开荒劝退点：过渡养能量、强化心控连环、P3 场地被亵渎吃光、P4 恶意空吃或没星断狂怒。",
      quests: "传奇披风、坐骑与最终剧情。",
      diagram: "garrosh"
    }
  ],
};

