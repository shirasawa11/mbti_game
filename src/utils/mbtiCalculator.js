export function calculateMBTI(traits) {
  const type = [
    traits.E >= traits.I ? 'E' : 'I',
    traits.S >= traits.N ? 'S' : 'N',
    traits.T >= traits.F ? 'T' : 'F',
    traits.J >= traits.P ? 'J' : 'P',
  ].join('')

  const dimensions = {
    EI: {
      E: traits.E,
      I: traits.I,
      dominant: traits.E >= traits.I ? 'E' : 'I',
      percentage: Math.round((Math.max(traits.E, traits.I) / Math.max(traits.E + traits.I, 1)) * 100),
    },
    SN: {
      S: traits.S,
      N: traits.N,
      dominant: traits.S >= traits.N ? 'S' : 'N',
      percentage: Math.round((Math.max(traits.S, traits.N) / Math.max(traits.S + traits.N, 1)) * 100),
    },
    TF: {
      T: traits.T,
      F: traits.F,
      dominant: traits.T >= traits.F ? 'T' : 'F',
      percentage: Math.round((Math.max(traits.T, traits.F) / Math.max(traits.T + traits.F, 1)) * 100),
    },
    JP: {
      J: traits.J,
      P: traits.P,
      dominant: traits.J >= traits.P ? 'J' : 'P',
      percentage: Math.round((Math.max(traits.J, traits.P) / Math.max(traits.J + traits.P, 1)) * 100),
    },
  }

  return { type, dimensions }
}

export function analyzeBehavior(choiceHistory) {
  const total = choiceHistory.length
  const eChoices = choiceHistory.filter(c => c.effects.E > 0).length
  const iChoices = choiceHistory.filter(c => c.effects.I > 0).length
  const sChoices = choiceHistory.filter(c => c.effects.S > 0).length
  const nChoices = choiceHistory.filter(c => c.effects.N > 0).length
  const tChoices = choiceHistory.filter(c => c.effects.T > 0).length
  const fChoices = choiceHistory.filter(c => c.effects.F > 0).length
  const jChoices = choiceHistory.filter(c => c.effects.J > 0).length
  const pChoices = choiceHistory.filter(c => c.effects.P > 0).length

  const analysis = {
    totalChoices: total,

    socialTendency: eChoices > iChoices ? '外向 — 社交驱动' : '内向 — 独立探索',
    socialDetail:
      eChoices > iChoices
        ? '在迷宫中，你主动与每一个NPC交流，从对话中获取线索。你的能量来自与他人互动——每一次交流都让你更清晰地看到前路的方向。'
        : '在迷宫中，你习惯了独自前行。你不需要他人的指引——你的内心已经足够明亮。每一次沉默的思考，都让你离真相更近一步。',

    decisionStyle: tChoices > fChoices ? '理性 — 逻辑优先' : '情感 — 价值驱动',
    decisionDetail:
      tChoices > fChoices
        ? '面对迷宫中的每一个抉择，你首先计算的是逻辑后果。你拆解问题、权衡利弊、分析因果——在"核心"的终极选择前，你早已将每一种可能性在脑中推演过。'
        : '你的选择由心而发。在迷宫中，你更关注每一个决定对他人意味着什么——在"深渊"面前，你考虑的不是危险，而是同伴的安危。你的决定带着温度。',

    riskAttitude: jChoices > pChoices ? '稳健 — 规划先行' : '灵活 — 顺势而为',
    riskDetail:
      jChoices > pChoices
        ? '你不是迟疑——你是在准备。每一个岔路口，你都会审视所有线索，做出判断，然后坚定地走下去。在迷宫的混乱中，你的计划是最可靠的锚。'
        : '你享受迷宫的不确定性。每个转角都可能带来全新的发现，而你乐于调整方向。你不被计划束缚——你拥抱每一个当下的可能性，而这正是你的力量。',

    keyMoment: findKeyMoment(choiceHistory),
  }

  return analysis
}

function findKeyMoment(choiceHistory) {
  if (choiceHistory.length === 0) return '你的旅程才刚刚开始...'

  const lastChoice = choiceHistory[choiceHistory.length - 1]
  const lastEffect = lastChoice.effects || {}
  const dominantTrait = Object.entries(lastEffect).sort((a, b) => b[1] - a[1])[0]

  if (!dominantTrait) return '每一次选择都在塑造你。'

  const traitNames = {
    E: '外向', I: '内向', S: '实感', N: '直觉',
    T: '理性', F: '情感', J: '判断', P: '感知',
  }
  const traitName = traitNames[dominantTrait[0]] || dominantTrait[0]

  return `你在迷宫中的最后一个选择，深深烙印着「${traitName}」的特质。这个决定不只是改变了故事的走向——它映照出了你面对世界最核心的方式。`
}
