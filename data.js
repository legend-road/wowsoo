/* Siege of Orgrimmar — guide data
 * 测验题库见 questions.js
 */
window.SOO = {
  roles: {
    tank: { id: "tank", label: "坦克" },
    healer: { id: "healer", label: "治疗" },
    dps: { id: "dps", label: "DPS" },
  },
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
        "目标不是“打死血条”，而是把腐蚀从 100 清到 0。本体把血压到 0% 分裂成黑软/白软；击杀黑软或奶满白软各减 1 点腐蚀。重组后血%≈剩余腐蚀。硬狂暴约 10 分钟。英雄：本体「肿胀腐蚀」消层刷凝结煞；分裂中央煞池会膨胀，需减伤轮流踩缩小。第 3 次分裂团伤最高，大减伤留这里。",
      media: [
        {
          src: "assets/immerseus/p1-spread.jpg",
          caption: "25H 本体：大团偏半场一字/扇形散开，坦对侧背离；脚下水潭往约定方向挪",
        },
        {
          src: "assets/immerseus/split.jpg",
          caption: "分裂：按扇区就近处理；黑软吃 10 码伤增，白软奶满吃 12 码回蓝/强疗",
        },
        {
          src: "assets/immerseus/heroic-pool.jpg",
          caption: "英雄煞池：非踩池人远离中心；有减伤者轮流短踩缩小",
        },
      ],
      skills: [
        {
          name: "煞能箭（Sha Bolt）",
          desc: "约每 10 秒对全团射击：对目标及其 5 码内暗影伤，并在脚下留虚空区（持续到本阶段结束）。阶段结束虚空向中心收回，别挡路。25H 大团保持散开减溅射。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/immerseus/shaBolt.mp4",
        },
        {
          name: "旋涡 / 旋转喷吐（Swirl）",
          desc: "地面涌出移动污染水流（受伤+击飞）；随后 Boss 向前喷水柱并旋转约 10 秒。25H 实战：喷吐期间跟到 Boss 身后（贴尾走），吃到正面会高伤+击退。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/immerseus/swirl.mp4",
        },
        {
          name: "腐蚀冲击（Corrosive Blast）",
          desc: "对主目标锥形高额暗影（25H 量级约 90 万）并叠长时间暗影易伤（约 +300%）。约 35 秒一次，必须换坦，锥形始终背离大团。",
          who: "坦克",
        },
        {
          name: "渗出的煞（Seeping Sha）",
          desc: "Boss 模型/中央水域禁区：靠近受伤并击退。近战打边缘，禁穿模。",
          who: "近战 / 全员",
        },
        {
          name: "分裂：黑软 / 白软",
          desc: "黑软需击杀（可减速）；白软需奶满净化。软到中心「煞能迸发」团伤，越往后越痛。黑软漏吸收不减腐蚀且炸伤更高；奶满白软变净化水滴到中心仍减腐蚀。",
          who: "DPS / 治疗",
        },
        {
          name: "残渣增益",
          desc: "黑软死亡：10 码内对黑软 +25% 伤害（可叠）。白软奶满：12 码内回 25% 法力且治疗量 +75%（可叠）。白软血越高移动越慢。",
          who: "DPS / 治疗",
        },
        {
          name: "【英雄】肿胀腐蚀",
          desc: "本体层数≈腐蚀/2（开场约 50）。打 Boss 消层：攻击者吃可驱散暗影 DoT，并刷凝结的煞。25H：个人约 3–4 层停手，转火清小怪再继续；副坦/正义之怒等聚怪 AOE。层数消完为止。",
          who: "DPS / 坦克 / 驱散",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/immerseus/swellingCorruption.mp4",
        },
        {
          name: "【英雄】煞能之池",
          desc: "分裂中央煞池缓慢扩大，软到达加速膨胀。踩入吃叠层暗影伤但可缩小池子。指定减伤/低机动职业轮流短踩；非踩池人远离中心。",
          who: "全团 / 减伤",
        },
      ],
      mechanics: [
        "25H：嗜血开场交（第一段本体最长）。大团半场一字/扇形散开 ≥5 码，脚下出水潭按约定方向（常见往左）平移，别把自己封死。",
        "本体：坦在对侧，锥形背离大团；旋涡贴尾跟走；肿胀 3–4 层停手清凝结煞，戒律可群体驱散 DoT，奶骑纯净之手点高层。",
        "分裂：按扇区就近处理。优先黑软吃死亡增益；奶白软贴 12 码，优先中心附近白软抢回蓝。可故意留 1 只白软 >80% 血拖阶段回冷却。",
        "第 3 次分裂团伤最高（软到中心迸发叠加池伤）——大减伤/治疗大技能留这里。",
        "英雄煞池：有名单轮流踩，防止池子铺满；踩池叠层过高及时换人。",
      ],
      positioning:
        "Boss 固定中央。主坦约在场地一侧，大团在对侧半弧散开，锥形背离人群。副坦可贴主坦同侧换坦，也可站主坦对面（两侧皆背离大团）——对面换坦 Boss 会大转身，大团勿站在扫射弧上。近战打边缘，禁穿中央水域。分裂保持外环扇区；踩池人短进中心，其余勿贴池。",
      roles: {
        tank: "锥形必换坦、背离大团。副坦迅速接凝结煞聚怪。旋涡时注意别把正面甩向人群。",
        healer: "本体扛箭与失误伤；分裂奶白软贴增益，重点抬第 3 分裂与踩池人。姓名版单独显示白软。戒律 P1 群体驱散；奶骑纯净点肿胀高层。大技能留第 3 分裂。",
        dps: "肿胀约 3–4 层停手清小怪。分裂优先黑软（减速拖脚），吃 10 码伤增；勿乱 AOE 打乱白软奶满。听指挥留白软拖阶段。",
      },
      notes:
        "末轮白软可扎堆叠多层奶增益救人。检查治疗宏勿误选黑软。",
      quests: "传说披风等进度节点；可查掉落与进度统计。",
      diagram: "immerseus",
    },
    {
      id: "protectors",
      idx: 2,
      name: "堕落的守护者",
      en: "The Fallen Protectors",
      zone: "怒焰裂谷深处",
      tags: ["三体议会", "绝命措施", "英雄加压"],
      refs: [
        { label: "Warcraft Logs 指南", url: "https://classic.warcraftlogs.com/guide/fallen-protectors" },
        { label: "MythicTrap 正文", url: "https://www.mythictrap.com/en/siege-of-orgrimmar/fallen-protectors" },
      ],
      summary:
        "石蹄鲁克、软足何、慈心孙三人不共享血量。各自在 66% / 33% 进「绝命措施」刷化身（Boss 身上 DoT 仍会跳）。常见控血绝命序：鲁克 → 孙 → 何，禁止重叠。斩杀三人几乎同时到 1%，否则「金莲之缚」回约 30% 血。英雄：酒桶加速；鲁克化身共享血可 cleave；衰弱约 80%/4 分钟；灾祸伤害递增（每次约 +10%）。",
      skills: [
        {
          name: "金莲之缚（Bond of the Golden Lotus）",
          desc: "任一到约 1% 且同伴仍存活，则读条回复约 30% 生命。必须三人一起压到斩杀线并在读条结束前全部倒下。",
          who: "全团斩杀",
        },
        {
          name: "鲁克：腐化酒桶 / 对撞+腐化踢 / 复仇打击",
          desc: "酒桶点远程，5 码伤+65% 减速，可躲开。对撞后原地旋转踢（约 10 码），全员跑开。复仇打击为正面锥形，坦克开减伤。",
          who: "全员 / 坦克",
          videos: [
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/fallen-protectors/corruptedBrew.mp4",
              caption: "躲开腐化酒桶",
            },
            {
              src: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/fallen-protectors/clash.mp4",
              caption: "对撞后远离鲁克的旋转踢",
            },
          ],
        },
        {
          name: "鲁克·绝命化身",
          desc: "刷出悲苦/哀伤/阴郁三化身。哀伤「炼狱打击」8 码分摊集合；阴郁「腐蚀震击」必打断；悲苦「亵渎地面」砸坦留永久黑圈，必须把悲苦拉出人群再放。",
          who: "全团 / 坦克 / 打断",
        },
        {
          name: "何：剧毒 / 锁喉 / 凿击",
          desc: "近战留毒池，躲开。锁喉流血持续到何进绝命才清除（奶骑保护之手可解）。凿击：正面吃到瘫痪并锁定随机玩家；何坦读条结束前背对即可躲开（只被短距击退）。双坦：坦 A 鲁克、坦 B 何——何坦优先转身，鲁克坦兜底嘲讽再还仇。",
          who: "坦克 / 治疗",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/fallen-protectors/noxiousPoison.mp4",
        },
        {
          name: "何·绝命：苦痛印记（Mark of Anguish）",
          desc: "化身锁定印记者：定身+DoT，「衰弱」约 90% 减甲（英雄约 80%/4 分钟更狠）。额外按钮 40 码内传递；化身平砍叠易伤，传递也给全团叠易伤。勿传给坦克。常见传递链：潜行（闪避/斗篷）→ 猎人（威慑）→ 法师（冰箱）→ 战士（盾墙）；约 4–5 层开减伤，末秒再传。",
          who: "传递链 / 减伤职业",
        },
        {
          name: "孙：煞能灼烧 / 暗言术：祸 / 灾祸",
          desc: "灼烧读条溅射，优先打断（避免 5 码重叠）。祸每 3 秒跳一次，出现即驱；驱不及可群体驱散。灾祸约 30% 最大生命团伤并清光所有祸，每次施放伤害递增约 10%，对齐减伤；戒律可预盾。",
          who: "打断 / 治疗",
        },
        {
          name: "孙·绝命：黑暗冥想",
          desc: "刷出绝望类化身，孙持续跳暗影伤。全员进中央「冥想力场」减伤并清化身；鲁克尽量拉在罩外，远程在罩内清怪时注意躲开鲁克对撞踢。",
          who: "全团",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/fallen-protectors/darkMeditation.mp4",
        },
        {
          name: "【英雄】机制加压",
          desc: "酒桶飞行随战斗加速。鲁克绝命化身共享血，可 cleave。衰弱约 80% 减甲、持续约 4 分钟——印记短持强减。灾祸递增，后期必开大减伤。",
          who: "全团",
        },
      ],
      mechanics: [
        "绝命序示例：鲁克 66% → 孙 66% → 何 66%（清锁喉）→ 同样做 33% → 三线压平同步斩杀。",
        "鲁克绝命：哀伤炼狱分摊或独吃减伤；阴郁腐蚀震击轮流打断；悲苦拉外放永久黑圈；英雄化身可顺劈。",
        "孙绝命：全员进罩；鲁克留罩外；打断/清化身。平时祸秒驱，灾祸预减伤。",
        "何绝命：非坦传递链短持；约 4–5 层减伤，末秒传递；英雄衰弱更狠禁乱传。",
        "斩杀：三人同时到 1%，禁止垫刀不同步。",
      ],
      positioning:
        "轻度散开。鲁克背对大团；何外拉毒池；孙靠近便于打断。远程勿站在鲁克与其他远程之间挡对撞路径。孙绝命进中央罩；哀伤短暂集合；悲苦黑圈靠边放。",
      roles: {
        tank: "双坦分鲁克与何。鲁克锥形背离+减伤；凿击何坦背对，鲁克坦兜底嘲讽；悲苦拉外放圈；孙绝命鲁克尽量罩外。",
        healer: "鲁克坦复仇打击重点抬；锁喉/印记点抬；祸秒驱；灾祸与孙绝命开减伤。奶骑保护可解锁喉；戒律灾祸预盾、集合神圣之星。",
        dps: "按表控血禁垫刀；绝命转火化身；打断阴郁与孙灼烧；哀伤分摊/独吃；斩杀三线同步。",
      },
      notes:
        "常见灭团：绝命重叠、斩杀不同步、悲苦黑圈铺满、印记传坦/乱传、灼烧漏断、灾祸无减伤。",
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
        "真正对手是「腐蚀混合物」，诺鲁什协助。开场 75 腐蚀（上限 100），腐蚀越高输出越低；考验成功腐蚀归 0 并获净化（DPS 满伤、治疗约 +30% 疗、坦克减伤）。分波进考验，外场始终留人。约 50% 起每掉约 10% 刷释放具现；英雄踩残留圈 +25 腐蚀。约 7 分钟硬狂暴。",
      skills: [
        {
          name: "腐蚀 / 净化（Corruption / Purified）",
          desc: "开场 75。腐蚀越高对混合物输出越低。腐蚀归 0 并保持时获得净化：DPS 增伤、治疗增疗、坦克减伤。0 腐蚀者无法再进考验。",
          who: "全员",
        },
        {
          name: "盲目仇恨（Blind Hatred）",
          desc: "约 270° 旋转光束，站入每秒高额暗影伤，必须沿边缘躲开。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/norushen/blindHatred.mp4",
        },
        {
          name: "释放的愤怒（Unleashed Anger）",
          desc: "对当前坦高额物理，并叠「自我怀疑」使后续该技能更痛。约 3 层换坦。",
          who: "坦克",
        },
        {
          name: "冰寒恐惧（Icy Fear）",
          desc: "约每 3 秒全团冰霜伤；混合物血越低越痛。P2 大减伤/治疗大技能留低血段。",
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
          desc: "50% 起启用 Frayed，之后每掉约 10% 刷一只大型释放具现。具现周期性「愤怒爆发」团伤；死后留「残留腐蚀」圈，需 ≤75 腐蚀的玩家浸泡清除。",
          who: "全团 / 浸泡组",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/norushen/burstOfAnger.mp4",
        },
        {
          name: "【英雄】残留腐蚀浸泡惩罚",
          desc: "普通：≤75 腐蚀者踩圈清掉即可。英雄：踩圈者额外 +25 腐蚀，可能掉出净化状态、伤害骤降，甚至需要再进考验。固定浸泡组轮换，别让主力爆发位反复踩。",
          who: "浸泡组 / 指挥",
        },
        {
          name: "驱逐腐蚀（外场精华）",
          desc: "考验里精华死后，外场出现释放精华并射出暗影球。无人拦截则混合物获得「融合」约 +8% 伤害（短时）。必须有人挡/吃球。",
          who: "机动 / 全员",
        },
      ],
      mechanics: [
        "净化波次示例：每波约 1 坦 + 1 治疗 + 3 DPS；外场始终留人挡球、接具现。",
        "常见双坦：副坦先进考验净化，归来接球/具现；主坦约 3 层愤怒换坦。",
        "DPS 考验内伤反馈外场 Boss；打掉的怪出外场——进考验=给外场加活。",
        "尽量 50% 前完成主要净化；50% 后少进考验，优先秒具现。英雄残留圈踩完 +25 腐蚀，固定浸泡组轮换。",
        "精华球必须拦截，漏挡混合物融合约 +8% 伤。约 7 分钟硬狂暴，嗜血常见交约 50%。",
      ],
      positioning:
        "混合物居中。光束沿边缘跑。残留圈只留给浸泡组；精华弹道预留拦截位。考验归来立刻归位清怪。",
      roles: {
        tank: "约 3 层愤怒换坦；拉外场具现；按表进信心考验或踩圈。考验内打断投掷、躲正面砸。",
        healer: "冰寒恐惧随血抬升；考验保 NPC、秒驱残留 Debuff。具现刷出与低血段开大。奶骑可圣盾/保护协助挡球。",
        dps: "按波进考验；归来 Adds > Boss，立刻清具现/挡球。需要时协助拦截精华球。",
      },
      notes:
        "常见翻车：同时进考验过多外场崩盘、残留圈无人踩或主力乱踩、精华球漏挡、0 腐蚀还抢进考验。",
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
        "英雄放逐迷宫",
        "裂隙浸泡"
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
      summary: "全员从 0 傲气累积；Boss 能量满「肿胀傲气」团伤并 +5 傲气，再按档位惩罚。25–49 脚下圈、50–74 投影须踩、75–99 近距光环、100 克服永久心控。泰坦之赐约每 25 秒（约 20 秒免疫傲气），集合叠泰坦之力；驱散尽量只驱无赐福者。30% 释放后全团傲气清零，约每 10 秒团伤+5 傲气，约 200 秒软狂暴——嗜血收尾。英雄：放逐 3 人进迷宫（外场秒碎片）；裂隙约每 8 秒，踩关自伤+8 码溅射并虚弱约 1 分钟。",
      skills: [
        {
          name: "肿胀傲气（Swelling Pride）",
          desc: "Boss 能量满时全团高额暗影伤害并 +5 傲气。档位：0–24 无额外；25–49 爆裂傲气（脚下水池 3 秒后爆，4 码内重伤并 +5）；50–74 投影（约 15 码外，6 秒内站上去可化解）；75–99 傲气光环（25 秒，4 码脉冲伤友并 +5）；100 克服（心控至战斗结束，生命 +100%）。",
          who: "全员"
        },
        {
          name: "泰坦之赐 / 泰坦之力（Gift of the Titans）",
          desc: "约每 25 秒，诺鲁什给若干玩家赐福约 20 秒：期间免疫傲气获取（不降低已有傲气）。赐福玩家集合可获得泰坦之力（急速与伤害/治疗 +15%，持续约 15 秒）。",
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
          desc: "约 5 人叠层暗影 DoT（25 人），驱散后消；驱散者 +5 傲气。优先驱无泰坦之赐者，或卡在赐福免疫窗口轮流驱，避免驱散者冲到 100。",
          who: "治疗"
        },
        {
          name: "自我反射（Self-Reflection）",
          desc: "黑圈落地刷反射小怪，约 2 秒后 AoE 并 +5 傲气。可先集合再散开出圈；副坦拉怪顺劈。",
          who: "DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/sha-of-pride/selfReflection.mp4"
        },
        {
          name: "傲气具现 / 嘲讽冲击（Manifestation）",
          desc: "大型具现须打断嘲讽冲击。死亡时最近 2 人各 +5 傲气——尽量让有赐福/坦克贴近吃死亡傲气。优先打断并击杀。",
          who: "DPS / 打断",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/sha-of-pride/mockingBlast.mp4"
        },
        {
          name: "释放 / 最终赠礼（Unleashed）",
          desc: "30% 释放：诺鲁什最终赠礼将全团傲气降至 0，裂隙停止。此后约每 10 秒团伤并 +5 傲气；约 200 秒后全团克服。嗜血爆发收尾。",
          who: "全团"
        },
        {
          name: "【英雄】放逐（Banishment）",
          desc: "点 3 人进煞迷宫，外场留腐化碎片——尽快击杀碎片才能回来。迷宫只向前跑，撞墙吃伤；捡光明球自疗并给碎片易伤；碰到虚灵腐蚀秒杀。放逐时大团可靠近 Boss 便于处理碎片。",
          who: "被点名 / 外场 DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/sha-of-pride/banishment.mp4"
        },
        {
          name: "【英雄】腐蚀裂隙 / 不稳定腐蚀",
          desc: "约每 8 秒刷裂隙：随机暗影伤并 +5 傲气。踩关自伤+8 码溅射，并「虚弱决心」约 1 分钟不能再踩。象限轮班，勿叠班。",
          who: "机动 / 全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/sha-of-pride/unstableCorruption.mp4"
        }
      ],
      mechanics: [
        "傲气战中只能涨、不能主动消（无驱散/无技能扣条）；平时靠少踩机制控条，目标别摸 100。",
        "唯一清零：约 30%「释放 / 最终赠礼」全团傲气归 0；泰坦之赐只免疫约 20 秒再涨，不降低已有傲气。",
        "P1 常贴 Boss 集合：方便赐福叠力、放逐碎片与反射聚怪；牢房激活远离 12 码再踩锁。",
        "傲气档位：肿胀时 25–49 出圈、50–74 踩投影、75–99 散开避光环；尽量避免 100 克服。",
        "驱散卡赐福窗口或只驱无赐福者；具现死亡傲气尽量坦/赐福吃。",
        "英雄裂隙象限轮班；放逐外场秒碎片，迷宫捡球躲虚灵。",
        "30% 释放：嗜血全力打，约 200 秒前必须击杀。"
      ],
      positioning: "常规贴 Boss 集合吃赐福；牢房预留安全距。肿胀/75+ 光环时临时散开。保持近战位。裂隙按象限分工；放逐碎片刷点留转火位。",
      roles: {
        tank: "受伤的傲气立刻换坦；占近战位；副坦拉反射/具现/碎片。",
        healer: "轮流驱印记（优先无赐福/赐福窗口）；肿胀与释放群抬；牢房与裂隙溅射点抬。",
        dps: "秒碎片/具现并打断；顺劈反射；按表踩裂隙；赐福集合；控个人傲气。"
      },
      notes: "卡关点：碎片不秒、裂隙无人踩、虚弱叠班、牢房不解、投影超时、驱散冲 100、30% 后拖过约 200 秒。",
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
      summary: "两阶段。P1 约 8 波增援并清双塔占炮迫降。常见节奏：清完约前 3 波（含蛇女）上南塔 → 中段波次含投石车/原龙 → 清索拉诺克后上北塔 → 双炮齐射进 P2。转火：投石车/治疗潮/战旗优先；碎骨者冲 NPC 必秒。P2 火球多人拦截减免，硬顶脉冲火焰软狂暴。友方 NPC 死=灭团。英雄塔门须护送 NPC 约 90 秒开门。",
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
          name: "【英雄】塔门护送",
          desc: "普通塔门到点自动开；英雄不会。波 4 / 波 8 前后需护送友方 NPC 约 90 秒才能开门上塔；NPC 死亡进度重置。左右塔各固定一小队（可含坦克）站在门边护卫，地面组继续清波次。",
          who: "护塔组"
        }
      ],
      mechanics: [
        "节奏：约波 1–3（蛇女）→ 南塔护送占炮 → 中段投石车/原龙 → 索拉诺克后北塔 → 双炮齐射迫降。",
        "转火：投石车 / 治疗潮 / 战旗 → 碎骨者（保 NPC）→ 萨满打断 → 其余；蛇女 50% 后加速击杀。",
        "英雄：上塔前护门 NPC 约 90 秒，死亡进度重置；塔顶防击飞掉落。",
        "索拉诺克被钩立刻跑出约 10 码躲颅骨碎裂；顺劈背离大团。",
        "P2：近战贴龙、远程稍后形成火球拦截链；嗜血交 P2；脉冲叠层软狂暴。"
      ],
      positioning: "P1 地面松散躲火圈/毒云；暗影追猎贴身立刻挪开；钩中跑出 10 码。塔顶远离边缘。P2 近战一组、远程 20–30 码一组保证火球必经有人。",
      roles: {
        tank: "拉步兵与首领；蛇女风筝毒云；索拉诺克正面背离；护 NPC 防碎骨者。P2 叠层过高换坦。",
        healer: "地面/塔楼分队；盯 NPC 血线；蛇女 50% 与索拉诺克钩人高压；P2 脉冲+火球 DoT；塔上防被击飞。",
        dps: "严格转火表；控碎骨者；打断萨满；塔楼以占炮为先；P2 参与拦截。"
      },
      notes: "翻车点：NPC 死、漏拆旗/图腾、投石车轰塔、暗影突击秒人、钩后不跑、双塔不同步、P2 火球空炸。",
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
      summary: "严格计时两阶段：突击 2 分钟（可移动、有近战）→ 攻城 1 分钟（原地、禁近战）循环。突击处理地刺、迫击、火焰喷射换坦、弹跳锯片与爬行地雷；攻城背靠墙吃震波击退，震波后立刻向 Boss 方向归位；焦油区留空，切割激光绝不可拖进焦油。约每 30 秒身后刷约 5 枚地雷，6 秒内未踩灭团爆——25H 常需副坦 + 第三坦或圣骑/战士免疫协助踩雷。攻城迫击弹幕可墙边集合减伤硬顶，或全员散开躲圈；仅激光点名短暂出列。",
      skills: [
        {
          name: "钻孔（Borer Drill）",
          desc: "从 Boss 向多方向射出移动地刺，碰到吃高额伤害。必须躲开。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/iron-juggernaut/borerDrill.mp4"
        },
        {
          name: "爬行地雷（Crawler Mine）",
          desc: "约每 30 秒在身后刷约 5 枚，不可攻击、不移动。约 6 秒后爆炸造成高额全团伤。近战距离右键踩灭可阻止，踩雷者吃高额伤害并被击飞。25H 常见副坦主责 + 第三坦或圣骑/战士免疫轮换协助；攻城阶段仍刷雷，双坦与机动免疫者都可踩。",
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
          desc: "攻城阶段全员击退。背后务必有墙/障碍，否则会被打飞出治疗范围。震波落地后立刻向 Boss 方向归位，避免治疗断档与后续机制脱节。",
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
          desc: "仅攻城模式：持续在近战范围与随机位置刷高伤红圈。墙边集合叠减伤硬顶，或全员散开躲圈二选一；仅激光点名者短暂出列风筝，切忌贪圈重叠吃双炸。",
          who: "近战 / 治疗",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/iron-juggernaut/mortarBarrage.mp4"
        }
      ],
      mechanics: [
        "计时：突击恰好 2 分钟 → 攻城 1 分钟，循环。",
        "开战前定好震波撞墙位；震波后全员向 Boss 归位。",
        "地雷约每 30 秒刷约 5 枚，6 秒内踩灭；副坦主责，25H 常配第三坦或圣骑/战士免疫协助。",
        "切割激光严禁进入焦油；焦油区预留给激光风筝路线。",
        "突击躲弹跳锯片；攻城迫击弹幕墙边减伤硬顶或全员躲圈，激光点名单独出列。",
      ],
      positioning: "突击：Boss 背对大团，远程散开躲迫击、地刺与弹跳锯片。攻城：全员预背靠墙/障碍，震波后立刻向 Boss 归位；焦油区留空给激光风筝。英雄攻城墙边大团减伤顶弹幕，或散开躲圈，切忌贪重叠双圈。",
      roles: {
        tank: "火焰喷射换坦；组织踩雷（副坦主责，必要时第三坦/免疫协助）；面向背离人群；攻城双坦都可踩雷。",
        healer: "激光灼烧 DoT、踩雷击飞、攻城地震脉冲与迫击弹幕是高压；震波后留意归位断疗。",
        dps: "躲地刺/迫击/锯片优先；被激光点名按安全路径风筝并避开焦油；攻城弹幕勿贪圈重叠。",
      },
      notes: "灭团点：漏踩地雷团爆、激光拖进焦油、震波无墙、迫击弹幕贪双圈。",
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
      summary: "破地者哈洛姆与缚潮者卡德里斯共享血量，同时开战。各带座狼暗牙/血爪（顺劈即可，可嗜血早清幽灵狼）。图腾解锁：95% 铁之墓（永久铁柱尽量靠边占位；铁之囚笼约 60 秒到期造成 100% 最大生命物理伤——戒律盾/保护之手硬顶）、85% 毒雾/毒风暴、65% 污秽喷泉软泥与污秽水流、50% 灰烬之墙（尽量重叠省地）/坠灰（圈内致死 + 圈外全团伤）、25% 双方嗜血 +25%。25H 常见分团：近战组贴门侧、远程组沿风筝路线，降低技能重叠。哈洛姆侧换坦 2–3 层霜暴打击；奶骑盯增强侧（囚笼保护），戒律盯元素侧（盾+驱散）。",
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
          desc: "大片红区标记，约 15 秒后陨石落地：圈内致死级火焰伤，圈外仍有全团中等火焰伤。必须出圈并对齐团队减伤；灰烬之墙尽量与旧墙重叠以省空间。",
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
          desc: "约 95% 生锈铁图腾：哈洛姆「铁之墓」在随机位置刷永久铁柱占位——尽量引导到场地边缘。卡德里斯「铁之囚笼」给随机玩家约 60 秒倒计时，到期造成约 100% 最大生命物理伤；戒律盾、保护之手或团队减伤硬顶，到期前尽量抬满。",
          who: "全员 / 治疗",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/korkron-dark-shaman/ironTomb.mp4"
        }
      ],
      mechanics: [
        "图腾阈值：95% 铁墓/铁囚笼 → 85% 毒 → 65% 污秽 → 50% 灰烬/坠灰 → 25% 嗜血。",
        "分团：近战组贴门侧，远程组沿风筝路线；双萨可相对靠近 cleave 但坦克仍要绕场挪位。",
        "幽灵狼可嗜血早清；哈洛姆霜暴打击 2–3 层换坦。",
        "污秽水流统一口令提前跑；软泥远程清、坦克风筝出近战堆。",
        "铁柱引导到场地边缘；铁囚笼到期前戒律盾/保护之手 + 抬满。奶骑盯增强侧，戒律盯元素侧。",
      ],
      positioning: "25H 常见分边：近战组贴门侧堆叠，远程组沿预定风筝路线移动。双萨相对靠近便于 cleave，坦克绕场给毒风暴与灰墙留空间。铁墓柱尽量引导到场地边缘；灰烬墙与旧墙重叠省地。",
      roles: {
        tank: "哈洛姆霜暴打击 2–3 层换坦；座狼挥击背离人群；污秽软泥风筝；灰烬墙重叠省地。",
        healer: "毒雾叠易伤末期、坠灰落地、25% 嗜血；铁囚笼到期戒律盾/保护之手 + 抬满。奶骑增强侧（囚笼 BoP），戒律元素侧（盾+驱散）。",
        dps: "共享血 cleave；幽灵狼可嗜血早清；喷泉阶段远程优先清软泥；严格躲线/毒云/坠灰。",
      },
      notes: "灭团点：水流坑队友、软泥进近战、灰墙铺满、坠灰漏减伤、铁囚笼到期裸抗。",
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
      summary: "战士式怒气 Boss：怒气技能约每 15 秒冷却结束后，释放当前怒气能负担的最贵技能（30 震波 / 50 战旗 / 70 战歌 / 100 破坏者）。尽量少给怒气——躲机制、防御姿态停手 Boss。姿态各约 1 分钟：战斗（顺劈换坦）→ 狂暴（全力打 Boss）→ 防御（停手 Boss，只清小怪）。增援优先级：战旗/治疗潮 > 奥术织法者打断 > 战萨满打断+驱散大地盾 > 狙击手（印记背离大团）> 刺客（面向他们）> 铁刃风筝。英雄斩首对坦约 300 万物理，须预开盾/减伤。",
      skills: [
        {
          name: "姿态：战斗 / 狂暴 / 防御",
          desc: "各约 1 分钟循环。战斗：每秒 +1 怒气，破甲打击换坦。狂暴：伤害与受伤均 +25%，怒气获取翻倍——全力打 Boss。防御：受伤 -10%，被击中时 +2 怒气——必须停手 Boss，只清小怪，否则怒气暴涨灭团。",
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
          desc: "优先级：战旗/治疗潮 > 奥术织法者（打断奥术震击/魔击，驱魔法震击 DoT）> 战萨满（打断强化治疗链，秒拆治疗潮图腾，驱散大地盾，拉离图腾）> 狙击手（印记背离大团）> 刺客（照明弹显形，面向刺客防背刺）> 铁刃（副坦侧边拉，6 码旋风可昏迷打断，50% 破釜沉舟）。",
          who: "打断 / 转火 / 副坦"
        },
        {
          name: "【英雄】斩首 / 狙击手",
          desc: "约每 18 秒对当前坦施放斩首，约 300 万物理伤，须预开盾/主动减伤。额外召唤狙击手：猎人印记锁定非坦，射击与多重射击锥形——被标记者把面向带离大团；击杀优先级与刺客/铁刃同属末档。",
          who: "坦克 / 被标记"
        }
      ],
      mechanics: [
        "控怒气：躲震波余波、秒旗/潮、防御姿态停手 Boss 只清场。",
        "姿态约各 1 分钟：战斗换坦 → 狂暴打 Boss → 防御停手。",
        "怒气技能约 15 秒：30 震波 / 50 战旗 / 70 战歌（≈65% 最大生命物理 + 降最大生命）/ 100 破坏者。",
        "Adds 优先：战旗/潮 > 奥术 > 战萨 > 狙击手 > 刺客 > 铁刃。",
        "破甲 2–3 层换坦；英雄斩首预开盾/减伤。",
      ],
      positioning: "震波前预散；躲开余波线与破坏者旋刃。铁刃与治疗潮拉离大团。远程相对集中但留出口。狙击手/刺客把锥形与面向带离人群。",
      roles: {
        tank: "主坦破甲 2–3 层换坦；副坦接增援并拉离铁刃/图腾；英雄斩首预开盾/减伤。",
        healer: "战歌前抬满；碎骨者减最大生命需重点；驱散奥术 DoT/战萨大地盾。",
        dps: "Adds > Boss；防御姿态停手 Boss；秒旗/潮；打断战萨与奥术；狙击手/刺客按优先级处理。",
      },
      notes: "灭团点：防御姿态继续木桩涨怒气 → 连续战歌/破坏者；战旗不拆；斩首裸抗。",
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
      summary: "计时两阶段循环：库卡隆之力（怒气 0→100）与血之怒（约 20 秒）交替。全程治疗被吸收转为远古屏障——尽量把盾铺绿。约 6 分钟硬狂暴。库卡隆之力时间线：圆弧斩 ×3 → 聚爆能量紫圈 ×3（分配踩满，漏踩全团巨额暗影）→ 50 能量亚煞极之息（旧扇形区引爆）→ 重复 → 100 能量再吐息 → 血之怒。致命打击约 15 层换坦；地震猛击击飞并刷活性腐蚀（8 码减速，副坦近战 cleave）。血之怒屏障失效，推荐强力主坦牺牲/单吃；错位能量出 8 码再驱。英雄约每 3 秒刷亚煞极精华宝珠，免疫者定期清理。",
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
          desc: "场上刷 3（10 人）/ 7（25 人）个紫色裂隙：有人在内爆炸时中等暗影伤；任一裂隙无人则全团巨额暗影伤。按分区名单分配满盾玩家各踩一个，漏踩即灭团。",
          who: "全员分配",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/malkorok/implodingEnergy.mp4"
        },
        {
          name: "血之怒 / 无情突袭",
          desc: "100 怒气进入血之怒：近战巨额物理，推荐强力主坦牺牲/叠减伤单吃（也可多人分摊）。每秒 -5 怒气，到 0 结束。屏障失效，真实血线危险。结束后叠「无情突袭」约 +25% 伤害，后续压力递增。",
          who: "坦克 / 全团"
        },
        {
          name: "错位能量（Displaced Energy）",
          desc: "血之怒阶段随机 DoT（约 9 秒每 3 秒暗影伤）；到期或被驱散时 8 码巨额暗影爆炸，中者免疫自己的爆炸。出团后再安全驱散。",
          who: "被点名 / 驱散"
        },
        {
          name: "【英雄】亚煞极精华宝珠 / 活性腐蚀",
          desc: "约每 3 秒刷 2/5 个腐蚀宝珠并永久占场：碰到会炸掉并移除远古屏障，须免疫/减伤者定期清理。地震猛击额外刷活性腐蚀，8 码内强减速光环，副坦近战 cleave 尽快击杀。",
          who: "机动 / DPS",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/malkorok/essenceOfYShaarj.mp4"
        }
      ],
      mechanics: [
        "远古瘴气：治疗转屏障，尽量铺绿；血之怒期间屏障失效。",
        "库卡隆之力时间线：圆弧斩 ×3 → 紫圈 ×3（分区踩满）→ 50 能量吐息（清空旧扇形）→ 重复 → 100 能量吐息 → 血之怒。",
        "致命打击约 15 层换坦；地震猛击击飞 + 活性腐蚀（副坦 cleave）。",
        "血之怒：推荐主坦牺牲/单吃；错位能量出 8 码再驱。",
        "英雄：约每 3 秒刷宝珠，免疫者定期清；勿踩珠拆屏障。",
      ],
      positioning: "库卡隆之力阶段全场散开（≥5 码），紫圈按分区预站位。圆弧斩/吐息永远朝安全方向，记住扇形落点勿再踩。血之怒主坦单吃或按指挥分摊；错位点名出 8 码。",
      roles: {
        tank: "约 15 层致命打击换坦；引导扇形；血之怒主坦牺牲/单吃；副坦 cleave 活性腐蚀。",
        healer: "持续铺满远古屏障（尽量绿）；紫圈与血之怒高压；安全驱散错位能量（出 8 码后）。",
        dps: "按分区踩紫圈；躲斩与吐息；英雄免疫者定期清宝珠。",
      },
      notes: "灭团点：漏紫圈、站旧扇形吃吐息、血之怒乱站/盾已破、踩珠拆屏障。",
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
      summary: "无本体 Boss。两队各管半场：一组魔古→螳螂，另一组螳螂→魔古。能量轻 1 / 中 3 / 重 14，每侧约 50 能量拉闸；示例路线 2 重 + 6 中 + 4 轻。中控台开战后立刻跳下。先开熊猫人箱拿职责增益。魔古：石像保持 ≤3–4 尊；活化魔古光束须站人 soak，血红重组圈拉怪出圈（英雄圈也伤玩家）；葬瓮火花勿贴。螳螂：炸弹丢角落；琥珀塑形者优先；信息素云 clutter；物质扰乱光束交换站位。英雄：清完一箱对侧刷不稳定火花，约 10 秒不杀超新星——禁止连开多箱。",
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
          desc: "「重回石像」击飞并刷石像；每尊石像给议会怪约 +10% 伤害，场上石像保持 ≤3–4 尊，必须持续清石像。各长老另有团伤技能（暗影箭雨/熔岩拳/翡翠风暴/碎裂等）。",
          who: "魔古侧",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/returnToStone.mp4"
        },
        {
          name: "魔古中箱：物质扰乱 / 血红重组",
          desc: "活化魔古：两道光束必须有人站，否则全团巨伤（交换站位）。血红重组圈每秒给圈内敌人回约 15% 最大生命——坦克把怪拉出。【英雄】圈还会对站在其中的玩家造成伤害，勿用站圈输出。",
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
          desc: "任一侧「清完一箱」的怪后，对侧立刻刷不稳定火花；约 10 秒内不杀会超新星（全团巨伤）。一次开多箱会连刷多只火花把对侧打崩——开箱要卡对侧处理节奏，固定 1–2 远程盯火花。",
          who: "对侧远程",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/spoils-of-pandaria/supernova.mp4"
        }
      ],
      mechanics: [
        "两队语音独立：魔古→螳螂 / 螳螂→魔古；每侧约 50 能量拉闸。",
        "能量轻 1 / 中 3 / 重 14；示例 2 重 + 6 中 + 4 轻。先熊猫箱拿增益。",
        "魔古：石像 ≤3–4 尊；光束 soak 交换站位；血红圈拉怪出（英雄圈伤玩家）；火花勿贴。",
        "螳螂：炸弹丢角落；琥珀塑形者优先；驱散残留/女皇之怒；激怒战争召唤者风筝。",
        "英雄：清完一箱 → 对侧刷火花约 10 秒超新星；开箱卡对侧节奏，禁止连开多箱。",
      ],
      positioning: "各房扇形拉怪；光束位预先站人交换 soak；炸弹丢后续不去的角落；龙卷风与信息素云预留跑位。魔古侧注意 anima golem 光束与疗圈。",
      roles: {
        tank: "建仇；血红圈/符文把怪拉出；石像控 ≤3–4；战争召唤者激怒时风筝。",
        healer: "分房抬；驱散折磨/残留/女皇之怒/酒桶迷惑；照看炸弹点名。",
        dps: "听开箱表；石像与火花优先；琥珀塑形者优先；英雄盯对侧不稳定火花。",
      },
      notes: "灭团点：能量算错超时、光束无人、炸弹放中路、连开多箱火花刷崩对侧。",
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
      summary: "两阶段循环。P1 可坦：能量满震耳尖啸（团伤+打断施法），越放越密——第一段 P1 尽量拖长，减伤链轮换，虔诚光环可减轻打断锁。正面与尾部留空禁站。约 15 名 <50% 血玩家 10 码集合进 P2。P2 锁定追人（正面撕咬秒杀），秒狱卒开笼；开笼序：阿考里克（酸）→ 古莱（冰）→ 蒙塔克（火）。吞食囚徒会治疗 Boss，须全程维持减疗（如 MS）。火阶段最难，尽快转阶段；冰墓必须打碎。英雄：二段 P1 接洞穴蝙蝠，三段 P1 躲饥饿雪人冲锋。",
      skills: [
        {
          name: "震耳尖啸（Deafening Screech）",
          desc: "能量满时全团高额物理伤并打断施法。每施放一次能量回复加快，尖啸越来越密。第一段 P1 用减伤链轮换尽量拖长；虔诚光环可减轻打断锁。开减伤并停手读条。",
          who: "治疗 / 全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/thok-the-bloodthirsty/deafeningScreech.mp4"
        },
        {
          name: "血污（Bloodied）→ 进 P2",
          desc: "玩家掉到约 50% 以下获得血污。25 人约需 15 名带血污且互相在 10 码内时进入 P2。尽量控血延后；需要转阶段时再按指挥集合。",
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
          name: "【英雄】洞穴蝙蝠 / 饥饿雪人 / 吞食回血",
          desc: "第二次 P1：刷被俘洞穴蝙蝠，副坦接住并尽快清。第三次 P1：饥饿雪人场内冲锋，全员躲白道，通常不硬杀。每次 P2 吞食囚徒索克会回血——全程维持减疗（MS 等），交爆发把血打回来；火阶段最难，尽快转阶段。",
          who: "副坦 / 全员"
        }
      ],
      mechanics: [
        "第一段 P1 尽量拖长：减伤链轮换顶尖啸；虔诚光环减打断锁。",
        "约 15 名 <50% 血 10 码集合进 P2；平时控血防误触。",
        "P2：风筝锁定、秒狱卒开笼；开笼序酸→冰→火。",
        "吞食囚徒治疗 Boss——全程维持减疗，爆发对冲回血。",
        "火阶段最难尽快转；冰墓必须打碎。英雄二段 P1 接蝙蝠，三段躲雪人。",
      ],
      positioning: "P1 侧面堆，正面与尾部留空。P2 外圈固定 A/B 风筝点。火阶段散开火池；冰阶段预留打冰墓站位。英雄预留雪人冲锋白道。",
      roles: {
        tank: "侧面换坦消恐慌/减甲/冰层；P2 接狱卒；英雄接蝙蝠。",
        healer: "尖啸减伤链递增；控血防误触 P2；冰墓/锁定点抬；维持减疗覆盖吞食回血。",
        dps: "被锁定先跑；狱卒优先；打冰墓；英雄清蝙蝠、躲雪人。",
      },
      notes: "灭团点：尖啸漏减伤、误集合进 P2、正面撕咬、火池铺满、冰墓不打、吞食回血无减疗。",
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
      summary: "单阶段工厂战，主目标是黑索 + 自动撕裂者。Boss 坦在西北传送带附近，撕裂者拉开 ≥35 码防自动修理光束。静电充能叠层换坦，充能也大幅增伤撕裂者。两队轮换跳管上第一段传送带（模式识别约 1 分钟不能再上），每波拆掉且只拆一件武器；拆件 → 防护狂暴 10 秒 100% 攻速，整波不拆 → 充能防御矩阵约 20 秒减伤。英雄落到二带的武器里会有一件过载。常见前期放行导弹；过载处理：导弹三连震波、激光三环火（站边/中心）、地雷分裂成两只、磁铁推拉交替。撕裂者过载叠层须在第四层前击杀；头部附魔电磁脉冲可短暂 EMP（可选）。",
      skills: [
        {
          name: "发射锯刃（Launch Sawblade）",
          desc: "向随机玩家扔出永久锯刃，踩到被击退并吃高额物理（锯齿斩）。只能被激活电磁铁的「磁力碾压」清除。",
          who: "全员",
          video: "https://assets2.mythictrap.com/videos/siege-of-orgrimmar/siegecrafter-blackfuse/launchSawblade.mp4"
        },
        {
          name: "自动撕裂者 / 反应装甲",
          desc: "周期性召唤。反应装甲被动减伤约 90%，需带「静电充能」的坦克接住才能有效击杀。高空坠击：起飞砸地，15 码内高伤，落地后 5 秒易伤 +200%。过载：非传送带玩家吃小伤，撕裂者伤害 +30% 叠层——须在第四层前击杀。距 Boss <35 码会被修理光束每 3 秒回 5% 最大生命。副坦应单独拉远 ≥35 码，用充能易伤打。",
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
          desc: "放行后点名玩家追踪光束，留火路；火上每秒叠火焰 DoT（最多约 20），火也能伤撕裂者。英雄过载：改为三圈火环，不再追人——站最外圈或中心安全区，勿站中间环。",
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
        "Boss + 撕裂者 ≥35 码；充能叠层换坦，充能增伤撕裂者。",
        "两队轮换上带（模式识别 1 分钟）；每波拆且只拆一件。",
        "拆件 → 防护狂暴 10 秒；整波不拆 → 矩阵减伤约 20 秒。",
        "常见前期放行导弹；参考拆件序：1–5/7–8/10–11 导弹，6 地雷，9/12 激光。",
        "英雄过载：导弹三连震波、激光三环（站边/中心）、地雷分裂、磁铁推拉。撕裂者过载第四层前击杀。",
      ],
      positioning: "Boss 靠西北传送带；撕裂者单独远端 ≥35 码。激光火路拉向无锯区；过载激光站最外圈或中心。磁力阶段给锯刃让出通道，推拉交替注意站位；地雷刷点附近便于顺劈。",
      roles: {
        tank: "充能叠层换坦；副坦独拉撕裂者 ≥35 码；狂暴窗口开减伤；撕裂者第四层过载前击杀。",
        healer: "充能换坦与防护狂暴窗口抬坦；分散处理火路/导弹环/地雷爆炸；过载阶段减伤。",
        dps: "传送带组按表拆件、躲净化光束；地面转火撕裂者落地易伤、控杀地雷、躲锯/环/火；过载导弹处理三连震波。",
      },
      notes: "灭团点：整波不拆吃矩阵、撕裂者被修好或叠满过载、磁力夹锯、无人上带、过载激光站错环。",
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
      summary: "九名英杰，场上通常同时只有三只激活；击杀一只后下一位入场。普通：击杀时其余激活英杰回满并获「英杰之志」约 +8% 伤害。英雄：伤增改为约每 50 秒全局叠层，拖时间更危险。禁止无规划 cleave。推荐击杀序：觅血者 → 切割者 → 至尊者 → 虫群卫士 → 毒心者 → 操纵者 → 明澈者 → 掠风者 → 暴食蝗。尸体可捡一次英杰之力（按职责）。",
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
        "推荐击杀序：觅血者 → 切割者 → 至尊者 → 虫群卫士 → 毒心者 → 操纵者 → 明澈者 → 掠风者 → 暴食蝗。",
        "单点集火；击杀回血，勿乱 cleave。",
        "坦克 Debuff 配对：觅血者≠切割者；毒心者≠掠风者。",
        "尸体技能每人只能捡一次。DPS：觅血者嗜血 / 虫群卫士复眼 / 暴食蝗强腿。治疗：毒心者药理 / 明澈者机巧。坦克：切割者变蝎 / 至尊者琥珀大师。机动：操纵者傀儡 / 掠风者收割。",
        "英雄：伤增每约 50 秒叠；茧不可普攻打掉；催化剂双色；炎界多线；蝎形态需杀寄生解除。"
      ],
      positioning: "虫群卫士居中便于瞄准排线；暴食蝗冲锋散开；毒素红散黄靠边；昆虫拉出近战核心；头前顺劈背离团。",
      roles: {
        tank: "分坦配对；盾击/凿击换坦；蝎形态捕食寄生；减伤挡腐蚀之血。",
        healer: "瞄准/催化剂/削弱/天降窗口抬血；血勿掉 25% 以下；捡药理存疗。",
        dps: "单目标；控血球/打茧/转火昆虫；瞄准分摊或独吃；捡复眼/强腿/收割。"
      },
      notes: "常见翻车：误杀第二目标回血、Debuff 同坦、茧回满、蓝毒未分摊、削弱斩杀、昆虫能量满成熟。",
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
      notes: "开荒劝退点：过渡养能量、强化心控连环、P3 场地被亵渎吃光、P4 恶意空吃或没星断狂怒。",
      quests: "传奇披风、坐骑与最终剧情。",
      diagram: "garrosh"
    }
  ],
};

