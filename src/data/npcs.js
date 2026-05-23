export const npcs = {
  wounded_traveler: {
    id: 'wounded_traveler',
    name: '负伤的旅人',
    avatar: null,
    role: '第一章关键NPC',
    emotionSet: ['pain', 'grateful', 'fearful', 'calm'],
    description: '一个倒在迷宫入口的神秘旅人，身上有奇怪的符文伤痕。',
  },
  whispering_voice: {
    id: 'whispering_voice',
    name: '低语之声',
    avatar: null,
    role: '引导/蛊惑',
    emotionSet: ['mysterious', 'urgent', 'soothing', 'cold'],
    description: '从门后传来的声音，时而温柔，时而威胁。',
  },
  shadow_guide: {
    id: 'shadow_guide',
    name: '暗影引路人',
    avatar: null,
    role: '第二章NPC',
    emotionSet: ['enigmatic', 'testing', 'approving', 'disappointed'],
    description: '迷雾中出现的黑袍身影，自称可以带你走出迷宫。',
  },
  mirror_self: {
    id: 'mirror_self',
    name: '镜中倒影',
    avatar: null,
    role: '第三章NPC',
    emotionSet: ['mocking', 'truthful', 'sad', 'furious'],
    description: '一面古老镜子中出现的另一个自己，说出令人不安的真相。',
  },
  maze_keeper: {
    id: 'maze_keeper',
    name: '迷宫守护者',
    avatar: null,
    role: '第五章Boss',
    emotionSet: ['solemn', 'judging', 'curious', 'respectful'],
    description: '迷宫最深处的存在，掌握着你人格的全部真相。',
  },
}

export function getNPC(npcId) {
  return npcs[npcId] || null
}
