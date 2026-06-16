const PUNS = {
  A: [
    "H2-WOW. Absolutely crushing it.",
    "Your kidneys are throwing a party and you're invited.",
    "You drink water like it's your actual job. Respect.",
    "Gold star. Your cells are genuinely thriving.",
  ],
  B: [
    "Pretty good! You're no desert, but you're not exactly an ocean either.",
    "Solid hydration energy. Your cells are lowkey vibing.",
    "B for effort. Your plants are jealous.",
    "Not bad. Your urine is probably an acceptable colour.",
  ],
  C: [
    "Mediocre moisture. You're giving 'room temperature glass of water left out overnight' energy.",
    "You're somewhere between a puddle and a pond. Aim for lake.",
    "Your hydration says 'fine' but your body says 'hmm'.",
    "C is for 'could do better' and also 'come on'.",
  ],
  D: [
    "Your kidneys have submitted a formal complaint.",
    "Even your houseplants are embarrassed for you.",
    "You had ONE job. It was water.",
    "Even cacti are side-eyeing you right now.",
    "Scientists are studying your ability to survive on so little water. For science.",
  ],
  F: [
    "Raisins are more hydrated than you. Actual raisins.",
    "Congratulations, you are basically jerky at this point.",
    "Doctors call this 'technically alive.' That's the bar you're clearing.",
    "A cactus saw your score and felt personally attacked.",
    "Your blood type is dust.",
    "The Atacama desert called. It wants its moisture back.",
    "You have achieved negative hydration. Scientists are baffled.",
  ],
}

// Deterministic pick so it varies month-to-month but doesn't randomise on every render
export function getPun(grade, seed = 0) {
  const list = PUNS[grade] || PUNS.F
  return list[seed % list.length]
}

export { PUNS }
