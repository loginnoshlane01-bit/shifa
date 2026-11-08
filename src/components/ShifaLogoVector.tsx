import React from 'react';
import { BRAND_COLORS, LockupVariant, CanvasTheme, NeedleStyle } from '../types/logo';

interface ShifaLogoVectorProps {
  id?: string;
  variant?: LockupVariant;
  theme?: CanvasTheme;
  needleStyle?: NeedleStyle;
  showGuides?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const ShifaLogoVector: React.FC<ShifaLogoVectorProps> = ({
  id = 'shifa-logo-svg',
  variant = 'vertical',
  theme = 'ivory',
  needleStyle = 'couture-arc',
  showGuides = false,
  className = '',
  width = '100%',
  height = '100%',
}) => {
  // Palette resolution according to theme
  const isEmeraldTheme = theme === 'inverted';
  
  // Strict brand palette: emerald, gold, ivory only
  const bgColor = isEmeraldTheme 
    ? BRAND_COLORS.emerald 
    : theme === 'transparent' 
      ? 'none' 
      : BRAND_COLORS.ivory;
      
  const badgeBg = isEmeraldTheme ? BRAND_COLORS.gold : BRAND_COLORS.emerald;
  const badgeRingColor = isEmeraldTheme ? BRAND_COLORS.emerald : BRAND_COLORS.gold;
  const leafColor = isEmeraldTheme ? BRAND_COLORS.emerald : BRAND_COLORS.gold;
  const needleColor = isEmeraldTheme ? BRAND_COLORS.emerald : BRAND_COLORS.gold;
  const threadColor = isEmeraldTheme ? BRAND_COLORS.emerald : BRAND_COLORS.gold;
  const shifaTextColor = isEmeraldTheme ? BRAND_COLORS.ivory : BRAND_COLORS.emerald;
  const lineGoldColor = BRAND_COLORS.gold;
  const clothingTextColor = isEmeraldTheme ? BRAND_COLORS.gold : BRAND_COLORS.gold;

  // Render Emblem Graphics (Badge + Leaf + Needle & Thread)
  const renderEmblem = (cx: number, cy: number, scale = 1) => {
    return (
      <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
        {/* Outer Circular Badge */}
        <circle
          cx="0"
          cy="0"
          r="150"
          fill={badgeBg}
        />

        {/* Thin Gold Inner Ring */}
        <circle
          cx="0"
          cy="0"
          r="136"
          fill="none"
          stroke={badgeRingColor}
          strokeWidth="2.5"
        />

        {/* Stylized Gold Leaf (Symbol of Healing & Purity - Shifa) */}
        <g id="stylized-leaf">
          {/* Left Leaf Half with architectural vein incisions */}
          <path
            d="M 0 -82
               C -24 -60, -46 -24, -46 10
               C -46 36, -26 56, 0 68
               L 0 -82 Z"
            fill={leafColor}
          />
          {/* Right Leaf Half with architectural vein incisions */}
          <path
            d="M 0 -82
               C 24 -60, 46 -24, 46 10
               C 46 36, 26 56, 0 68
               L 0 -82 Z"
            fill={leafColor}
          />

          {/* Symmetrical Negative Space Midrib / Spine */}
          <line
            x1="0"
            y1="-84"
            x2="0"
            y2="72"
            stroke={badgeBg}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Symmetrical Vein Slits (Negative Space showing Emerald Ground) */}
          {/* Pair 1 - Upper */}
          <line x1="-1" y1="-26" x2="-30" y2="-44" stroke={badgeBg} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="1" y1="-26" x2="30" y2="-44" stroke={badgeBg} strokeWidth="2.2" strokeLinecap="round" />
          {/* Pair 2 - Mid */}
          <line x1="-1" y1="-2" x2="-38" y2="-12" stroke={badgeBg} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="1" y1="-2" x2="38" y2="-12" stroke={badgeBg} strokeWidth="2.2" strokeLinecap="round" />
          {/* Pair 3 - Lower */}
          <line x1="-1" y1="24" x2="-36" y2="22" stroke={badgeBg} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="1" y1="24" x2="36" y2="22" stroke={badgeBg} strokeWidth="2.2" strokeLinecap="round" />

          {/* Leaf Stem */}
          <path
            d="M -1.8 68 L -1.8 80 C -1.8 82, 1.8 82, 1.8 80 L 1.8 68 Z"
            fill={leafColor}
          />
        </g>

        {/* Subtle Needle-and-Thread Curve beneath Leaf */}
        {needleStyle === 'couture-arc' && (
          <g id="needle-thread-couture">
            {/* Thread Arc looping through needle eye */}
            <path
              d="M -70 82 
                 C -58 72, -48 78, -44 87 
                 C -40 96, -48 106, -30 108 
                 C -5 110, 20 110, 48 98 
                 C 64 92, 74 95, 82 102"
              fill="none"
              stroke={threadColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Curved Golden Couture Tailoring Needle */}
            <path
              d="M -52 86 
                 C -18 97, 24 96, 58 84"
              fill="none"
              stroke={needleColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Needle Sharp Tip */}
            <polygon
              points="56,82 62,83 58,86"
              fill={needleColor}
            />
            {/* Needle Eyelet (Negative Space Slit) */}
            <ellipse
              cx="-46"
              cy="88"
              rx="3"
              ry="1.4"
              transform="rotate(18 -46 88)"
              fill={badgeBg}
            />
          </g>
        )}

        {needleStyle === 'tailor-loop' && (
          <g id="needle-thread-tailor">
            {/* Continuous Thread Loop cradling beneath */}
            <path
              d="M -68 88 
                 C -50 74, -40 82, -38 90 
                 C -34 105, -15 112, 0 112 
                 C 20 112, 42 104, 60 92 
                 C 70 85, 78 88, 84 94"
              fill="none"
              stroke={threadColor}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Precision Horizontal Tailor Needle */}
            <path
              d="M -50 90 L 52 90"
              stroke={needleColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Needle Point */}
            <polygon
              points="50,88 56,90 50,92"
              fill={needleColor}
            />
            {/* Needle Eyelet */}
            <ellipse
              cx="-42"
              cy="90"
              rx="3.2"
              ry="1.2"
              fill={badgeBg}
            />
          </g>
        )}

        {needleStyle === 'symmetrical' && (
          <g id="needle-thread-symmetrical">
            {/* Symmetrical Dual-wing Thread Curve */}
            <path
              d="M -68 86 
                 C -44 104, -20 108, 0 108 
                 C 20 108, 44 104, 68 86"
              fill="none"
              stroke={threadColor}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Symmetrical Poised Tailoring Needle */}
            <path
              d="M -44 92 C -15 99, 15 99, 44 92"
              fill="none"
              stroke={needleColor}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Tapered Needle Tips */}
            <polygon
              points="42,90 48,91 43,94"
              fill={needleColor}
            />
            {/* Needle Eye */}
            <ellipse
              cx="-36"
              cy="93"
              rx="2.8"
              ry="1.3"
              transform="rotate(12 -36 93)"
              fill={badgeBg}
            />
          </g>
        )}
      </g>
    );
  };

  // Render Typography (SHIFA + thin gold line + CLOTHING)
  const renderTypography = (centerX: number, shifaY: number, lineY: number, clothingY: number) => {
    return (
      <g id="brand-typography">
        {/* SHIFA Wordmark */}
        <text
          x={centerX}
          y={shifaY}
          textAnchor="middle"
          fill={shifaTextColor}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '56px',
            fontWeight: 700,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
          }}
          dx="0.17em" /* Compensate for trailing letter-spacing to ensure absolute center symmetry */
        >
          SHIFA
        </text>

        {/* Thin Gold Line Below SHIFA */}
        <line
          x1={centerX - 130}
          y1={lineY}
          x2={centerX + 130}
          y2={lineY}
          stroke={lineGoldColor}
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* CLOTHING in Smaller Spaced Gold Capitals */}
        <text
          x={centerX}
          y={clothingY}
          textAnchor="middle"
          fill={clothingTextColor}
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: '15.5px',
            fontWeight: 600,
            letterSpacing: '0.52em',
            textTransform: 'uppercase',
          }}
          dx="0.26em" /* Compensate for trailing letter-spacing */
        >
          CLOTHING
        </text>
      </g>
    );
  };

  // Render Architectural & Symmetry Guides Overlay
  const renderGuides = (cx: number, cy: number, totalW: number, totalH: number) => {
    if (!showGuides) return null;
    return (
      <g data-guides="true" opacity="0.45" stroke="#C9A24B" strokeWidth="0.8">
        {/* Vertical Symmetry Axis */}
        <line x1={cx} y1="0" x2={cx} y2={totalH} strokeDasharray="4 4" />
        {/* Horizontal Emblem Axis */}
        <line x1="0" y1={cy} x2={totalW} y2={cy} strokeDasharray="4 4" />
        {/* Emblem Geometry Circles */}
        <circle cx={cx} cy={cy} r="150" fill="none" strokeDasharray="2 3" />
        <circle cx={cx} cy={cy} r="136" fill="none" strokeDasharray="2 3" />
        <circle cx={cx} cy={cy} r="85" fill="none" stroke="#1F4D3A" strokeDasharray="2 4" />
        {/* Safe Margin Box */}
        <rect
          x="30"
          y="30"
          width={totalW - 60}
          height={totalH - 60}
          fill="none"
          stroke="#1F4D3A"
          strokeDasharray="6 6"
        />
      </g>
    );
  };

  // Variant 1: Primary Vertical Centered Lockup (Requested main presentation)
  if (variant === 'vertical') {
    const W = 800;
    const H = 840;
    const emblemX = 400;
    const emblemY = 245;
    const shifaY = 515;
    const lineY = 552;
    const clothingY = 594;

    return (
      <svg
        id={id}
        viewBox={`0 0 ${W} ${H}`}
        width={width}
        height={height}
        className={className}
        style={{ display: 'block' }}
      >
        {/* Solid Background Canvas */}
        {bgColor !== 'none' && (
          <rect width={W} height={H} fill={bgColor} />
        )}

        {/* Emblem Badge (Emerald circle, inner gold ring, gold leaf, needle-and-thread) */}
        {renderEmblem(emblemX, emblemY, 1)}

        {/* Text Lockup (SHIFA + gold line + CLOTHING) */}
        {renderTypography(emblemX, shifaY, lineY, clothingY)}

        {/* Construction Grid Guides */}
        {renderGuides(emblemX, emblemY, W, H)}
      </svg>
    );
  }

  // Variant 2: Horizontal Lockup (For navbars, letterheads, website headers)
  if (variant === 'horizontal') {
    const W = 1000;
    const H = 420;
    const emblemX = 220;
    const emblemY = 210;
    const textCenterX = 640;
    const shifaY = 195;
    const lineY = 232;
    const clothingY = 274;

    return (
      <svg
        id={id}
        viewBox={`0 0 ${W} ${H}`}
        width={width}
        height={height}
        className={className}
        style={{ display: 'block' }}
      >
        {bgColor !== 'none' && (
          <rect width={W} height={H} fill={bgColor} />
        )}

        {/* Scaled emblem */}
        {renderEmblem(emblemX, emblemY, 0.95)}

        {/* Typography */}
        {renderTypography(textCenterX, shifaY, lineY, clothingY)}

        {renderGuides(emblemX, emblemY, W, H)}
      </svg>
    );
  }

  // Variant 3: Emblem Only (For clothing tags, metal buttons, app icons, wax seals)
  if (variant === 'emblem') {
    const W = 500;
    const H = 500;
    const emblemX = 250;
    const emblemY = 250;

    return (
      <svg
        id={id}
        viewBox={`0 0 ${W} ${H}`}
        width={width}
        height={height}
        className={className}
        style={{ display: 'block' }}
      >
        {bgColor !== 'none' && (
          <rect width={W} height={H} fill={bgColor} />
        )}

        {renderEmblem(emblemX, emblemY, 1.25)}

        {renderGuides(emblemX, emblemY, W, H)}
      </svg>
    );
  }

  // Variant 4: Wordmark Only (For embroidered labels, minimalist tags)
  if (variant === 'wordmark') {
    const W = 800;
    const H = 340;
    const centerX = 400;
    const shifaY = 145;
    const lineY = 184;
    const clothingY = 228;

    return (
      <svg
        id={id}
        viewBox={`0 0 ${W} ${H}`}
        width={width}
        height={height}
        className={className}
        style={{ display: 'block' }}
      >
        {bgColor !== 'none' && (
          <rect width={W} height={H} fill={bgColor} />
        )}

        {renderTypography(centerX, shifaY, lineY, clothingY)}

        {showGuides && (
          <g data-guides="true" opacity="0.45" stroke="#C9A24B" strokeWidth="0.8">
            <line x1={centerX} y1="0" x2={centerX} y2={H} strokeDasharray="4 4" />
            <line x1="0" y1={shifaY} x2={W} y2={shifaY} strokeDasharray="4 4" />
            <line x1="0" y1={clothingY} x2={W} y2={clothingY} strokeDasharray="4 4" />
          </g>
        )}
      </svg>
    );
  }

  return null;
};
