const chapter3 = {
  id: 3,
  title: '第三章 · 抉择',
  subtitle: '理性与情感的交锋',
  startScene: 'ch3_mirror',
  scenes: {
    ch3_mirror: {
      id: 'ch3_mirror',
      chapter: 3,
      background: 'mirror_room',
      atmosphere: 'mysterious',
      dialogs: [
        { speaker: 'narrator', text: '你站在巨大的古镜前。', delay: 0 },
        { speaker: 'narrator', text: '镜中映出的不是你的模样——而是另一个"你"。', delay: 500 },
        { speaker: 'mirror_self', text: '终于见面了。', emotion: 'mocking', delay: 400 },
        { speaker: 'mirror_self', text: '我是你一直压抑的那一面。', emotion: 'truthful', delay: 500 },
        { speaker: 'mirror_self', text: '让我们做个交易。我可以告诉你迷宫的真相——', emotion: 'testing', delay: 500 },
        { speaker: 'mirror_self', text: '但作为交换，你需要放弃你在这里最珍贵的那段记忆。', emotion: 'sad', delay: 600 },
        { speaker: 'narrator', text: '你的手心开始冒汗。', delay: 500 },
      ],
      choices: [
        {
          id: 'accept_trade',
          text: '接受交易——真相更重要',
          subtext: '你想知道真相，无论代价是什么',
          effects: { T: 3, N: 1, E: 1 },
          flags: { acceptedTrade: true },
          nextScene: 'ch3_trade_accepted',
        },
        {
          id: 'reject_trade',
          text: '拒绝——记忆定义了我',
          subtext: '失去一部分自己，还算活着吗',
          effects: { F: 3, E: 1 },
          flags: { rejectedTrade: true },
          nextScene: 'ch3_trade_rejected',
        },
        {
          id: 'negotiate',
          text: '寻求第三方方案',
          subtext: '为什么只给两个选项？一定还有别的路',
          effects: { N: 1, P: 1, F: 1 },
          flags: { negotiated: true },
          nextScene: 'ch3_negotiate',
        },
      ],
    },

    ch3_trade_accepted: {
      id: 'ch3_trade_accepted',
      chapter: 3,
      background: 'mirror_room',
      atmosphere: 'tense',
      dialogs: [
        { speaker: 'mirror_self', text: '聪明。', emotion: 'approving', delay: 0 },
        { speaker: 'narrator', text: '一股冰冷的感觉流过你的脑海。', delay: 400 },
        { speaker: 'narrator', text: '一段记忆消失了。你甚至不记得失去了什么。', delay: 500 },
        { speaker: 'mirror_self', text: '迷宫是活的。它以选择为食。', emotion: 'truthful', delay: 400 },
        { speaker: 'mirror_self', text: '你每做一个决定，它就更了解你一分。最终——', emotion: 'mocking', delay: 500 },
        { speaker: 'narrator', text: '镜中的倒影突然碎裂。', delay: 300 },
        { speaker: 'narrator', text: '镜子后面露出一条通道。通道尽头发着红光。', delay: 500 },
      ],
      choices: [
        {
          id: 'rush_through',
          text: '毫不犹豫走进去',
          subtext: '已经走到这一步了',
          effects: { J: 2, T: 1, E: 1 },
          flags: { rushedIn: true },
          nextScene: 'ch3_end',
        },
        {
          id: 'pause_reflect',
          text: '停一下，消化刚才的信息',
          subtext: '你需要一分钟...就一分钟',
          effects: { I: 1, S: 2, P: 1 },
          flags: { pausedToReflect: true },
          nextScene: 'ch3_end',
        },
      ],
    },

    ch3_trade_rejected: {
      id: 'ch3_trade_rejected',
      chapter: 3,
      background: 'mirror_room',
      atmosphere: 'tense',
      dialogs: [
        { speaker: 'mirror_self', text: '有趣。不是每个人都能拒绝。', emotion: 'curious', delay: 0 },
        { speaker: 'mirror_self', text: '你选择了完整。这值得尊重。', emotion: 'respectful', delay: 400 },
        { speaker: 'narrator', text: '镜中的倒影向你微微鞠躬。', delay: 300 },
        { speaker: 'mirror_self', text: '那我换一个问题。你觉得——一个牺牲少数拯救多数的决定，是对还是错？', emotion: 'testing', delay: 500 },
      ],
      choices: [
        {
          id: 'utilitarian',
          text: '牺牲少数拯救多数——这是更合理的选择',
          subtext: '如果必须选一边，答案很清楚',
          effects: { T: 3, J: 1 },
          flags: { utilitarian: true },
          nextScene: 'ch3_end',
        },
        {
          id: 'deontological',
          text: '每个生命都有不可替代的价值',
          subtext: '你没有资格替那"少数"做决定',
          effects: { F: 3, P: 1 },
          flags: { deontological: true },
          nextScene: 'ch3_end',
        },
      ],
    },

    ch3_negotiate: {
      id: 'ch3_negotiate',
      chapter: 3,
      background: 'mirror_room',
      atmosphere: 'mysterious',
      dialogs: [
        { speaker: 'mirror_self', text: '折中...有意思。', emotion: 'curious', delay: 0 },
        { speaker: 'mirror_self', text: '那你回答我一个问题。答对了，我免费告诉你真相。', emotion: 'testing', delay: 400 },
        { speaker: 'mirror_self', text: '"迷宫最害怕的是什么？"', emotion: 'truthful', delay: 500 },
        { speaker: 'narrator', text: '你思考着这个问题。', delay: 400 },
      ],
      choices: [
        {
          id: 'answer_truth',
          text: '"迷宫害怕一个不按规则出牌的人"',
          subtext: '你不确定为什么——但你感觉这就是答案',
          effects: { N: 2, P: 1, T: 1 },
          flags: { answeredCorrect: true },
          nextScene: 'ch3_end',
        },
        {
          id: 'answer_emotion',
          text: '"迷宫害怕真正了解自己的人"',
          subtext: '真正看清自己的人，不会被任何东西困住',
          effects: { F: 2, I: 1, S: 1 },
          flags: { answeredDeep: true },
          nextScene: 'ch3_end',
        },
      ],
    },

    ch3_end: {
      id: 'ch3_end',
      chapter: 3,
      background: 'red_glow',
      atmosphere: 'tense',
      dialogs: [
        { speaker: 'narrator', text: '镜子彻底碎裂，碎片悬浮在空中。', delay: 0 },
        { speaker: 'narrator', text: '红光通道在你面前展开。', delay: 400 },
        { speaker: 'narrator', text: '你感觉到迷宫深处的某个存在正在注视着你。', delay: 500 },
        { speaker: 'narrator', text: '第三章 · 抉择 · 完', delay: 300 },
      ],
      choices: [],
    },
  },
}

export default chapter3
