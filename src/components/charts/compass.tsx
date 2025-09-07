import React from "react";

interface CompassProps {
  angle: number; // Angle in degrees (0 = North, 90 = East, 180 = South, 270 = West)
  size?: number; // Size of the compass in pixels
}

export const Compass: React.FC<CompassProps> = ({ angle, size = 100 }) => {
  const radius = size / 2;
  const borderWidth = 4;
  const innerRadius = radius - borderWidth;

  // Convert angle to radians and adjust so 0 degrees points North
  const angleInRadians = ((angle - 90) * Math.PI) / 180;

  // Arrow dimensions
  const arrowLength = innerRadius * 0.7;
  const arrowWidth = innerRadius * 0.25;

  // Calculate the center point
  const centerX = radius;
  const centerY = radius;

  // Calculate arrow tip (red end pointing in the direction)
  const tipX = centerX + Math.cos(angleInRadians) * arrowLength * 0.5;
  const tipY = centerY + Math.sin(angleInRadians) * arrowLength * 0.5;

  // Calculate arrow tail (white end pointing opposite)
  const tailX = centerX - Math.cos(angleInRadians) * arrowLength * 0.5;
  const tailY = centerY - Math.sin(angleInRadians) * arrowLength * 0.5;

  // Calculate side points for the arrow body
  const sideOffset = arrowWidth * 0.5;
  const perpAngle1 = angleInRadians + Math.PI / 2;
  const perpAngle2 = angleInRadians - Math.PI / 2;

  // Points for the red (front) part of the arrow
  const redSide1X = centerX + Math.cos(perpAngle1) * sideOffset * 0.5;
  const redSide1Y = centerY + Math.sin(perpAngle1) * sideOffset * 0.5;
  const redSide2X = centerX + Math.cos(perpAngle2) * sideOffset * 0.5;
  const redSide2Y = centerY + Math.sin(perpAngle2) * sideOffset * 0.5;

  // Points for the white (back) part of the arrow
  const whiteSide1X = centerX + Math.cos(perpAngle1) * sideOffset * 0.5;
  const whiteSide1Y = centerY + Math.sin(perpAngle1) * sideOffset * 0.5;
  const whiteSide2X = centerX + Math.cos(perpAngle2) * sideOffset * 0.5;
  const whiteSide2Y = centerY + Math.sin(perpAngle2) * sideOffset * 0.5;

  // Direction label positions
  const labelOffset = 16;

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Outer circle border */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - borderWidth / 2}
          fill="none"
          stroke="var(--border)"
          strokeWidth={borderWidth}
          opacity={0.3}
        />

        {/* Inner background circle */}
        <circle cx={radius} cy={radius} r={innerRadius} fill="var(--card)" />

        {/* White (tail) part of arrow */}
        <polygon
          points={`${tailX},${tailY} ${whiteSide1X},${whiteSide1Y} ${centerX},${centerY} ${whiteSide2X},${whiteSide2Y}`}
          fill="white"
          stroke="var(--muted-foreground)"
          strokeWidth="1"
        />

        {/* Red (tip) part of arrow */}
        <polygon
          points={`${tipX},${tipY} ${redSide1X},${redSide1Y} ${centerX},${centerY} ${redSide2X},${redSide2Y}`}
          fill="var(--destructive-foreground)"
          stroke="var(--muted-foreground)"
          strokeWidth="1"
        />

        {/* Direction labels */}
        <g className="font-mono text-xs" fill="var(--muted-foreground)">
          <text
            x={radius}
            y={labelOffset + 5}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            N
          </text>
          <text
            x={size - labelOffset}
            y={radius + 4}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            E
          </text>
          <text
            x={radius}
            y={size - labelOffset + 4}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            S
          </text>
          <text
            x={labelOffset}
            y={radius + 4}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            W
          </text>
        </g>
      </svg>
    </div>
  );
};
