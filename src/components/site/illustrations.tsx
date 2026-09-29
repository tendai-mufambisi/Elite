// Simple line drawings (navy stroke). Deliberately no measurements or dimension labels.

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

export function GutterProfileDrawing({ kind }: { kind: "domestic" | "industrial" }) {
  const label =
    kind === "domestic"
      ? "Line drawing of a domestic gutter profile with matching downpipe"
      : "Line drawing of a wider industrial gutter profile with a larger downpipe";
  return (
    <svg viewBox="0 0 240 190" role="img" aria-label={label} className="profile-drawing">
      {kind === "domestic" ? (
        <>
          {/* roof sheet and fascia board */}
          <path d="M12 14 L86 52" {...stroke} />
          <rect x="50" y="22" width="8" height="108" {...stroke} />
          {/* ogee-style domestic gutter */}
          <path
            d="M58 62 V118 Q58 124 64 124 H114 Q126 124 128 112 Q130 102 138 98 Q145 94 141 84 L144 68 H136"
            {...stroke}
          />
          <path d="M64 100 Q76 96 88 100 T112 100 T128 98" {...water} />
          {/* downpipe */}
          <path d="M80 124 V178 M96 124 V178" {...stroke} />
        </>
      ) : (
        <>
          <path d="M4 8 L74 50" {...stroke} />
          <rect x="30" y="16" width="8" height="128" {...stroke} />
          {/* wide box gutter with flared front */}
          <path d="M38 52 V136 Q38 142 44 142 H198 Q204 142 205 136 L214 46 H204" {...stroke} />
          <path d="M44 84 Q62 78 80 84 T116 84 T152 84 T188 84 T206 82" {...water} />
          <path d="M44 106 Q62 100 80 106 T116 106 T152 106 T188 106 T204 104" {...water} />
          {/* larger downpipe */}
          <path d="M104 142 V186 M136 142 V186" {...stroke} />
        </>
      )}
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
