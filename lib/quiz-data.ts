export const questions = [
  {
    stepTitle: 'Skin & Sun Response',
    question: 'How does your skin react to initial sun exposure?',
    options: [
      {
        value: {
          id: 'sun_reaction_burns_slow_tan',
          scores: { temperature: -1.0, value: 1.5, chroma: 0.0 },
          primaryAttribute: 'Light / Cool',
          seasonAffinities: ['Light Summer', 'Cool Summer', 'Light Spring'],
          explanation: 'Low melanin density and cool/pale undertones lead to quick burning and minimal tanning capability.'
        },
        label: 'Burns easily, turns red first, and tans slowly or stays pale',
        swatch: '#f3d9d3'
      },
      {
        value: {
          id: 'sun_reaction_burns_then_golden',
          scores: { temperature: 1.5, value: 0.5, chroma: 0.5 },
          primaryAttribute: 'Warm',
          seasonAffinities: ['Warm Spring', 'Warm Autumn', 'Light Spring'],
          explanation: 'Presence of pheomelanin creates a initial reddish warmth that transitions easily into golden tones.'
        },
        label: 'Burns slightly at first, then transitions into a golden-bronze tan',
        swatch: '#e2ab80'
      },
      {
        value: {
          id: 'sun_reaction_rarely_burns_deep_tan',
          scores: { temperature: 0.5, value: -1.5, chroma: 0.0 },
          primaryAttribute: 'Deep',
          seasonAffinities: ['Deep Autumn', 'Deep Winter', 'Warm Autumn'],
          explanation: 'High eumelanin baseline offers strong natural UV defense, producing rich dark tan tones effortlessly.'
        },
        label: 'Rarely burns, tans easily and quickly into a deep olive or rich brown',
        swatch: '#936340'
      }
    ]
  },
  {
    stepTitle: 'Skin & Sun Response',
    question: 'What tone does your tan settle into after a few days?',
    options: [
      {
        value: {
          id: 'tan_tone_golden_honey',
          scores: { temperature: 2.0, value: 0.0, chroma: 0.5 },
          primaryAttribute: 'Warm',
          seasonAffinities: ['Warm Autumn', 'Warm Spring', 'Deep Autumn'],
          explanation: 'Tan retains noticeable warm yellow/gold undertones characteristic of warm-dominant palettes.'
        },
        label: 'Warm golden-honey, peachy, or copper brown',
        swatch: '#c68a4c'
      },
      {
        value: {
          id: 'tan_tone_cool_olive_pinkish',
          scores: { temperature: -2.0, value: -0.5, chroma: -1.0 },
          primaryAttribute: 'Cool / Soft',
          seasonAffinities: ['Cool Summer', 'Soft Summer', 'Cool Winter'],
          explanation: 'Tan manifests with ash, blue-pink, or greyish-olive undertones rather than warm gold.'
        },
        label: 'Cool reddish-pink, greyish-olive, or muted tan',
        swatch: '#a68a78'
      },
      {
        value: {
          id: 'tan_tone_no_tan_pale_pink',
          scores: { temperature: -1.0, value: 2.0, chroma: 0.0 },
          primaryAttribute: 'Light',
          seasonAffinities: ['Light Summer', 'Light Spring', 'Cool Summer'],
          explanation: 'Inability to hold pigment indicates extreme lightness/coolness as a primary architectural boundary.'
        },
        label: 'I do not tan; I remain pale with lingering pinkness',
        swatch: '#fad6c5'
      }
    ]
  },
  {
    stepTitle: 'Skin & Sun Response',
    question: 'If you have freckles, what shade are they?',
    options: [
      {
        value: {
          id: 'freckles_golden_rust',
          scores: { temperature: 2.0, value: 0.5, chroma: 1.0 },
          primaryAttribute: 'Warm',
          seasonAffinities: ['Warm Spring', 'Warm Autumn', 'Light Spring'],
          explanation: 'Golden or rusty freckles are a direct indicator of warm carotene/pheomelanin pigment in the skin.'
        },
        label: 'Golden-brown, warm rust, or reddish-orange',
        swatch: '#9c5d33'
      },
      {
        value: {
          id: 'freckles_greyish_taupe',
          scores: { temperature: -1.0, value: 0.0, chroma: -1.5 },
          primaryAttribute: 'Soft / Muted',
          seasonAffinities: ['Soft Summer', 'Soft Autumn', 'Cool Summer'],
          explanation: 'Greyish or charcoal freckles indicate muted undertones and lower contrast chroma.'
        },
        label: 'Greyish-brown, cool taupe, or dark charcoal',
        swatch: '#7a6b61'
      },
      {
        value: {
          id: 'freckles_none_clear',
          scores: { temperature: 0.0, value: 0.0, chroma: 1.0 },
          primaryAttribute: 'Clear / Neutral',
          seasonAffinities: ['Bright Winter', 'Bright Spring', 'Cool Winter'],
          explanation: 'Absence of scattered pigmentation points toward higher clarity and smooth skin tone consistency.'
        },
        label: 'No freckles present',
        swatch: '#f4e3d7'
      }
    ]
  },
  {
    stepTitle: 'Skin & Sun Response',
    question: 'How does your skin flush under cold weather, exercise, or emotion?',
    options: [
      {
        value: {
          id: 'flush_peachy_coral',
          scores: { temperature: 1.5, value: 1.0, chroma: 1.0 },
          primaryAttribute: 'Warm / Light',
          seasonAffinities: ['Warm Spring', 'Light Spring', 'Bright Spring'],
          explanation: 'Peach/coral surface flushing stems from warm yellow surface lipids interacting with surface blood flow.'
        },
        label: 'Warm peachy-coral or soft golden blush',
        swatch: '#ff9a85'
      },
      {
        value: {
          id: 'flush_cool_pink_purple',
          scores: { temperature: -2.0, value: 0.0, chroma: 0.0 },
          primaryAttribute: 'Cool',
          seasonAffinities: ['Cool Summer', 'Cool Winter', 'Light Summer'],
          explanation: 'Purplish or rose flushing reflects blue-cyan undertones visible through translucent skin layers.'
        },
        label: 'Cool purplish-pink, bluish-pink, or dark rose',
        swatch: '#de6b98'
      },
      {
        value: {
          id: 'flush_minimal_pale',
          scores: { temperature: 0.0, value: 0.0, chroma: 1.5 },
          primaryAttribute: 'Clear / Deep',
          seasonAffinities: ['Bright Winter', 'Deep Winter', 'Deep Autumn'],
          explanation: 'Minimal surface color change keeps skin appearance stable and high in clarity/contrast.'
        },
        label: 'Minimal flush / skin turns pale and even',
        swatch: '#f7ece1'
      }
    ]
  },
  {
    stepTitle: 'Natural Features & Hair',
    question: 'What was your natural hair color in childhood (up to ~10 years old)?',
    options: [
      {
        value: {
          id: 'childhood_hair_light_blonde',
          scores: { temperature: 0.5, value: 2.0, chroma: 0.5 },
          primaryAttribute: 'Light',
          seasonAffinities: ['Light Spring', 'Light Summer'],
          explanation: 'Very light early pigment indicates a dominant Light value trait across the overall profile.'
        },
        label: 'Platinum, pale flaxen blonde, or light golden blonde',
        swatch: '#f5e8c7'
      },
      {
        value: {
          id: 'childhood_hair_auburn_golden_brown',
          scores: { temperature: 2.0, value: 0.5, chroma: 1.0 },
          primaryAttribute: 'Warm',
          seasonAffinities: ['Warm Spring', 'Warm Autumn', 'Bright Spring'],
          explanation: 'Reddish or golden strands in youth reveal strong natural warmth bound to hair follicles.'
        },
        label: 'Strawberry blonde, auburn, or warm golden-brown',
        swatch: '#c26d45'
      },
      {
        value: {
          id: 'childhood_hair_ash_mousy',
          scores: { temperature: -1.0, value: 1.0, chroma: -2.0 },
          primaryAttribute: 'Soft / Cool',
          seasonAffinities: ['Soft Summer', 'Cool Summer', 'Light Summer'],
          explanation: 'Muted grey-brown or ash tones highlight low chroma and cool-leaning underlying tones.'
        },
        label: 'Ash blonde, light ash brown, or mousy grey-brown',
        swatch: '#a39b8b'
      },
      {
        value: {
          id: 'childhood_hair_dark_brown_black',
          scores: { temperature: 0.0, value: -2.0, chroma: 0.0 },
          primaryAttribute: 'Deep',
          seasonAffinities: ['Deep Winter', 'Deep Autumn', 'Cool Winter'],
          explanation: 'High concentration of eumelanin early in life sets a high-contrast or Deep value base.'
        },
        label: 'Dark brown, chestnut, or deep black',
        swatch: '#2b1e1a'
      }
    ]
  },
  {
    stepTitle: 'Natural Features & Hair',
    question: 'How does your natural hair react to sun exposure?',
    options: [
      {
        value: {
          id: 'hair_sun_golden_copper_highlights',
          scores: { temperature: 2.0, value: 0.0, chroma: 1.0 },
          primaryAttribute: 'Warm',
          seasonAffinities: ['Warm Autumn', 'Warm Spring', 'Light Spring'],
          explanation: 'UV light oxidizes pigment into copper or golden hues when warm undertones dominate.'
        },
        label: 'Develops golden, reddish, or copper highlights',
        swatch: '#d48c46'
      },
      {
        value: {
          id: 'hair_sun_muted_ash_silvery',
          scores: { temperature: -1.5, value: 0.5, chroma: -1.5 },
          primaryAttribute: 'Cool / Soft',
          seasonAffinities: ['Soft Summer', 'Cool Summer', 'Soft Autumn'],
          explanation: 'Sun exposure bleaches hair into flat ash or wheat tones, reinforcing muted/cool qualities.'
        },
        label: 'Fades to a muted ash, wheat, or silvery-pale tone',
        swatch: '#c4b8a5'
      },
      {
        value: {
          id: 'hair_sun_retains_dark_shade',
          scores: { temperature: 0.0, value: -1.5, chroma: 0.5 },
          primaryAttribute: 'Deep / Clear',
          seasonAffinities: ['Deep Winter', 'Cool Winter', 'Bright Winter'],
          explanation: 'Resistance to sun bleaching indicates dense, resistant pigment typical of Winter subtypes.'
        },
        label: 'Retains its dark shade with minimal color shift',
        swatch: '#1c1715'
      }
    ]
  },
  {
    stepTitle: 'Contrast & Intuition Tests',
    question: 'Which jewelry metal makes your skin look healthiest?',
    options: [
      {
        value: {
          id: 'jewelry_yellow_gold',
          scores: { temperature: 2.0, value: 0.0, chroma: 0.5 },
          primaryAttribute: 'Warm',
          seasonAffinities: ['Warm Spring', 'Warm Autumn', 'Light Spring', 'Deep Autumn'],
          explanation: 'Yellow gold harmonizes with golden undertones, preventing skin from looking washed out.'
        },
        label: 'Yellow gold or copper brings out a warm glow',
        swatch: '#d4af37'
      },
      {
        value: {
          id: 'jewelry_silver_platinum',
          scores: { temperature: -2.0, value: 0.0, chroma: 0.5 },
          primaryAttribute: 'Cool',
          seasonAffinities: ['Cool Summer', 'Cool Winter', 'Light Summer', 'Deep Winter'],
          explanation: 'Silver reflects cool light that neutralizes unwanted redness and brightens cool skin.'
        },
        label: 'Silver, white gold, or platinum brightens my skin',
        swatch: '#c0c0c0'
      },
      {
        value: {
          id: 'jewelry_brushed_pewter_rose_gold',
          scores: { temperature: 0.0, value: 0.0, chroma: -2.0 },
          primaryAttribute: 'Soft / Neutral',
          seasonAffinities: ['Soft Summer', 'Soft Autumn'],
          explanation: 'Preference for matte or mixed metals indicates a neutral temperature and soft/muted chroma.'
        },
        label: 'Brushed silver, rose gold, or pewter look best',
        swatch: '#b76e79'
      }
    ]
  },
  {
    stepTitle: 'Contrast & Intuition Tests',
    question: 'Pure Snow White vs. Soft Cream/Ecru draped near your face:',
    options: [
      {
        value: {
          id: 'drape_pure_snow_white',
          scores: { temperature: -1.0, value: 1.0, chroma: 2.0 },
          primaryAttribute: 'Bright / Cool',
          seasonAffinities: ['Bright Winter', 'Cool Winter', 'Deep Winter', 'Bright Spring'],
          explanation: 'Handling stark white without looking washed out requires high natural contrast or bright clarity.'
        },
        label: 'Pure snow white illuminates my face and sharpens my features',
        swatch: '#ffffff'
      },
      {
        value: {
          id: 'drape_cream_ivory',
          scores: { temperature: 2.0, value: 0.5, chroma: -0.5 },
          primaryAttribute: 'Warm',
          seasonAffinities: ['Warm Autumn', 'Warm Spring', 'Soft Autumn', 'Light Spring'],
          explanation: 'Warm off-whites blend smoothly with golden skin undertones where pure white appears clinical.'
        },
        label: 'Cream or ivory flatters me; pure white looks harsh',
        swatch: '#f5f2e3'
      },
      {
        value: {
          id: 'drape_soft_offwhite_grey',
          scores: { temperature: -1.0, value: 0.0, chroma: -2.0 },
          primaryAttribute: 'Soft',
          seasonAffinities: ['Soft Summer', 'Soft Autumn', 'Cool Summer', 'Light Summer'],
          explanation: 'Muted greys or heathered tones complement low-contrast feature combinations without overpowering.'
        },
        label: 'Soft off-white or heather grey looks best; pure white washes me out',
        swatch: '#9e9e9e'
      }
    ]
  },
  {
    stepTitle: 'Contrast & Intuition Tests',
    question: 'Solid Black fabric draped under your chin:',
    options: [
      {
        value: {
          id: 'drape_black_striking_elegance',
          scores: { temperature: -0.5, value: -2.0, chroma: 1.5 },
          primaryAttribute: 'Deep / Bright',
          seasonAffinities: ['Deep Winter', 'Cool Winter', 'Bright Winter', 'Deep Autumn'],
          explanation: 'Black requires significant native value depth or vivid contrast to prevent facial shadowing.'
        },
        label: 'Adds striking elegance and clear definition',
        swatch: '#1a1a1a'
      },
      {
        value: {
          id: 'drape_black_makes_tired',
          scores: { temperature: 0.0, value: 1.5, chroma: -1.5 },
          primaryAttribute: 'Light / Soft',
          seasonAffinities: ['Light Summer', 'Light Spring', 'Soft Summer'],
          explanation: 'Black overwhelms delicate or light coloring, casting dark shadows around the jawline.'
        },
        label: 'Casts dark shadows under my eyes and makes me look tired',
        swatch: '#4a4a4a'
      },
      {
        value: {
          id: 'drape_black_needs_warm_accents',
          scores: { temperature: 1.5, value: -1.0, chroma: -1.0 },
          primaryAttribute: 'Warm / Deep',
          seasonAffinities: ['Warm Autumn', 'Soft Autumn', 'Deep Autumn'],
          explanation: 'Black is wearable only when balanced by warm undertones, typical of dark rich Autumn subtypes.'
        },
        label: 'Works only when paired with rich, warm accents',
        swatch: '#332923'
      }
    ]
  }
];