const chapter2 = {
  id: 2,
  title: '第二章 · 迷雾',
  subtitle: '信任还是孤行',
  bgm: 'chapter2',
  startScene: 'ch2_enter',
  scenes: {
    ch2_enter: {
      id: 'ch2_enter',
      chapter: 2,
      background: 'fog',
      atmosphere: 'mysterious',
      dialogs: [
        { speaker: 'narrator', text: '你进入了迷宫的更深层。', delay: 0 },
        { speaker: 'narrator', text: '浓雾弥漫，能见度不到三步。', delay: 500 },
        { speaker: 'narrator', text: '迷雾中，一个黑袍身影逐渐浮现。', delay: 600 },
        { speaker: 'shadow_guide', text: '又一个迷途者。', emotion: 'enigmatic', delay: 400 },
        { speaker: 'shadow_guide', text: '我可以带你穿过这片迷雾。但你需要相信我。', emotion: 'testing', delay: 500 },
        { speaker: 'narrator', text: '你注意到黑袍人的手微微颤抖，像是在压抑什么。', delay: 500 },
      ],
      choices: [
        {
          id: 'trust_guide',
          text: '接受他的帮助',
          subtext: '一个人走不出这片迷雾',
          effects: { E: 2, F: 1, J: 1 },
          flags: { trustedGuide: true },
          nextScene: 'ch2_trust',
        },
        {
          id: 'reject_guide',
          text: '婉拒，独自穿过迷雾',
          subtext: '你的直觉在发出警告',
          effects: { I: 1, T: 2, J: 1 },
          flags: { rejectedGuide: true },
          nextScene: 'ch2_alone',
        },
        {
          id: 'question_guide',
          text: '先问他几个问题',
          subtext: '信任需要时间——至少再几分钟',
          effects: { S: 1, T: 1, P: 1 },
          flags: { questionedGuide: true },
          nextScene: 'ch2_question',
        },
      ],
    },

    ch2_trust: {
      id: 'ch2_trust',
      chapter: 2,
      background: 'fog',
      atmosphere: 'tense',
      dialogs: [
        { speaker: 'shadow_guide', text: '明智的选择。跟我来。', emotion: 'approving', delay: 0 },
        { speaker: 'narrator', text: '你们在迷雾中穿行。黑袍人步伐稳健。', delay: 500 },
        { speaker: 'shadow_guide', text: '这个迷宫会映照你的灵魂。', emotion: 'enigmatic', delay: 400 },
        { speaker: 'shadow_guide', text: '每走一步，都会留下印记。你之前已经留下了几个。', emotion: 'testing', delay: 500 },
        { speaker: 'narrator', text: '你路过一个岔路口。两条路看起来一模一样。', delay: 500 },
        { speaker: 'shadow_guide', text: '左边是捷径，但会让你面对不愿看见的东西。右边更远，但是安全。', emotion: 'enigmatic', delay: 500 },
      ],
      choices: [
        {
          id: 'take_shortcut',
          text: '走左边——捷径',
          subtext: '你知道自己准备好了',
          effects: { N: 1, P: 1 },
          flags: { tookShortcut: true },
          nextScene: 'ch2_end',
        },
        {
          id: 'take_safe',
          text: '走右边——安全路线',
          subtext: '今天不是冒险的时候',
          effects: { S: 2 },
          flags: { tookSafeRoute: true },
          nextScene: 'ch2_end',
        },
      ],
    },

    ch2_alone: {
      id: 'ch2_alone',
      chapter: 2,
      background: 'fog_dark',
      atmosphere: 'oppressive',
      dialogs: [
        { speaker: 'narrator', text: '你独自走进迷雾。', delay: 0 },
        { speaker: 'narrator', text: '四周越来越暗。你听见自己的脚步声在迷雾中回荡。', delay: 500 },
        { speaker: 'narrator', text: '突然——你踩到了什么。是一块和陈旧符文相似的石头。', delay: 600 },
        { speaker: 'narrator', text: '石头在你手中发光，照出了一条隐藏的小路。', delay: 500 },
      ],
      choices: [
        {
          id: 'follow_hidden_path',
          text: '跟随石头指引的小路',
          subtext: '石头在你手心越来越烫',
          effects: { N: 2, P: 1, I: 1 },
          flags: { followedHiddenPath: true },
          nextScene: 'ch2_end',
        },
        {
          id: 'ignore_stone_path',
          text: '无视石头，朝最宽的路走',
          subtext: '最宽的路，走过的人最多',
          effects: { S: 2 },
          flags: { ignoredStone: true },
          nextScene: 'ch2_end',
        },
      ],
    },

    ch2_question: {
      id: 'ch2_question',
      chapter: 2,
      background: 'fog',
      atmosphere: 'tense',
      dialogs: [
        { speaker: 'shadow_guide', text: '谨慎的人活得更久。问吧。', emotion: 'testing', delay: 0 },
        { speaker: 'narrator', text: '你问了三个问题。他回答了两个。', delay: 400 },
        { speaker: 'shadow_guide', text: '第三个问题的答案，你需要自己去找。', emotion: 'enigmatic', delay: 500 },
        { speaker: 'narrator', text: '他指了一个方向，然后消失在雾中。你手中有了一张碎片地图。', delay: 500 },
      ],
      choices: [
        {
          id: 'use_map',
          text: '按地图规划路线',
          subtext: '每一步都踩在预定的位置上',
          effects: { S: 2, J: 2, T: 1 },
          flags: { plannedRoute: true },
          nextScene: 'ch2_end',
        },
        {
          id: 'explore_freely',
          text: '地图只是一个参考——自由探索',
          subtext: '地图上没有标记的地方，才值得去',
          effects: { N: 1, P: 2 },
          flags: { exploredFreely: true },
          nextScene: 'ch2_end',
        },
      ],
    },

    ch2_end: {
      id: 'ch2_end',
      chapter: 2,
      background: 'fog_fade',
      atmosphere: 'calm',
      dialogs: [
        { speaker: 'narrator', text: '你穿过了迷雾。', delay: 0 },
        { speaker: 'narrator', text: '前方的空间豁然开朗。迷雾在你身后缓缓合拢。', delay: 500 },
        { speaker: 'narrator', text: '你看见远处有一面巨大的古老镜子，悬浮在半空中。', delay: 500 },
        { speaker: 'narrator', text: '第二章 · 迷雾 · 完', delay: 300 },
      ],
      choices: [],
    },
  },
}

export default chapter2
