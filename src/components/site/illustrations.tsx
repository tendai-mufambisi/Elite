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
