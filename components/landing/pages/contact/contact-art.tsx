/*
 * Small coloured drawings for the contact details (44x44, same style as the hero trust badges).
 * WhatsApp is the brand logo (Simple Icons); the others are drawn here.
 */

export function PhoneArt() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <rect width="44" height="44" rx="12" fill="#ecfdf5" />
      <rect x="14" y="8.5" width="16" height="27" rx="3.5" fill="#10b981" />
      <rect x="15.8" y="12" width="12.4" height="18.5" rx="1.6" fill="#fff" />
      <rect x="18.5" y="15" width="7" height="1.6" rx=".8" fill="#a7f3d0" />
      <rect x="18.5" y="18.4" width="5" height="1.6" rx=".8" fill="#d1fae5" />
      <circle cx="22" cy="32.8" r="1.1" fill="#fff" />
      <rect x="20" y="10" width="4" height=".9" rx=".45" fill="#065f46" opacity=".5" />
    </svg>
  )
}

export function WhatsAppArt() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <rect width="44" height="44" rx="12" fill="#25D366" />
      <path
        transform="translate(10 10)"
        fill="#fff"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
  )
}

export function EmailArt() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <rect width="44" height="44" rx="12" fill="#eff6ff" />
      {/* letter peeking out */}
      <rect x="13" y="10" width="18" height="16" rx="2" fill="#fff" stroke="#bfdbfe" />
      <rect x="16" y="13.5" width="9" height="1.6" rx=".8" fill="#93c5fd" />
      <rect x="16" y="17" width="12" height="1.6" rx=".8" fill="#dbeafe" />
      {/* envelope */}
      <path d="M9 18.5 22 27l13-8.5V32a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2z" fill="#3563e9" />
      <path d="M9 32.5 19.5 25.5M35 32.5 24.5 25.5" stroke="#1d4ed8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function AddressArt() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <rect width="44" height="44" rx="12" fill="#fff1f2" />
      {/* folded map */}
      <path d="M8 15.5 16 13l12 3 8-2.5v17L28 33l-12-3-8 2.5z" fill="#fff" stroke="#fecdd3" />
      <path d="M16 13v17M28 16v17" stroke="#fecdd3" />
      <path d="M10 26c3-1 5 1 8 0s4-3 7-2 5 2 9 0" stroke="#bbf7d0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* pin */}
      <path d="M22 9a6 6 0 0 0-6 6c0 4.4 6 10.5 6 10.5S28 19.4 28 15a6 6 0 0 0-6-6z" fill="#f43f5e" />
      <circle cx="22" cy="15" r="2.3" fill="#fff" />
    </svg>
  )
}
