const seasons = [
  {
    name: 'Spring',
    description: 'Warm, fresh and clear tones that echo new blooms and soft daylight.',
    swatches: ['#ffd9b3', '#ffb3c6', '#c8f0c8', '#ffe9a8'],
  },
  {
    name: 'Summer',
    description: 'Cool, muted pastels with a gentle, powdery softness and calm depth.',
    swatches: ['#c9d6ff', '#e2c9ff', '#bfe3e0', '#f2c9dd'],
  },
  {
    name: 'Autumn',
    description: 'Rich, earthy warmth — golden ambers, spice and grounded olive hues.',
    swatches: ['#e0a458', '#b5651d', '#8a9a5b', '#d98559'],
  },
  {
    name: 'Winter',
    description: 'Bold, icy contrast with jewel intensity and crisp, striking clarity.',
    swatches: ['#7c83ff', '#c04cc0', '#4cc0c0', '#2a2a45'],
  },
] as const

export function SeasonCircles() {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
      {seasons.map((season) => (
        <li key={season.name} className="flex flex-col items-center text-center">
          <div className="relative grid size-20 grid-cols-2 overflow-hidden rounded-full shadow-sm ring-1 ring-border sm:size-24">
            {season.swatches.map((color, i) => (
              <span
                key={i}
                className="block size-full"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
          </div>
          <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
            {season.name}
          </h3>
          <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
            {season.description}
          </p>
        </li>
      ))}
    </ul>
  )
}
