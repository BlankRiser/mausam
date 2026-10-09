export type MarkerVariant = 'square' | 'rectangle' | 'circle';
export type ResolvedTheme = 'light' | 'dark';

export interface MarkerRenderOptions {
  variant: MarkerVariant;
  label: string;
  theme: ResolvedTheme;
  isSelected: boolean;
}

export interface CachedMarkerImage {
  width: number;
  height: number;
  data: Uint8ClampedArray;
  pixelRatio: number;
}

interface MarkerShapeLayout {
  boxWidth: number;
  boxHeight: number;
  fontSize: number;
  maxTextWidth?: number;
}

interface MarkerShapeStrategy {
  getLayout: (ctx: CanvasRenderingContext2D, label: string, baseFontSize: number) => MarkerShapeLayout;
  traceHaloPath: (ctx: CanvasRenderingContext2D, logicalWidth: number, logicalHeight: number) => void;
  traceBodyPath: (
    ctx: CanvasRenderingContext2D,
    boxX: number,
    boxY: number,
    boxWidth: number,
    boxHeight: number
  ) => void;
}

const FONT_FAMILY = 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
const BASE_FONT_SIZE = 12;

const imageCache = new Map<string, CachedMarkerImage>();
let sharedCanvas: HTMLCanvasElement | null = null;
let sharedCtx: CanvasRenderingContext2D | null = null;

function getSharedContext(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null {
  if (typeof document === 'undefined') return null;
  if (!sharedCanvas) {
    sharedCanvas = document.createElement('canvas');
    sharedCtx = sharedCanvas.getContext('2d', { willReadFrequently: true });
  }
  if (!sharedCtx) return null;
  return { canvas: sharedCanvas, ctx: sharedCtx };
}

export function getHiDpiPixelRatio(): number {
  if (typeof window === 'undefined') return 2;
  return Math.max(2, Math.ceil(window.devicePixelRatio || 1));
}

export function toEvenInt(value: number): number {
  return Math.ceil(value / 2) * 2;
}

function makeFont(fontSize: number): string {
  return `600 ${fontSize}px ${FONT_FAMILY}`;
}

function computeFittedFontSize(
  ctx: CanvasRenderingContext2D,
  label: string,
  baseFontSize: number,
  maxInnerWidth: number,
  minFontSize = 8.5
): number {
  ctx.font = makeFont(baseFontSize);
  const measuredWidth = ctx.measureText(label).width;
  if (measuredWidth <= maxInnerWidth || measuredWidth === 0) {
    return baseFontSize;
  }
  const ratio = maxInnerWidth / measuredWidth;
  // Snap to 0.5px increments for clean glyph hinting
  return Math.max(minFontSize, Math.floor(baseFontSize * ratio * 2) / 2);
}

function traceRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.closePath();
}

function traceCircle(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, Math.max(1, radius), 0, Math.PI * 2);
  ctx.closePath();
}

/**
 * Pluggable shape strategies:
 * - 'square': fixed 26x26 rounded square with auto-fitted font for 3+ digit values
 * - 'rectangle': fixed 24px height, width expands dynamically based on rendered label width
 * - 'circle': fixed 28px diameter for uniform visual weight; auto-scales font to stay centered inside radius
 */
const SHAPE_STRATEGIES: Record<MarkerVariant, MarkerShapeStrategy> = {
  square: {
    getLayout: (ctx, label, baseFontSize) => {
      const size = 26;
      const maxInnerWidth = size - 6;
      const fontSize = computeFittedFontSize(ctx, label, baseFontSize, maxInnerWidth);
      return {
        boxWidth: size,
        boxHeight: size,
        fontSize,
        maxTextWidth: maxInnerWidth,
      };
    },
    traceHaloPath: (ctx, logicalWidth, logicalHeight) => {
      traceRoundedRect(ctx, 1, 1, logicalWidth - 2, logicalHeight - 2, 7);
    },
    traceBodyPath: (ctx, boxX, boxY, boxWidth, boxHeight) => {
      traceRoundedRect(ctx, boxX + 0.5, boxY + 0.5, boxWidth - 1, boxHeight - 1, 4);
    },
  },
  rectangle: {
    getLayout: (ctx, label, baseFontSize) => {
      ctx.font = makeFont(baseFontSize);
      const textWidth = Math.ceil(ctx.measureText(label).width);
      return {
        boxWidth: toEvenInt(Math.max(26, textWidth + 12)),
        boxHeight: 24,
        fontSize: baseFontSize,
      };
    },
    traceHaloPath: (ctx, logicalWidth, logicalHeight) => {
      traceRoundedRect(ctx, 1, 1, logicalWidth - 2, logicalHeight - 2, 7);
    },
    traceBodyPath: (ctx, boxX, boxY, boxWidth, boxHeight) => {
      traceRoundedRect(ctx, boxX + 0.5, boxY + 0.5, boxWidth - 1, boxHeight - 1, 4);
    },
  },
  circle: {
    getLayout: (ctx, label, baseFontSize) => {
      const diameter = 28;
      const maxInnerWidth = diameter - 6;
      const fontSize = computeFittedFontSize(ctx, label, baseFontSize, maxInnerWidth, 8);
      return {
        boxWidth: diameter,
        boxHeight: diameter,
        fontSize,
        maxTextWidth: maxInnerWidth,
      };
    },
    traceHaloPath: (ctx, logicalWidth, logicalHeight) => {
      traceCircle(ctx, logicalWidth / 2, logicalHeight / 2, logicalWidth / 2 - 1);
    },
    traceBodyPath: (ctx, boxX, boxY, boxWidth, boxHeight) => {
      traceCircle(ctx, boxX + boxWidth / 2, boxY + boxHeight / 2, boxWidth / 2 - 0.5);
    },
  },
};

