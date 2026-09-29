// Simple line drawings (navy stroke).

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
const water = {
  fill: "none",
  stroke: "#4a7fb5",
  strokeWidth: 2,
  strokeDasharray: "6 5",
  strokeLinecap: "round",
} as const;

// Ogee gutter profiles traced from the client's profile sheet. One unit is one millimetre,
// so the industrial gutter draws larger than the domestic one.
export type OgeeSize = { width: number; bottom: number; back: number; front: number };

const X0 = 38; // back wall of the gutter
const BASE = 172; // gutter floor

function ogeePath({ width, bottom, back, front }: OgeeSize) {
  const top = BASE - front;
  const sx = X0 + bottom; // where the flat bottom meets the front
  const sy = BASE - front * 0.18; // small step up before the curve
  const ex = X0 + width - 10; // curve ends just inside the lip
  const ey = top + 8;
  const dx = ex - sx;
  const dy = sy - ey;
  return [
    `M${X0} ${BASE - back} V${BASE} H${sx} V${sy}`,
    // convex lower bulge, then the concave upper sweep of the ogee
    `C${sx + 0.55 * dx} ${sy} ${sx + 0.62 * dx} ${sy - 0.25 * dy} ${sx + 0.55 * dx} ${sy - 0.5 * dy}`,
    `C${sx + 0.48 * dx} ${sy - 0.75 * dy} ${sx + 0.55 * dx} ${ey} ${ex} ${ey}`,
    // rolled lip on the front edge
    `V${top} H${X0 + width} V${top + 9} H${X0 + width - 5}`,
  ].join(" ");
}

const dim = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  opacity: 0.6,
} as const;

/** A dimension line with arrowheads at both ends and its size in millimetres. */
function Dimension({
  x1,
  y1,
  x2,
  y2,
  mm,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  mm: number;
}) {
  const vertical = x1 === x2;
  const head = 4;
  const arrows = vertical
    ? `M${x1 - head / 2} ${y1 + head} L${x1} ${y1} L${x1 + head / 2} ${y1 + head} M${x2 - head / 2} ${y2 - head} L${x2} ${y2} L${x2 + head / 2} ${y2 - head}`
    : `M${x1 + head} ${y1 - head / 2} L${x1} ${y1} L${x1 + head} ${y1 + head / 2} M${x2 - head} ${y2 - head / 2} L${x2} ${y2} L${x2 - head} ${y2 + head / 2}`;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;
  return (
    <g>
      <path d={`M${x1} ${y1} L${x2} ${y2} ${arrows}`} {...dim} />
      <text
        x={vertical ? cx - 6 : cx}
        y={vertical ? cy : cy - 5}
        transform={vertical ? `rotate(-90 ${cx - 6} ${cy})` : undefined}
        textAnchor="middle"
        className="profile-dim"
      >
        {mm}mm
      </text>
    </g>
  );
}

export function GutterProfileDrawing({ kind, size }: { kind: string; size: OgeeSize }) {
  const top = BASE - size.front;
  const right = X0 + size.width;
  return (
    <svg
      viewBox="0 0 240 204"
      role="img"
      aria-label={`Line drawing of the ${kind} ogee gutter profile: ${size.width}mm wide, ${size.bottom}mm across the bottom, ${size.back}mm at the back and ${size.front}mm at the front`}
      className="profile-drawing"
    >
      <path d={ogeePath(size)} {...stroke} />
      <path d={`M${X0 + 6} ${BASE - size.back * 0.35} H${X0 + size.bottom + 8}`} {...water} />
      <Dimension x1={X0} y1={top - 14} x2={right} y2={top - 14} mm={size.width} />
      <Dimension x1={X0} y1={BASE + 16} x2={X0 + size.bottom} y2={BASE + 16} mm={size.bottom} />
      <Dimension x1={22} y1={BASE - size.back} x2={22} y2={BASE} mm={size.back} />
      <Dimension x1={right + 22} y1={top} x2={right + 22} y2={BASE} mm={size.front} />
    </svg>
  );
}

export function WindowGuardDrawing({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-label="Line drawing of a window fitted with slim aluminium burglar proofing bars"
      className={`guard-drawing ${className}`}
    >
      <rect x="40" y="20" width="240" height="190" {...stroke} />
      <rect x="54" y="34" width="212" height="162" {...stroke} strokeWidth={2} />
      <path d="M160 34 V196" {...stroke} strokeWidth={2} />
      {[62, 90, 118, 146, 174].map((y) => (
        <path key={y} d={`M54 ${y} H266`} {...stroke} strokeWidth={4} />
      ))}
      <path
        d="M78 52 L104 40 M190 52 L216 40"
        fill="none"
        stroke="#4a7fb5"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M24 210 H296" {...stroke} />
    </svg>
  );
}

