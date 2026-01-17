const font = {
  family: {
    body: 'Spoqa Han Sans Neo',
    headline: 'Spoqa Han Sans Neo',
  },
  weight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
} as const;

const size = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '72px',
  '8xl': '96px',
  '9xl': '128px',
} as const;

const lineHeight = {
  leading4: '16px',
  leading5: '20px',
  leading6: '24px',
  leading7: '28px',
  leading8: '32px',
  leading9: '36px',
  leading10: '40px',
  leading11: '48px',
  leading12: '60px',
  leading13: '72px',
  leading14: '96px',
  leading15: '128px',
} as const;

const letterSpacing = {
  trackingNormal: '-0.6px',
  zero: '0px',
  neg2: '-2px',
} as const;

type FontFamilyKey = keyof typeof font.family;
type FontWeightKey = keyof typeof font.weight;
type FontSizeKey = keyof typeof size;
type LineHeightKey = keyof typeof lineHeight;
type LetterSpacingKey = keyof typeof letterSpacing;

const makeTextStyle = ({
  family,
  weight,
  fontSize,
  leading,
  tracking,
}: {
  family: FontFamilyKey;
  weight: FontWeightKey;
  fontSize: FontSizeKey;
  leading: LineHeightKey;
  tracking: LetterSpacingKey;
}) => ({
  fontFamily: font.family[family],
  fontWeight: font.weight[weight],
  fontSize: size[fontSize],
  lineHeight: lineHeight[leading],
  letterSpacing: letterSpacing[tracking],
});

const headlineWeights = {
  light: 'light',
  normal: 'normal',
  medium: 'medium',
  semiBold: 'semibold',
  bold: 'bold',
  extraBold: 'extrabold',
  black: 'black',
} as const;

const bodyWeights = headlineWeights;

