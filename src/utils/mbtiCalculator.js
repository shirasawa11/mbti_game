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
  const analysis = {
    totalChoices: choiceHistory.length,
    socialTendency: '',
    decisionStyle: '',
    riskAttitude: '',
  }

  const eChoices = choiceHistory.filter(c => c.effects.E > 0).length
  const iChoices = choiceHistory.filter(c => c.effects.I > 0).length
  analysis.socialTendency = eChoices > iChoices ? '社交倾向' : '独立倾向'

  const tChoices = choiceHistory.filter(c => c.effects.T > 0).length
  const fChoices = choiceHistory.filter(c => c.effects.F > 0).length
  analysis.decisionStyle = tChoices > fChoices ? '理性驱动' : '情感驱动'

  const jChoices = choiceHistory.filter(c => c.effects.J > 0).length
  const pChoices = choiceHistory.filter(c => c.effects.P > 0).length
  analysis.riskAttitude = jChoices > pChoices ? '稳健规划型' : '灵活探索型'

  return analysis
}
