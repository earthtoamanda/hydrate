const STATES = {
  parched: {
    size: 130,
    bodyColor: '#c4bab0',
    bodyColor2: '#aba099',
    eyeColor: '#6b5e55',
    glowColor: null,
    morphDur: '7s',
    floatDur: null,
    messages: [
      "No water yet? I'm basically dust.",
      "I'm shriveling. Hello??",
      "Water... please... I beg.",
      "I've seen raisins more hydrated than this.",
    ],
  },
  thirsty: {
    size: 150,
    bodyColor: '#b8d8ca',
    bodyColor2: '#8fbfad',
    eyeColor: '#3d6b5a',
    glowColor: null,
    morphDur: '5.5s',
    floatDur: '5s',
    messages: [
      "I'm withering over here...",
      "Starting to feel like a raisin.",
      "A little help? Please?",
      "Technically alive. Barely.",
    ],
  },
  okay: {
    size: 170,
    bodyColor: '#88c0a8',
    bodyColor2: '#5fa085',
    eyeColor: '#2d4a3e',
    glowColor: 'rgba(122,181,160,0.3)',
    morphDur: '4s',
    floatDur: '4s',
    messages: [
      "Getting there. Keep going!",
      "Not bad, not great. Middle ground.",
      "I can feel the moisture returning.",
      "Halfway! Don't quit on me now.",
    ],
  },
  happy: {
    size: 190,
    bodyColor: '#6aaee0',
    bodyColor2: '#3a88c8',
    eyeColor: '#1a3a6a',
    glowColor: 'rgba(90,159,212,0.4)',
    morphDur: '3s',
    floatDur: '2.8s',
    messages: [
      "YES. Feed me more!",
      "Now we're TALKING.",
      "I can feel myself glowing!",
      "This is the content I deserve.",
    ],
  },
  elated: {
    size: 210,
    bodyColor: '#62ceff',
    bodyColor2: '#28a8e8',
    eyeColor: '#0a2a5a',
    glowColor: 'rgba(79,195,247,0.5)',
    morphDur: '2.2s',
    floatDur: '2s',
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

function Eyes({ state, color }) {
  if (state === 'parched') return (
    <>
      <line x1="36" y1="45" x2="44" y2="40" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="56" y1="40" x2="64" y2="45" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </>
  )
  if (state === 'thirsty') return (
    <>
      <line x1="35" y1="43" x2="46" y2="43" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="54" y1="43" x2="65" y2="43" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </>
  )
  if (state === 'okay') return (
    <>
      <circle cx="40" cy="43" r="3.5" fill={color} />
      <circle cx="60" cy="43" r="3.5" fill={color} />
    </>
  )
  if (state === 'happy') return (
    <>
      <path d="M34 46 Q40 37 46 46" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M54 46 Q60 37 66 46" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  )
  return (
    <>
      <path d="M33 47 Q40 35 47 47" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M53 47 Q60 35 67 47" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="38" cy="34" r="2.5" fill="white" opacity="0.7" />
      <circle cx="58" cy="34" r="2.5" fill="white" opacity="0.7" />
    </>
  )
}

function Mouth({ state, color }) {
  if (state === 'parched') return (
    <path d="M40 60 Q50 55 60 60" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  )
  if (state === 'thirsty') return (
    <line x1="42" y1="59" x2="58" y2="59" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  )
  if (state === 'okay') return (
    <path d="M42 58 Q50 63 58 58" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  )
  if (state === 'happy') return (
    <path d="M38 56 Q50 67 62 56" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
  )
  return (
    <path d="M36 55 Q50 70 64 55" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
  )
}

export default function WaterSpirit({ pct }) {
  const state = getState(pct)
  const c = STATES[state]
  const day = new Date().getDate()
  const msg = c.messages[day % c.messages.length]
  const gradId = `sg_${state}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 8px', position: 'relative' }}>
      {c.glowColor && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: c.size * 1.4,
          height: c.size * 1.4,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.glowColor} 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      )}

      <svg
        width={c.size}
        height={c.size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', display: 'block', position: 'relative', zIndex: 1 }}
      >
        <defs>
          <radialGradient id={gradId} cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor={c.bodyColor} />
            <stop offset="100%" stopColor={c.bodyColor2} />
          </radialGradient>
        </defs>

        <g>
          {c.floatDur && (
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -12; 0 0"
              keyTimes="0; 0.5; 1"
              dur={c.floatDur}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
            />
          )}

          <ellipse cx="50" cy="55" rx="36" ry="34" fill={`url(#${gradId})`}>
            <animate attributeName="rx" values="36;32;38;30;36" dur={c.morphDur} repeatCount="indefinite" />
            <animate attributeName="ry" values="34;38;30;36;34" dur={c.morphDur} repeatCount="indefinite" />
            <animate attributeName="cy" values="55;53;57;54;55" dur={c.morphDur} repeatCount="indefinite" />
          </ellipse>

          <Eyes state={state} color={c.eyeColor} />
          <Mouth state={state} color={c.eyeColor} />

          {state === 'elated' && (
            <>
              <circle cx="22" cy="30" r="3" fill={c.bodyColor} opacity="0">
                <animate attributeName="opacity" values="0;0.8;0" dur="1.4s" repeatCount="indefinite" begin="0s" />
                <animate attributeName="cy" values="30;22;30" dur="1.4s" repeatCount="indefinite" begin="0s" />
              </circle>
              <circle cx="78" cy="28" r="2.5" fill={c.bodyColor} opacity="0">
                <animate attributeName="opacity" values="0;0.8;0" dur="1.6s" repeatCount="indefinite" begin="0.3s" />
                <animate attributeName="cy" values="28;20;28" dur="1.6s" repeatCount="indefinite" begin="0.3s" />
              </circle>
              <circle cx="15" cy="55" r="2" fill={c.bodyColor2} opacity="0">
                <animate attributeName="opacity" values="0;0.7;0" dur="1.2s" repeatCount="indefinite" begin="0.6s" />
              </circle>
              <circle cx="85" cy="60" r="3" fill={c.bodyColor} opacity="0">
                <animate attributeName="opacity" values="0;0.8;0" dur="1.8s" repeatCount="indefinite" begin="0.9s" />
                <animate attributeName="cy" values="60;52;60" dur="1.8s" repeatCount="indefinite" begin="0.9s" />
              </circle>
            </>
          )}
        </g>
      </svg>

      <p style={{
        fontSize: 15,
        color: 'var(--text-muted)',
        fontStyle: 'italic',
        fontWeight: 600,
        marginTop: 16,
        textAlign: 'center',
        maxWidth: 260,
        lineHeight: 1.5,
        fontFamily: 'Nunito, sans-serif',
        position: 'relative',
        zIndex: 1,
      }}>
        "{msg}"
      </p>
    </div>
  )
}
