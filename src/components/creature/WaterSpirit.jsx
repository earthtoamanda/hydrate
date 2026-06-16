const STATES = {
  parched: {
    size: 88,
    color: '#b8b0a4',
    gradient: ['#c4bab0', '#aba099'],
    glow: 'none',
    floatSpeed: 0,
    morphSpeed: 7,
    messages: [
      "No water yet? I'm basically dust.",
      "I'm shriveling. Hello??",
      "Water... please... I beg.",
      "I've seen raisins more hydrated than this.",
    ],
  },
  thirsty: {
    size: 108,
    color: '#a8cfc0',
    gradient: ['#b8d8ca', '#98c0b0'],
    glow: 'none',
    floatSpeed: 5,
    morphSpeed: 5.5,
    messages: [
      "I'm withering over here...",
      "Starting to feel like a raisin.",
      "A little help? Please?",
      "Technically alive. Barely.",
    ],
  },
  okay: {
    size: 128,
    color: '#7ab5a0',
    gradient: ['#88c0a8', '#6aa090'],
    glow: 'rgba(122,181,160,0.25)',
    floatSpeed: 4,
    morphSpeed: 4,
    messages: [
      "Getting there. Keep going!",
      "Not bad, not great. Middle ground.",
      "I can feel the moisture returning.",
      "Halfway! Don't quit on me now.",
    ],
  },
  happy: {
    size: 150,
    color: '#5a9fd4',
    gradient: ['#6aaee0', '#4a90c8'],
    glow: 'rgba(90,159,212,0.35)',
    floatSpeed: 2.8,
    morphSpeed: 3,
    messages: [
      "YES. Feed me more!",
      "Now we're TALKING.",
      "I can feel myself glowing!",
      "This is the content I deserve.",
    ],
  },
  elated: {
    size: 170,
    color: '#4fc3f7',
    gradient: ['#62ceff', '#38b0e8'],
    glow: 'rgba(79,195,247,0.5)',
    floatSpeed: 2,
    morphSpeed: 2.2,
    messages: [
      "I'm THRIVING. Thank you!!",
      "Perfectly hydrated. I am unstoppable.",
      "Peak water spirit energy!!",
      "We did it!! I'm glowing so hard right now.",
    ],
  },
}

function getState(pct) {
  if (pct === 0) return 'parched'
  if (pct < 0.25) return 'thirsty'
  if (pct < 0.6) return 'okay'
  if (pct < 1.0) return 'happy'
  return 'elated'
}

function SpiritFace({ state }) {
  const strokeColor = state === 'parched' ? '#8a8078' : '#2d4a3e'

  const eyes = {
    parched: (
      <>
        <line x1="34" y1="43" x2="43" y2="38" strokeWidth="2.5" />
        <line x1="57" y1="38" x2="66" y2="43" strokeWidth="2.5" />
      </>
    ),
    thirsty: (
      <>
        <line x1="34" y1="42" x2="46" y2="42" strokeWidth="2.5" />
        <line x1="54" y1="42" x2="66" y2="42" strokeWidth="2.5" />
      </>
    ),
    okay: (
      <>
        <circle cx="40" cy="42" r="3" fill={strokeColor} stroke="none" />
        <circle cx="60" cy="42" r="3" fill={strokeColor} stroke="none" />
      </>
    ),
    happy: (
      <>
        <path d="M34 45 Q40 37 46 45" strokeWidth="2.5" />
        <path d="M54 45 Q60 37 66 45" strokeWidth="2.5" />
      </>
    ),
    elated: (
      <>
        <path d="M33 46 Q40 35 47 46" strokeWidth="3" />
        <path d="M53 46 Q60 35 67 46" strokeWidth="3" />
        <circle cx="38" cy="34" r="2" fill="white" opacity="0.8" stroke="none" />
        <circle cx="58" cy="34" r="2" fill="white" opacity="0.8" stroke="none" />
      </>
    ),
  }

  const mouths = {
    parched: <path d="M40 60 Q50 55 60 60" strokeWidth="2" />,
    thirsty: <line x1="42" y1="59" x2="58" y2="59" strokeWidth="2" />,
    okay: <path d="M42 58 Q50 62 58 58" strokeWidth="2" />,
    happy: <path d="M39 56 Q50 66 61 56" strokeWidth="2.5" />,
    elated: <path d="M37 55 Q50 68 63 55" strokeWidth="3" />,
  }

  return (
    <svg
      viewBox="0 0 100 100"
      style={{ position: 'absolute', inset: '12% 8%', width: '84%', height: '84%' }}
    >
      <g fill="none" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round">
        {eyes[state]}
        {mouths[state]}
      </g>
    </svg>
  )
}

function Sparkle({ x, y, size, delay }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        background: 'white',
        borderRadius: '50%',
        opacity: 0,
        animation: `spiritSparkle 1.6s ${delay}s ease-in-out infinite`,
      }}
    />
  )
}

export default function WaterSpirit({ pct }) {
  const state = getState(pct)
  const config = STATES[state]
  const day = new Date().getDate()
  const msg = config.messages[day % config.messages.length]

  const floatStyle = config.floatSpeed > 0
    ? { animation: `spiritFloat ${config.floatSpeed}s ease-in-out infinite, spiritMorph ${config.morphSpeed}s ease-in-out infinite` }
    : { animation: `spiritMorphSlow ${config.morphSpeed}s ease-in-out infinite` }

  const glowStyle = config.glow !== 'none'
    ? { boxShadow: `0 0 30px ${config.glow}, 0 8px 24px ${config.glow}` }
    : {}

  const sparkles = state === 'elated'
    ? [
        { x: '-18%', y: '10%', size: 7, delay: 0 },
        { x: '105%', y: '20%', size: 5, delay: 0.4 },
        { x: '-12%', y: '65%', size: 4, delay: 0.8 },
        { x: '108%', y: '60%', size: 6, delay: 0.2 },
        { x: '30%', y: '-15%', size: 5, delay: 0.6 },
        { x: '65%', y: '-12%', size: 4, delay: 1.0 },
      ]
    : []

  return (
    <div className="spirit-container">
      <div
        className={`spirit-blob spirit-${state}`}
        style={{
          width: config.size,
          height: config.size,
          background: `linear-gradient(135deg, ${config.gradient[0]}, ${config.gradient[1]})`,
          position: 'relative',
          ...floatStyle,
          ...glowStyle,
          transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1), height 0.8s cubic-bezier(0.34,1.56,0.64,1), background 0.8s ease',
        }}
      >
        <SpiritFace state={state} />
        {sparkles.map((s, i) => <Sparkle key={i} {...s} />)}
      </div>
      <p className="spirit-message">"{msg}"</p>
    </div>
  )
}
