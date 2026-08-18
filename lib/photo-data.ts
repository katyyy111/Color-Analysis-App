export interface ColorSample {
  id: string;
  label: string;
  samplingInstruction: string;
  hex: string | null;
}

export interface PhotoQuestion {
  stepTitle: string;
  question: string;
  description: string;
  colorSamples: ColorSample[];
}

export const photoQuestions: PhotoQuestion[] = [
  {
    stepTitle: 'Photo Upload: Full Face Portrait',
    question: 'Please upload a clear, front-facing portrait taken in natural indirect daylight.',
    description: 'Take an eye-level photo facing a window. Ensure zero makeup, hair tied back (or covered with a neutral white/grey towel if dyed), and a plain white or grey background.',
    colorSamples: [
      {
        id: 'cheek_skin_tone',
        label: 'Mid-Cheek Skin Tone',
        samplingInstruction: 'Sample the central, smooth area of the cheek avoiding extreme highlights, shadows, or blush.',
        hex: null
      },
      {
        id: 'forehead_skin_tone',
        label: 'Forehead Skin Tone',
        samplingInstruction: 'Sample the center of the forehead under ambient light to measure overall surface warmth/coolness.',
        hex: null
      },
      {
        id: 'under_eye_shadow',
        label: 'Under-Eye Shadow',
        samplingInstruction: 'Sample the deepest tone just under the lower eyelid to analyze blue/purple vs. brown undertones.',
        hex: null
      },
      {
        id: 'background_neutral',
        label: 'Background Reference',
        samplingInstruction: 'Sample the plain background wall or cloth behind you to calibrate white balance.',
        hex: null
      }
    ]
  },
  {
    stepTitle: 'Photo Upload: Iris Macro Detail',
    question: 'Please upload a macro close-up of your eye/iris in sharp focus.',
    description: 'Capture a close-up shot of one eye under bright daylight without flash. The photo must clearly display the iris pattern, ring structure, and contrast against the white of the eye.',
    colorSamples: [
      {
        id: 'iris_dominant_color',
        label: 'Primary Iris Base',
        samplingInstruction: 'Sample the main body color of the iris halfway between the pupil and the outer edge.',
        hex: null
      },
      {
        id: 'limbal_ring',
        label: 'Limbal Ring',
        samplingInstruction: 'Sample the dark outer edge encircling the iris to evaluate border definition and contrast.',
        hex: null
      },
      {
        id: 'iris_fleck_accent',
        label: 'Iris Burst / Flecks',
        samplingInstruction: 'Sample any gold, yellow, or rusty flecks around the pupil (or secondary shade if solid).',
        hex: null
      },
      {
        id: 'sclera_white',
        label: 'Sclera (Eye White)',
        samplingInstruction: 'Sample a clear white region of the sclera to measure contrast against iris intensity.',
        hex: null
      }
    ]
  },
  {
    stepTitle: 'Photo Upload: Inner Wrist',
    question: 'Please upload a close-up photo of the inside of your wrist.',
    description: 'Photograph the inner side of your wrist under natural light to reveal underlying blood vessel tones (blue, green, or purple veins) and skin translucency.',
    colorSamples: [
      {
        id: 'vein_primary',
        label: 'Primary Vein Color',
        samplingInstruction: 'Sample the most prominent vein (e.g., olive-green, teal, or violet-blue).',
        hex: null
      },
      {
        id: 'vein_secondary',
        label: 'Secondary Vein Tone',
        samplingInstruction: 'Sample a smaller adjacent branch or subtle secondary vein pathway.',
        hex: null
      },
      {
        id: 'wrist_skin_base',
        label: 'Inner Wrist Base Skin',
        samplingInstruction: 'Sample a non-vein area nearby to evaluate skin translucency and underlying tone.',
        hex: null
      }
    ]
  },
  {
    stepTitle: 'Photo Upload: Natural Features & Jawline',
    question: 'Please upload a close-up shot of your lower face, jawline, and neck.',
    description: 'Focus on the transition between your jawline and neck without lip balm or cosmetics. This reveals natural lip pigmentation, freckle hue, and skin undertones.',
    colorSamples: [
      {
        id: 'natural_lip_tone',
        label: 'Natural Lip Pigment',
        samplingInstruction: 'Sample the center of the unadorned lip (e.g., mauve, berry, peach, or rose).',
        hex: null
      },
      {
        id: 'jawline_transition',
        label: 'Jawline Skin Tone',
        samplingInstruction: 'Sample the skin along the lower jaw boundary.',
        hex: null
      },
      {
        id: 'neck_skin_tone',
        label: 'Neck Base Tone',
        samplingInstruction: 'Sample the side of the neck beneath the jaw to evaluate unexposed base skin warmth.',
        hex: null
      },
      {
        id: 'freckle_tone',
        label: 'Freckle / Spot Pigment',
        samplingInstruction: 'Sample a prominent freckle if present (e.g., golden-brown, rust, or ash-taupe); leave blank if none.',
        hex: null
      }
    ]
  },
  {
    stepTitle: 'Photo Upload: Hair Roots & Hairline',
    question: 'Please upload a close-up of your natural hair roots or crown.',
    description: 'Part your hair near the scalp to show natural root growth under daylight. If your hair is fully dyed, show the most recent root regrowth; if natural, show hair in daylight.',
    colorSamples: [
      {
        id: 'hair_root_base',
        label: 'Natural Hair Root',
        samplingInstruction: 'Sample the darkest/newest natural growth closest to the scalp.',
        hex: null
      },
      {
        id: 'hair_mid_length',
        label: 'Hair Strand Body',
        samplingInstruction: 'Sample the mid-length of a hair bundle away from scalp shadows.',
        hex: null
      },
      {
        id: 'hair_sun_highlight',
        label: 'Sun Highlight / Reflex',
        samplingInstruction: 'Sample a light-facing strand to capture natural glints (e.g., copper, gold, or ash-pale).',
        hex: null
      },
      {
        id: 'scalp_skin_tone',
        label: 'Scalp Skin Base',
        samplingInstruction: 'Sample the exposed scalp skin at the hair parting line.',
        hex: null
      }
    ]
  }
];