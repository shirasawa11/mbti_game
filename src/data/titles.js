export const titleSuffixes = {
  E: ['社交者', '引导者', '行动派', '世界公民'],
  I: ['独行者', '内观者', '沉思考', '寂静之人'],
  S: ['务实者', '观察者', '现实的锚', '细节之眼'],
  N: ['梦想家', '预见者', '抽象之翼', '可能性的信徒'],
  T: ['分析者', '逻辑家', '理性的剑', '真理追求者'],
  F: ['共情者', '调和者', '情感之泉', '价值守护者'],
  J: ['规划者', '秩序者', '结构的匠人', '决定之人'],
  P: ['探索者', '灵活者', '可能性之海', '随遇之人'],
}

export function generateTitle(mbtiType, personality) {
  const mainTitle = personality.title
  return mainTitle
}

export function generateFlavorText(mbtiType) {
  const texts = {
    INTJ: '你不是冷漠，你只是把热情留给了值得的事。',
    INTP: '在思想的迷宫中，你永远不迷路。',
    ENTJ: '你生来就是为了改变秩序，而非适应秩序。',
    ENTP: '世界是你的辩论场，而你享受每一场。',
    INFJ: '你看穿一切，却选择温柔以待。',
    INFP: '你的内心有一座比迷宫更复杂的宇宙。',
    ENFJ: '你点亮的火炬，别人看不见，却感受到了温度。',
    ENFP: '你的好奇心，是你送给这个世界最好的礼物。',
    ISTJ: '稳如磐石，深如渊海。',
    ISFJ: '默默守护，是最强大的温柔。',
    ESTJ: '秩序不是枷锁，是你为自己铺设的道路。',
    ESFJ: '你不需要铠甲，你的善良足够强大。',
    ISTP: '行动是思考的另一种语言。',
    ISFP: '你以沉默画出令世界惊叹的色彩。',
    ESTP: '世界跟不上你的脚步，这让你很满意。',
    ESFP: '你来了，你看见了，你点燃了。',
  }
  return texts[mbtiType] || '你的人格，独一无二。'
}