export const typography = {
  font,
  size,
  lineHeight,
  letterSpacing,

  /**
   * Figma-composed text styles (e.g. `9xl/Light`, `md/Semi Bold`), represented as a nested map.
   * Keys are camelCased for ergonomics, but values match Figma exactly.
   */
  textStyle: {
    // Headline scale
    '9xl': {
      light: makeTextStyle({ family: 'headline', weight: headlineWeights.light, fontSize: '9xl', leading: 'leading15', tracking: 'neg2' }),
      normal: makeTextStyle({ family: 'headline', weight: headlineWeights.normal, fontSize: '9xl', leading: 'leading15', tracking: 'neg2' }),
      medium: makeTextStyle({ family: 'headline', weight: headlineWeights.medium, fontSize: '9xl', leading: 'leading15', tracking: 'neg2' }),
      semiBold: makeTextStyle({ family: 'headline', weight: headlineWeights.semiBold, fontSize: '9xl', leading: 'leading15', tracking: 'neg2' }),
      bold: makeTextStyle({ family: 'headline', weight: headlineWeights.bold, fontSize: '9xl', leading: 'leading15', tracking: 'neg2' }),
      extraBold: makeTextStyle({ family: 'headline', weight: headlineWeights.extraBold, fontSize: '9xl', leading: 'leading15', tracking: 'neg2' }),
      black: makeTextStyle({ family: 'headline', weight: headlineWeights.black, fontSize: '9xl', leading: 'leading15', tracking: 'neg2' }),
    },
    '8xl': {
      light: makeTextStyle({ family: 'headline', weight: headlineWeights.light, fontSize: '8xl', leading: 'leading14', tracking: 'neg2' }),
      normal: makeTextStyle({ family: 'headline', weight: headlineWeights.normal, fontSize: '8xl', leading: 'leading14', tracking: 'neg2' }),
      medium: makeTextStyle({ family: 'headline', weight: headlineWeights.medium, fontSize: '8xl', leading: 'leading14', tracking: 'neg2' }),
      semiBold: makeTextStyle({ family: 'headline', weight: headlineWeights.semiBold, fontSize: '8xl', leading: 'leading14', tracking: 'neg2' }),
      bold: makeTextStyle({ family: 'headline', weight: headlineWeights.bold, fontSize: '8xl', leading: 'leading14', tracking: 'neg2' }),
      extraBold: makeTextStyle({ family: 'headline', weight: headlineWeights.extraBold, fontSize: '8xl', leading: 'leading14', tracking: 'neg2' }),
      black: makeTextStyle({ family: 'headline', weight: headlineWeights.black, fontSize: '8xl', leading: 'leading14', tracking: 'neg2' }),
    },
    '7xl': {
      light: makeTextStyle({ family: 'headline', weight: headlineWeights.light, fontSize: '7xl', leading: 'leading13', tracking: 'neg2' }),
      normal: makeTextStyle({ family: 'headline', weight: headlineWeights.normal, fontSize: '7xl', leading: 'leading13', tracking: 'neg2' }),
      medium: makeTextStyle({ family: 'headline', weight: headlineWeights.medium, fontSize: '7xl', leading: 'leading13', tracking: 'neg2' }),
      semiBold: makeTextStyle({ family: 'headline', weight: headlineWeights.semiBold, fontSize: '7xl', leading: 'leading13', tracking: 'neg2' }),
      bold: makeTextStyle({ family: 'headline', weight: headlineWeights.bold, fontSize: '7xl', leading: 'leading13', tracking: 'neg2' }),
      extraBold: makeTextStyle({ family: 'headline', weight: headlineWeights.extraBold, fontSize: '7xl', leading: 'leading13', tracking: 'neg2' }),
      black: makeTextStyle({ family: 'headline', weight: headlineWeights.black, fontSize: '7xl', leading: 'leading13', tracking: 'neg2' }),
    },
    '6xl': {
      light: makeTextStyle({ family: 'headline', weight: headlineWeights.light, fontSize: '6xl', leading: 'leading12', tracking: 'neg2' }),
      normal: makeTextStyle({ family: 'headline', weight: headlineWeights.normal, fontSize: '6xl', leading: 'leading12', tracking: 'neg2' }),
      medium: makeTextStyle({ family: 'headline', weight: headlineWeights.medium, fontSize: '6xl', leading: 'leading12', tracking: 'neg2' }),
      semiBold: makeTextStyle({ family: 'headline', weight: headlineWeights.semiBold, fontSize: '6xl', leading: 'leading12', tracking: 'neg2' }),
      bold: makeTextStyle({ family: 'headline', weight: headlineWeights.bold, fontSize: '6xl', leading: 'leading12', tracking: 'neg2' }),
      extraBold: makeTextStyle({ family: 'headline', weight: headlineWeights.extraBold, fontSize: '6xl', leading: 'leading12', tracking: 'neg2' }),
      black: makeTextStyle({ family: 'headline', weight: headlineWeights.black, fontSize: '6xl', leading: 'leading12', tracking: 'neg2' }),
    },
    '5xl': {
      light: makeTextStyle({ family: 'headline', weight: headlineWeights.light, fontSize: '5xl', leading: 'leading11', tracking: 'neg2' }),
      normal: makeTextStyle({ family: 'headline', weight: headlineWeights.normal, fontSize: '5xl', leading: 'leading11', tracking: 'neg2' }),
      medium: makeTextStyle({ family: 'headline', weight: headlineWeights.medium, fontSize: '5xl', leading: 'leading11', tracking: 'neg2' }),
      semiBold: makeTextStyle({ family: 'headline', weight: headlineWeights.semiBold, fontSize: '5xl', leading: 'leading11', tracking: 'neg2' }),
      bold: makeTextStyle({ family: 'headline', weight: headlineWeights.bold, fontSize: '5xl', leading: 'leading11', tracking: 'neg2' }),
      extraBold: makeTextStyle({ family: 'headline', weight: headlineWeights.extraBold, fontSize: '5xl', leading: 'leading11', tracking: 'neg2' }),
      black: makeTextStyle({ family: 'headline', weight: headlineWeights.black, fontSize: '5xl', leading: 'leading11', tracking: 'neg2' }),
    },
    '4xl': {
      light: makeTextStyle({ family: 'headline', weight: headlineWeights.light, fontSize: '4xl', leading: 'leading10', tracking: 'neg2' }),
      normal: makeTextStyle({ family: 'headline', weight: headlineWeights.normal, fontSize: '4xl', leading: 'leading10', tracking: 'neg2' }),
      medium: makeTextStyle({ family: 'headline', weight: headlineWeights.medium, fontSize: '4xl', leading: 'leading10', tracking: 'neg2' }),
      semiBold: makeTextStyle({ family: 'headline', weight: headlineWeights.semiBold, fontSize: '4xl', leading: 'leading10', tracking: 'neg2' }),
      bold: makeTextStyle({ family: 'headline', weight: headlineWeights.bold, fontSize: '4xl', leading: 'leading10', tracking: 'neg2' }),
      extraBold: makeTextStyle({ family: 'headline', weight: headlineWeights.extraBold, fontSize: '4xl', leading: 'leading10', tracking: 'neg2' }),
      black: makeTextStyle({ family: 'headline', weight: headlineWeights.black, fontSize: '4xl', leading: 'leading10', tracking: 'neg2' }),
    },
    '3xl': {
      light: makeTextStyle({ family: 'headline', weight: headlineWeights.light, fontSize: '3xl', leading: 'leading9', tracking: 'neg2' }),
      normal: makeTextStyle({ family: 'headline', weight: headlineWeights.normal, fontSize: '3xl', leading: 'leading9', tracking: 'neg2' }),
      medium: makeTextStyle({ family: 'headline', weight: headlineWeights.medium, fontSize: '3xl', leading: 'leading9', tracking: 'neg2' }),
      semiBold: makeTextStyle({ family: 'headline', weight: headlineWeights.semiBold, fontSize: '3xl', leading: 'leading9', tracking: 'neg2' }),
      bold: makeTextStyle({ family: 'headline', weight: headlineWeights.bold, fontSize: '3xl', leading: 'leading9', tracking: 'neg2' }),
      extraBold: makeTextStyle({ family: 'headline', weight: headlineWeights.extraBold, fontSize: '3xl', leading: 'leading9', tracking: 'neg2' }),
      black: makeTextStyle({ family: 'headline', weight: headlineWeights.black, fontSize: '3xl', leading: 'leading9', tracking: 'neg2' }),
    },
    '2xl': {
      light: makeTextStyle({ family: 'headline', weight: headlineWeights.light, fontSize: '2xl', leading: 'leading8', tracking: 'trackingNormal' }),
      normal: makeTextStyle({ family: 'headline', weight: headlineWeights.normal, fontSize: '2xl', leading: 'leading8', tracking: 'trackingNormal' }),
      medium: makeTextStyle({ family: 'headline', weight: headlineWeights.medium, fontSize: '2xl', leading: 'leading8', tracking: 'trackingNormal' }),
      semiBold: makeTextStyle({ family: 'headline', weight: headlineWeights.semiBold, fontSize: '2xl', leading: 'leading8', tracking: 'trackingNormal' }),
      bold: makeTextStyle({ family: 'headline', weight: headlineWeights.bold, fontSize: '2xl', leading: 'leading8', tracking: 'trackingNormal' }),
      extraBold: makeTextStyle({ family: 'headline', weight: headlineWeights.extraBold, fontSize: '2xl', leading: 'leading8', tracking: 'trackingNormal' }),
      black: makeTextStyle({ family: 'headline', weight: headlineWeights.black, fontSize: '2xl', leading: 'leading8', tracking: 'trackingNormal' }),
    },

    // Body scale
    xl: {
      light: makeTextStyle({ family: 'body', weight: bodyWeights.light, fontSize: 'xl', leading: 'leading7', tracking: 'trackingNormal' }),
      normal: makeTextStyle({ family: 'body', weight: bodyWeights.normal, fontSize: 'xl', leading: 'leading7', tracking: 'trackingNormal' }),
      medium: makeTextStyle({ family: 'body', weight: bodyWeights.medium, fontSize: 'xl', leading: 'leading7', tracking: 'trackingNormal' }),
      semiBold: makeTextStyle({ family: 'body', weight: bodyWeights.semiBold, fontSize: 'xl', leading: 'leading7', tracking: 'trackingNormal' }),
      bold: makeTextStyle({ family: 'body', weight: bodyWeights.bold, fontSize: 'xl', leading: 'leading7', tracking: 'trackingNormal' }),
      extraBold: makeTextStyle({ family: 'body', weight: bodyWeights.extraBold, fontSize: 'xl', leading: 'leading7', tracking: 'trackingNormal' }),
      black: makeTextStyle({ family: 'body', weight: bodyWeights.black, fontSize: 'xl', leading: 'leading7', tracking: 'trackingNormal' }),
    },
    lg: {
      light: makeTextStyle({ family: 'body', weight: bodyWeights.light, fontSize: 'lg', leading: 'leading7', tracking: 'trackingNormal' }),
      normal: makeTextStyle({ family: 'body', weight: bodyWeights.normal, fontSize: 'lg', leading: 'leading7', tracking: 'trackingNormal' }),
      medium: makeTextStyle({ family: 'body', weight: bodyWeights.medium, fontSize: 'lg', leading: 'leading7', tracking: 'trackingNormal' }),
      semiBold: makeTextStyle({ family: 'body', weight: bodyWeights.semiBold, fontSize: 'lg', leading: 'leading7', tracking: 'trackingNormal' }),
      bold: makeTextStyle({ family: 'body', weight: bodyWeights.bold, fontSize: 'lg', leading: 'leading7', tracking: 'trackingNormal' }),
      extraBold: makeTextStyle({ family: 'body', weight: bodyWeights.extraBold, fontSize: 'lg', leading: 'leading7', tracking: 'trackingNormal' }),
      black: makeTextStyle({ family: 'body', weight: bodyWeights.black, fontSize: 'lg', leading: 'leading7', tracking: 'trackingNormal' }),
    },
    md: {
      light: makeTextStyle({ family: 'body', weight: bodyWeights.light, fontSize: 'md', leading: 'leading6', tracking: 'trackingNormal' }),
      normal: makeTextStyle({ family: 'body', weight: bodyWeights.normal, fontSize: 'md', leading: 'leading6', tracking: 'trackingNormal' }),
      medium: makeTextStyle({ family: 'body', weight: bodyWeights.medium, fontSize: 'md', leading: 'leading6', tracking: 'zero' }),
      semiBold: makeTextStyle({ family: 'body', weight: bodyWeights.semiBold, fontSize: 'md', leading: 'leading6', tracking: 'zero' }),
      bold: makeTextStyle({ family: 'body', weight: bodyWeights.bold, fontSize: 'md', leading: 'leading6', tracking: 'zero' }),
      extraBold: makeTextStyle({ family: 'body', weight: bodyWeights.extraBold, fontSize: 'md', leading: 'leading6', tracking: 'zero' }),
      black: makeTextStyle({ family: 'body', weight: bodyWeights.black, fontSize: 'md', leading: 'leading6', tracking: 'zero' }),
    },
    sm: {
      light: makeTextStyle({ family: 'body', weight: bodyWeights.light, fontSize: 'sm', leading: 'leading5', tracking: 'trackingNormal' }),
      normal: makeTextStyle({ family: 'body', weight: bodyWeights.normal, fontSize: 'sm', leading: 'leading5', tracking: 'trackingNormal' }),
      medium: makeTextStyle({ family: 'body', weight: bodyWeights.medium, fontSize: 'sm', leading: 'leading5', tracking: 'trackingNormal' }),
      semiBold: makeTextStyle({ family: 'body', weight: bodyWeights.semiBold, fontSize: 'sm', leading: 'leading5', tracking: 'trackingNormal' }),
      bold: makeTextStyle({ family: 'body', weight: bodyWeights.bold, fontSize: 'sm', leading: 'leading5', tracking: 'trackingNormal' }),
      extraBold: makeTextStyle({ family: 'body', weight: bodyWeights.extraBold, fontSize: 'sm', leading: 'leading5', tracking: 'trackingNormal' }),
      black: makeTextStyle({ family: 'body', weight: bodyWeights.black, fontSize: 'sm', leading: 'leading5', tracking: 'trackingNormal' }),
    },
    xs: {
      light: makeTextStyle({ family: 'body', weight: bodyWeights.light, fontSize: 'xs', leading: 'leading4', tracking: 'trackingNormal' }),
      normal: makeTextStyle({ family: 'body', weight: bodyWeights.normal, fontSize: 'xs', leading: 'leading4', tracking: 'trackingNormal' }),
      medium: makeTextStyle({ family: 'body', weight: bodyWeights.medium, fontSize: 'xs', leading: 'leading4', tracking: 'trackingNormal' }),
      semiBold: makeTextStyle({ family: 'body', weight: bodyWeights.semiBold, fontSize: 'xs', leading: 'leading4', tracking: 'trackingNormal' }),
      bold: makeTextStyle({ family: 'body', weight: bodyWeights.bold, fontSize: 'xs', leading: 'leading4', tracking: 'trackingNormal' }),
      extraBold: makeTextStyle({ family: 'body', weight: bodyWeights.extraBold, fontSize: 'xs', leading: 'leading4', tracking: 'trackingNormal' }),
      black: makeTextStyle({ family: 'body', weight: bodyWeights.black, fontSize: 'xs', leading: 'leading4', tracking: 'trackingNormal' }),
    },
  },
} as const;
