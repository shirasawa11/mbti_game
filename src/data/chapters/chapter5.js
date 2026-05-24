const chapter5 = {
  id: 5,
  title: '第五章 · 真相',
  subtitle: '你究竟是谁',
  startScene: 'ch5_core',
  scenes: {
    ch5_core: {
      id: 'ch5_core',
      chapter: 5,
      background: '10',
      atmosphere: 'solemn',
      dialogs: [
        { speaker: 'narrator', text: '你终于走到了迷宫的核心。', delay: 0 },
        { speaker: 'narrator', text: '这里不是黑暗的——而是一片柔和的白光。', delay: 500 },
        { speaker: 'narrator', text: '一个身影坐在房间中央，像是在等你。', delay: 500 },
        { speaker: 'maze_keeper', text: '你来了。', emotion: 'solemn', delay: 400 },
        { speaker: 'maze_keeper', text: '这座迷宫...它从来没有困住过任何人。', emotion: 'solemn', delay: 400 },
        { speaker: 'maze_keeper', text: '它只是让人看见自己。', emotion: 'curious', delay: 500 },
        { speaker: 'maze_keeper', text: '你走过的每一条路，做的每一个决定——都是你。', emotion: 'solemn', delay: 400 },
        { speaker: 'maze_keeper', text: '现在——最后的选择。', emotion: 'judging', delay: 400 },
        { speaker: 'narrator', text: '守护者抬起手，两个发光的光球浮现在你面前。', delay: 500 },
        { speaker: 'maze_keeper', text: '左边：保留你在迷宫中的一切记忆，离开。右边：忘记一切，但获得重新开始的机会。', emotion: 'solemn', delay: 500 },
      ],
      choices: [
        {
          id: 'keep_memories',
          text: '保留记忆——离开迷宫',
          subtext: '好的坏的，每一段都是你',
          effects: { I: 3, F: 2, J: 1 },
          flags: { keptMemories: true },
          nextScene: 'ch5_kept',
        },
        {
          id: 'restart',
          text: '选择重新开始',
          subtext: '有些路，你想重新走一遍',
          effects: { E: 1, P: 3, N: 2 },
          flags: { choseRestart: true },
          nextScene: 'ch5_restart',
        },
        {
          id: 'third_option',
          text: '两个都不选——你有第三个问题',
          subtext: '你从来就不喜欢被框住',
          effects: { N: 3, T: 2, P: 1 },
          flags: { choseThirdOption: true },
          nextScene: 'ch5_third',
        },
      ],
    },

    ch5_kept: {
      id: 'ch5_kept',
      chapter: 5,
      background: '10',
      atmosphere: 'calm',
      dialogs: [
        { speaker: 'maze_keeper', text: '你选择了完整。', emotion: 'respectful', delay: 0 },
        { speaker: 'maze_keeper', text: '带着伤痕的人，比完整的人更强大。', emotion: 'solemn', delay: 500 },
        { speaker: 'narrator', text: '白光大盛。你感到自己的每一个选择都汇聚成了一道光。', delay: 500 },
        { speaker: 'narrator', text: '你终于看清了自己。', delay: 400 },
        { speaker: 'narrator', text: '第五章 · 真相 · 完', delay: 300 },
      ],
      choices: [],
    },

    ch5_restart: {
      id: 'ch5_restart',
      chapter: 5,
      background: '10',
      atmosphere: 'mysterious',
      dialogs: [
        { speaker: 'maze_keeper', text: '很少人选择这个。', emotion: 'curious', delay: 0 },
        { speaker: 'maze_keeper', text: '你对可能性的信仰，超越了经验的羁绊。', emotion: 'respectful', delay: 500 },
        { speaker: 'narrator', text: '白光化成无数条路径。每一条都通向不同的可能。', delay: 500 },
        { speaker: 'narrator', text: '你不只是看到了自己——你看到了自己可以成为的所有样子。', delay: 500 },
        { speaker: 'narrator', text: '第五章 · 真相 · 完', delay: 300 },
      ],
      choices: [],
    },

    ch5_third: {
      id: 'ch5_third',
      chapter: 5,
      background: '10',
      atmosphere: 'mysterious',
      dialogs: [
        { speaker: 'maze_keeper', text: '...', emotion: 'curious', delay: 0 },
        { speaker: 'maze_keeper', text: '你是第一个这么问的人。', emotion: 'surprised', delay: 500 },
        { speaker: 'maze_keeper', text: '"记忆和遗忘——都不是终点。改变才是。"', emotion: 'solemn', delay: 400 },
        { speaker: 'narrator', text: '守护者站起身，第一次直视你。', delay: 400 },
        { speaker: 'maze_keeper', text: '你不是要离开迷宫——你是要成为迷宫的主人。', emotion: 'respectful', delay: 500 },
        { speaker: 'narrator', text: '第五章 · 真相 · 完', delay: 300 },
      ],
      choices: [],
    },
  },
}

export default chapter5
