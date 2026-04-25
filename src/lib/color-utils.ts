/** Why use oklch instead of rgb or hex: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl */

export const sequential = {
  singleHue: {
    blue: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
    green: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
    grey: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
    orange: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
    purple: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
    red: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
  },
  multiHue: {
    'blue-green': ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
    'blue-purple': ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
    'green-blue': ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
    'orange-red': ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
    'purple-blue': ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
    'purple-blue-green': [
      '#fff7fb',
      '#ece7f2',
      '#d0d1e6',
      '#a6bddb',
      '#74a9cf',
      '#3690c0',
      '#0570b0',
      '#045a8d',
      '#023858',
    ],
    'purple-red': ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
    'red-purple': ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
    'yellow-green': ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
    'yellow-green-blue': [
      '#ffffd9',
      '#edf8b1',
      '#c7e9b4',
      '#7fcdbb',
      '#41b6c4',
      '#1d91c0',
      '#225ea8',
      '#253494',
      '#081d58',
    ],
    'yellow-orange-brown': [
      '#ffffe5',
      '#fff7bc',
      '#fee391',
      '#fec44f',
      '#fe9929',
      '#ec7014',
      '#cc4c02',
      '#993404',
      '#662506',
    ],
    'yellow-orange-red': [
      '#ffffcc',
      '#ffeda0',
      '#fed976',
      '#feb24c',
      '#fd8d3c',
      '#fc4e2a',
      '#e31a1c',
      '#bd0026',
      '#800026',
    ],
  },
};

export const diverging = {
  spectral: [
    '#9e0142',
    '#d53e4f',
    '#f46d43',
    '#fdae61',
    '#fee08b',
    '#ffffbf',
    '#e6f598',
    '#abdda4',
    '#66c2a5',
    '#3288bd',
    '#5e4fa2',
  ],
  'brown-blue-green': [
    '#543005',
    '#8c510a',
    '#bf812d',
    '#dfc27d',
    '#f6e8c3',
    '#f5f5f5',
    '#c7eae5',
    '#80cdc1',
    '#35978f',
    '#01665e',
    '#003c30',
  ],
  'pink-yellow-green': [
    '#8e0152',
    '#c51b7d',
    '#de77ae',
    '#f1b6da',
    '#fde0ef',
    '#f7f7f7',
    '#e6f5d0',
    '#b8e186',
    '#7fbc41',
    '#4d9221',
    '#276419',
  ],
  'purple-green': [
    '#40004b',
    '#762a83',
    '#9970ab',
    '#c2a5cf',
    '#e7d4e8',
    '#f7f7f7',
    '#d9f0d3',
    '#a6dba0',
    '#5aae61',
    '#1b7837',
    '#00441b',
  ],
  'purple-orange': [
    '#7f3b08',
    '#b35806',
    '#e08214',
    '#fdb863',
    '#fee0b6',
    '#f7f7f7',
    '#d8daeb',
    '#b2abd2',
    '#8073ac',
    '#542788',
    '#2d004b',
  ],
  'red-blue': [
    '#67001f',
    '#b2182b',
    '#d6604d',
    '#f4a582',
    '#fddbc7',
    '#f7f7f7',
    '#d1e5f0',
    '#92c5de',
    '#4393c3',
    '#2166ac',
    '#053061',
  ],
  'red-grey': [
    '#67001f',
    '#b2182b',
    '#d6604d',
    '#f4a582',
    '#fddbc7',
    '#ffffff',
    '#e0e0e0',
    '#bababa',
    '#878787',
    '#4d4d4d',
    '#1a1a1a',
  ],
  'red-yellow-blue': [
    '#a50026',
    '#d73027',
    '#f46d43',
    '#fdae61',
    '#fee090',
    '#ffffbf',
    '#e0f3f8',
    '#abd9e9',
    '#74add1',
    '#4575b4',
    '#313695',
  ],
  'red-yellow-green': [
    '#a50026',
    '#d73027',
    '#f46d43',
    '#fdae61',
    '#fee08b',
    '#ffffbf',
    '#d9ef8b',
    '#a6d96a',
    '#66bd63',
    '#1a9850',
    '#006837',
  ],
};

// Existing functions
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// New alpha functions
export function hexToRgba(hex: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  let cleanHex = hex.replace("#", "");

  if (cleanHex.length === 6) {
    cleanHex += "FF"; // Add full opacity if no alpha
  }

  if (cleanHex.length === 8) {
    return {
      r: Number.parseInt(cleanHex.slice(0, 2), 16),
      g: Number.parseInt(cleanHex.slice(2, 4), 16),
      b: Number.parseInt(cleanHex.slice(4, 6), 16),
      a: Number.parseInt(cleanHex.slice(6, 8), 16) / 255,
    };
  }

  return { r: 0, g: 0, b: 0, a: 1 };
}

export function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const alpha = Math.round(a * 255);
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase() +
    alpha.toString(16).padStart(2, "0").toUpperCase()
  );
}

export function rgbaToHsla(
  r: number,
  g: number,
  b: number,
  a: number
): { h: number; s: number; l: number; a: number } {
  const hsl = rgbToHsl(r, g, b);
  return { ...hsl, a };
}

export function hslaToRgba(
  h: number,
  s: number,
  l: number,
  a: number
): { r: number; g: number; b: number; a: number } {
  const rgb = hslToRgb(h, s, l);
  return { ...rgb, a };
}