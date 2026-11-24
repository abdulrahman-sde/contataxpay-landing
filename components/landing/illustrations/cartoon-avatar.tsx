/** Flat cartoon person for the illustrations (drawn here, no external images). */
export type AvatarLook = {
  bg: string
  skin: string
  hair: string
  shirt: string
  style: "short" | "long" | "bun" | "curly" | "beard" | "side"
}

export const avatarLooks: AvatarLook[] = [
  { bg: "#dbeafe", skin: "#f2c9a5", hair: "#2b2118", shirt: "#3563e9", style: "short" },
  { bg: "#dcfce7", skin: "#8d5a3b", hair: "#1c1410", shirt: "#10b981", style: "curly" },
  { bg: "#fef3c7", skin: "#f6d3b8", hair: "#b45309", shirt: "#f59e0b", style: "long" },
  { bg: "#ede9fe", skin: "#c68863", hair: "#3b2a20", shirt: "#7c3aed", style: "beard" },
  { bg: "#ffe4e6", skin: "#f1c4a0", hair: "#111827", shirt: "#e11d48", style: "bun" },
  { bg: "#e0e7ff", skin: "#a86b47", hair: "#4b2e1e", shirt: "#4f46e5", style: "side" },
]

export function CartoonAvatar({ look, className }: { look: AvatarLook; className?: string }) {
  const { bg, skin, hair, shirt, style } = look
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill={bg} />
      {/* long hair falls behind the shoulders */}
      {style === "long" && <path d="M17 30c0-11 7-18 15-18s15 7 15 18v18H17z" fill={hair} />}
      {/* shoulders + neck */}
      <path d="M10 64c1-11 10-17 22-17s21 6 22 17z" fill={shirt} />
      <path d="M27 41h10v8c0 3-10 3-10 0z" fill={skin} />
      <path d="M26 49l6 6 6-6" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinejoin="round" />
      {/* head */}
      <ellipse cx="32" cy="30" rx="11" ry="12.5" fill={skin} />
      <ellipse cx="20.8" cy="31" rx="2" ry="2.8" fill={skin} />
      <ellipse cx="43.2" cy="31" rx="2" ry="2.8" fill={skin} />
      {/* face */}
      <circle cx="28" cy="30" r="1.3" fill="#1f2937" />
      <circle cx="36" cy="30" r="1.3" fill="#1f2937" />
      <path d="M28.5 35.5c2 1.8 5 1.8 7 0" fill="none" stroke="#1f2937" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="25.5" cy="33.5" r="1.6" fill="#f87171" opacity=".25" />
      <circle cx="38.5" cy="33.5" r="1.6" fill="#f87171" opacity=".25" />
      {/* hair */}
      {style === "short" && <path d="M20.5 28c-1-9 5-14 11.5-14s13 4 11.5 14c-2-5-6-7-11.5-7S22.5 23 20.5 28z" fill={hair} />}
      {style === "side" && <path d="M20.5 29c-1.5-10 5-15 12-15 6 0 12 4 11 13-3-1-7-4-9-8-3 5-9 8-14 10z" fill={hair} />}
      {style === "long" && <path d="M20 30c0-10 5-15.5 12-15.5S44 20 44 30c-4-1-8-5-10-9-3 5-8 8-14 9z" fill={hair} />}
      {style === "bun" && (
        <>
          <circle cx="32" cy="12.5" r="5" fill={hair} />
          <path d="M20.5 28c-.5-9 5-13.5 11.5-13.5S44 19 43.5 28c-2.5-4-6.5-6.5-11.5-6.5s-9 2.5-11.5 6.5z" fill={hair} />
        </>
      )}
      {style === "curly" && (
        <g fill={hair}>
          {[
            [22, 22], [26, 17.5], [32, 16], [38, 17.5], [42, 22], [21, 27], [43, 27],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4.6" />
          ))}
        </g>
      )}
      {style === "beard" && (
        <>
          <path d="M21 27c-.5-8 5-12.5 11-12.5S43.5 19 43 27c-2.5-3.5-6.5-5-11-5s-8.5 1.5-11 5z" fill={hair} />
          <path d="M21.5 31c0 8 4.5 12.5 10.5 12.5S42.5 39 42.5 31c-1.5 3-3 4-5 4.3-1.2-1.2-3-1.8-5.5-1.8s-4.3.6-5.5 1.8c-2-.3-3.5-1.3-5-4.3z" fill={hair} />
          <path d="M29 36.6c1.8 1 4.2 1 6 0" fill="none" stroke={skin} strokeWidth="1.4" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}