export function buildMarkerIconId(opts: MarkerRenderOptions): string {
  return `marker:${opts.variant}:${opts.theme}:${opts.isSelected ? '1' : '0'}:${opts.label}`;
}

export function parseMarkerIconId(iconId: string): MarkerRenderOptions | null {
  if (!iconId.startsWith('marker:')) return null;
  const parts = iconId.split(':');
  if (parts.length < 5) return null;
  const [, variant, theme, selectedFlag, ...labelParts] = parts;
  const validVariant: MarkerVariant =
    variant === 'circle' || variant === 'rectangle' || variant === 'square' ? variant : 'square';

  return {
    variant: validVariant,
    theme: theme === 'dark' ? 'dark' : 'light',
    isSelected: selectedFlag === '1',
    label: labelParts.join(':'),
  };
}

export function renderMarkerImage(opts: MarkerRenderOptions): CachedMarkerImage | null {
  const pixelRatio = getHiDpiPixelRatio();
  const cacheKey = `${pixelRatio}:${buildMarkerIconId(opts)}`;
  const cached = imageCache.get(cacheKey);
  if (cached) return cached;

  const shared = getSharedContext();
  if (!shared) return null;
  const { canvas, ctx } = shared;

  const strategy = SHAPE_STRATEGIES[opts.variant] ?? SHAPE_STRATEGIES.square;
  const { boxWidth, boxHeight, fontSize, maxTextWidth } = strategy.getLayout(ctx, opts.label, BASE_FONT_SIZE);
  const ringPadding = opts.isSelected ? 4 : 0;

  // Even integer logical dimensions prevent 0.5px subpixel quad offsets in MapLibre's 'center' anchor
  const logicalWidth = toEvenInt(boxWidth + ringPadding * 2);
  const logicalHeight = toEvenInt(boxHeight + ringPadding * 2);

  const physicalWidth = logicalWidth * pixelRatio;
  const physicalHeight = logicalHeight * pixelRatio;

  if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
    canvas.width = physicalWidth;
    canvas.height = physicalHeight;
  } else {
    ctx.clearRect(0, 0, physicalWidth, physicalHeight);
  }

  ctx.save();
  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const isDark = opts.theme === 'dark';
  const boxX = ringPadding;
  const boxY = ringPadding;

  if (opts.isSelected) {
    strategy.traceHaloPath(ctx, logicalWidth, logicalHeight);
    ctx.fillStyle = isDark ? 'rgba(96, 165, 250, 0.25)' : 'rgba(59, 130, 246, 0.22)';
    ctx.fill();
  }

  strategy.traceBodyPath(ctx, boxX, boxY, boxWidth, boxHeight);
  if (opts.isSelected) {
    ctx.fillStyle = isDark ? 'rgba(30, 64, 175, 0.96)' : 'rgba(191, 219, 254, 0.98)';
  } else {
    ctx.fillStyle = isDark ? 'rgba(23, 37, 84, 0.88)' : 'rgba(239, 246, 255, 0.94)';
  }
  ctx.fill();

  if (opts.isSelected) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = isDark ? '#60a5fa' : '#3b82f6';
  } else {
    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? 'rgba(59, 130, 246, 0.55)' : '#93c5fd';
  }
  ctx.stroke();

  // High-definition text centered on physical pixel grid
  ctx.font = makeFont(fontSize);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = isDark ? '#eff6ff' : '#0f172a';

  const textMetrics = ctx.measureText(opts.label);
  const ascent = textMetrics.actualBoundingBoxAscent || fontSize * 0.72;
  const descent = textMetrics.actualBoundingBoxDescent || fontSize * 0.2;
  const centerX = Math.round((logicalWidth / 2) * pixelRatio) / pixelRatio;
  const centerY = Math.round((logicalHeight / 2 + (ascent - descent) / 2) * pixelRatio) / pixelRatio;

  if (maxTextWidth !== undefined) {
    ctx.fillText(opts.label, centerX, centerY, maxTextWidth);
  } else {
    ctx.fillText(opts.label, centerX, centerY);
  }
  ctx.restore();

  const imgData = ctx.getImageData(0, 0, physicalWidth, physicalHeight);
  const result: CachedMarkerImage = {
    width: physicalWidth,
    height: physicalHeight,
    data: imgData.data,
    pixelRatio,
  };

  imageCache.set(cacheKey, result);
  return result;
}
