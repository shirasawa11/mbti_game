const chapter4 = {
  id: 4,
  title: '第四章 · 深渊',
  subtitle: '秩序与混沌的边界',
  startScene: 'ch4_enter',
  scenes: {
    ch4_enter: {
      id: 'ch4_enter',
      chapter: 4,
      background: 'abyss',
      atmosphere: 'oppressive',
      dialogs: [
        { speaker: 'narrator', text: '你沿着红色通道走了很久。', delay: 0 },
        { speaker: 'narrator', text: '通道突然断掉了——你面前是无尽的深渊。', delay: 500 },
        { speaker: 'narrator', text: '深渊上方悬浮着碎石，形成了一条不规则的"路"。', delay: 500 },
        { speaker: 'narrator', text: '但每块石头之间距离很远，而且有些石头在微微摇晃。', delay: 500 },
        { speaker: 'narrator', text: '深渊中传来各种声音——笑声、哭声、低语。', delay: 500 },
        { speaker: 'narrator', text: '你的每一个犹豫，脚下的石头就变暗一分。', delay: 400 },
      ],
      choices: [
        {
          id: 'plan_route',
          text: '仔细规划每一块落脚石',
          subtext: '三思而后行——你有足够的时间计算',
          effects: { J: 3, S: 2 },
          flags: { plannedJumps: true },
          nextScene: 'ch4_planning',
        },
        {
          id: 'leap_faith',
          text: '相信直觉，直接跳过去',
          subtext: '过度思考只会让你坠落',
          effects: { P: 3, N: 2 },
          flags: { leapOfFaith: true },
          nextScene: 'ch4_leap',
        },
        {
          id: 'listen_voices',
          text: '聆听深渊中的声音',
          subtext: '或许它们知道该怎么走',
          effects: { N: 2, I: 1, P: 1 },
          flags: { listenedToVoices: true },
          nextScene: 'ch4_voices',
        },
      ],
    },

    ch4_planning: {
      id: 'ch4_planning',
      chapter: 4,
      background: 'abyss',
      atmosphere: 'tense',
      dialogs: [
        { speaker: 'narrator', text: '你冷静分析每一块石头的位置。', delay: 0 },
        { speaker: 'narrator', text: '路线在脑内成型。你一格格稳步行进。', delay: 500 },
        { speaker: 'narrator', text: '深渊的诱惑对你无效——你专注于脚下。', delay: 400 },
        { speaker: 'narrator', text: '但当你走到一半时——', delay: 300 },
        { speaker: 'narrator', text: '前方的石头开始加速碎裂。你需要快速决定。', delay: 400 },
      ],
      choices: [
        {
          id: 'stick_to_plan',
          text: '坚持原计划，但加快速度',
          subtext: '计划是好的，只是需要执行到位',
          effects: { J: 2, T: 1 },
          flags: { stuckToPlan: true },
          nextScene: 'ch4_end',
        },
        {
          id: 'improvise',
          text: '计划已经没用了——随机应变',
          subtext: '情况变了，策略也要变',
          effects: { P: 2, N: 1 },
          flags: { improvised: true },
          nextScene: 'ch4_end',
        },
      ],
    },

    ch4_leap: {
      id: 'ch4_leap',
      chapter: 4,
      background: 'abyss',
      atmosphere: 'tense',
      dialogs: [
        { speaker: 'narrator', text: '你深吸一口气，不看脚下，纵身跃出。', delay: 0 },
        { speaker: 'narrator', text: '风在耳边呼啸。石头在你脚下自行浮现。', delay: 400 },
        { speaker: 'narrator', text: '迷宫似乎被你的勇气震慑到了。', delay: 500 },
        { speaker: 'narrator', text: '几块石头在你踩上去的瞬间碎裂——但你已经在下一块上了。', delay: 500 },
      ],
      choices: [
        {
          id: 'keep_jumping',
          text: '继续保持速度——不要停下来',
          subtext: '速度就是你最大的优势',
          effects: { P: 2, E: 1 },
          flags: { keptJumping: true },
          nextScene: 'ch4_end',
        },
        {
          id: 'slow_down',
          text: '到中段时放慢——观察前方',
          subtext: '冲刺够了，现在需要策略',
          effects: { J: 1, S: 2 },
          flags: { slowedDown: true },
          nextScene: 'ch4_end',
        },
      ],
    },

    ch4_voices: {
      id: 'ch4_voices',
      chapter: 4,
      background: 'abyss',
      atmosphere: 'mysterious',
      dialogs: [
        { speaker: 'narrator', text: '你闭上眼睛，聆听深渊。', delay: 0 },
        { speaker: 'narrator', text: '无数的声音——', delay: 400 },
        { speaker: 'narrator', text: '"走左边第二条..."一个声音说。', delay: 400 },
        { speaker: 'narrator', text: '"别听它的！直接跳！"另一个声音喊。', delay: 400 },
        { speaker: 'narrator', text: '在混乱中，你捕捉到一个微弱但清晰的声音。', delay: 400 },
        { speaker: 'narrator', text: '"跟着石头的呼吸节奏...它们会告诉你..."', delay: 400 },
      ],
      choices: [
        {
          id: 'follow_rhythm',
          text: '跟随石头的"呼吸"韵律',
          subtext: '这个建议与众不同，而且很具体',
          effects: { N: 3, I: 1 },
          flags: { followedRhythm: true },
          nextScene: 'ch4_end',
        },
        {
          id: 'combined_approach',
          text: '结合声音的建议和自己的判断',
          subtext: '全听别人的等于把自己的命运交给别人',
          effects: { S: 1, T: 1, J: 1 },
          flags: { combinedApproach: true },
          nextScene: 'ch4_end',
        },
      ],
    },

    ch4_end: {
      id: 'ch4_end',
      chapter: 4,
      background: 'abyss_fade',
      atmosphere: 'calm',
      dialogs: [
        { speaker: 'narrator', text: '你成功穿越了深渊。', delay: 0 },
        { speaker: 'narrator', text: '回头望去，深渊中的碎石全部坠入黑暗。', delay: 500 },
        { speaker: 'narrator', text: '前路只有一条——通往迷宫的核心。', delay: 500 },
        { speaker: 'narrator', text: '第四章 · 深渊 · 完', delay: 300 },
      ],
      choices: [],
    },
  },
}

export default chapter4