function BoxGutterDrawing({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-label="Line drawing of a wide industrial box gutter between two roof slopes, draining into a large downpipe"
      className={`guard-drawing ${className}`}
    >
      {/* two roof slopes meeting at a box gutter */}
      <path d="M20 50 L128 112 M300 50 L192 112" {...stroke} />
      <path d="M122 104 V150 H198 V104" {...stroke} />
      {/* wide outlet and downpipe */}
      <path d="M148 150 V222 M172 150 V222" {...stroke} />
      <path d="M40 66 L116 110 M280 66 L204 110 M134 138 H186 M160 162 V210" {...water} />
      <path d="M24 222 H296" {...stroke} />
    </svg>
  );
}

function WaterTankDrawing({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-label="Line drawing of a house gutter and downpipe feeding rainwater into a water tank"
      className={`guard-drawing ${className}`}
    >
      {/* rain */}
      <path d="M70 8 L62 22 M120 6 L112 20 M170 8 L162 22" {...water} />
      {/* house with gutter along the eave */}
      <path d="M24 72 L80 32 H160 L216 72" {...stroke} />
      <rect x="24" y="72" width="192" height="12" rx="4" {...stroke} />
      <path d="M40 84 V222 M200 84 V222" {...stroke} />
      <rect x="90" y="122" width="52" height="44" {...stroke} strokeWidth={2} />
      {/* downpipe into the tank */}
      <path d="M206 84 V108 L250 128 V138" {...stroke} strokeWidth={6} />
      <path d="M212 90 V104" {...water} />
      {/* tank */}
      <ellipse cx="250" cy="142" rx="38" ry="8" {...stroke} />
      <path d="M212 142 V212 Q250 224 288 212 V142" {...stroke} />
      <path d="M212 166 Q250 178 288 166 M212 190 Q250 202 288 190" {...stroke} strokeWidth={2} />
      <path d="M16 222 H304" {...stroke} />
    </svg>
  );
}

function RepairDrawing({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-label="Line drawing of a gutter run with new support brackets, a downpipe and a wrench"
      className={`guard-drawing ${className}`}
    >
      {/* roof edge, gutter run and brackets */}
      <path d="M16 68 H304" {...stroke} />
      <rect x="24" y="74" width="272" height="24" rx="6" {...stroke} />
      <path d="M70 68 V100 M160 68 V100 M250 68 V100" {...stroke} strokeWidth={2} />
      <rect x="262" y="98" width="16" height="124" {...stroke} />
      <path d="M270 104 V214" {...water} />
      {/* wrench */}
      <g transform="translate(96 122) scale(4)">
        <path
          d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
          {...stroke}
          strokeWidth={0.75}
        />
      </g>
    </svg>
  );
}

function CleaningDrawing({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-label="Line drawing of a gutter cross-section with leaves being lifted out and water flowing freely"
      className={`guard-drawing ${className}`}
    >
      {/* roof, fascia and gutter profile */}
      <path d="M16 70 L150 132" {...stroke} />
      <rect x="150" y="118" width="10" height="100" {...stroke} />
      <path d="M160 128 V176 Q160 196 180 196 H250 Q270 196 270 176 V124" {...stroke} />
      <path d="M172 184 H258" {...water} />
      {/* leaves lifted out of the gutter */}
      <path d="M190 64 q14 -20 32 -6 q-14 20 -32 6z" {...stroke} strokeWidth={2} />
      <path d="M232 28 q14 -20 32 -6 q-14 20 -32 6z" {...stroke} strokeWidth={2} />
      <path d="M170 30 q10 -16 26 -6 q-10 16 -26 6z" {...stroke} strokeWidth={2} />
      <path d="M216 164 V96 M204 108 L216 96 L228 108" {...stroke} />
    </svg>
  );
}

const serviceDrawings = {
  "box-gutter": BoxGutterDrawing,
  "water-tank": WaterTankDrawing,
  repair: RepairDrawing,
  cleaning: CleaningDrawing,
  "window-guard": WindowGuardDrawing,
};

/** Stand-in for services without a real project photo yet. */
export function ServiceDrawing({
  kind,
  className = "",
}: {
  kind: keyof typeof serviceDrawings;
  className?: string;
}) {
  const Drawing = serviceDrawings[kind];
  return <Drawing className={className} />;
}
