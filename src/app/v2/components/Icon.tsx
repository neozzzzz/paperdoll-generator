type IconProps = {
  name: 'camera' | 'shield' | 'print' | 'users' | 'sparkle' | 'scissors' | 'palette' | 'dress' | 'robot'
  className?: string
}

const base = {
  fill: 'none' as const,
  stroke: 'currentColor' as const,
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export default function V2Icon({ name, className = 'h-6 w-6' }: IconProps) {
  if (name === 'camera') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <rect
          x="3.2"
          y="6"
          width="17.6"
          height="13"
          rx="3"
          {...base}
        />
        <rect x="4" y="8.3" width="16" height="6.8" rx="2.2" {...base} fill="none" />
        <circle cx="12" cy="12.3" r="3.2" {...base} />
        <circle cx="12" cy="12.3" r="1.2" fill="currentColor" />
        <path d="M6.8 9.1h2.2" {...base} />
        <path d="M8.9 9.1h1" {...base} />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 3l6.2 2.4v6.4c0 4.4-2.3 7.9-6.2 9.2-3.9-1.3-6.2-4.8-6.2-9.2V5.4Z"
          {...base}
        />
        <path d="M8.8 11.4 11.4 14l4.8-4.8" {...base} />
      </svg>
    )
  }

  if (name === 'print') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <path
          d="M6.2 8.8h11.6A1.9 1.9 0 0 1 19.7 10.7v8.4a1.9 1.9 0 0 1-1.9 1.9H6.2a1.9 1.9 0 0 1-1.9-1.9V10.7A1.9 1.9 0 0 1 6.2 8.8Z"
          {...base}
        />
        <path d="M5.8 11.2h12.4" {...base} />
        <path d="M7.5 15.6h9" {...base} />
        <path d="M5 18.7h14" {...base} />
        <path d="M6.2 8.4V6.5a1.7 1.7 0 0 1 1.7-1.7h3.3" {...base} />
      </svg>
    )
  }

  if (name === 'users') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 19.2c3.7 0 7-1.8 7-4.5v-3.2H5v3.2c0 2.7 3.3 4.5 7 4.5Z"
          {...base}
        />
        <circle cx="12" cy="9.1" r="3.2" {...base} />
        <path d="M8 10a1.7 1.7 0 0 1 3.4 0" {...base} />
        <path d="M12.6 10a1.7 1.7 0 0 1 3.4 0" {...base} />
        <path d="M6.7 18.8v-1.6" {...base} />
        <path d="M17.3 18.8v-1.6" {...base} />
      </svg>
    )
  }

  if (name === 'robot') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <rect
          x="6"
          y="5.4"
          width="12"
          height="11.5"
          rx="2.4"
          {...base}
        />
        <path d="M8.7 5.4V4.2a.9.9 0 0 1 .9-.9h4.8" {...base} />
        <path d="M8.7 16.9h6.6" {...base} />
        <circle cx="10.4" cy="10.8" r="1" {...base} />
        <circle cx="13.6" cy="10.8" r="1" {...base} />
        <circle cx="9.1" cy="8.8" r="0.3" fill="currentColor" />
        <circle cx="14.9" cy="8.8" r="0.3" fill="currentColor" />
        <circle cx="12" cy="15.3" r="0.45" fill="currentColor" />
        <path d="M9.1 12.8h0.6" {...base} />
        <path d="M14.3 12.8h0.6" {...base} />
      </svg>
    )
  }

  if (name === 'scissors') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <path
          d="M8.2 7.8a2.7 2.7 0 1 1-3.6-3.6 2.7 2.7 0 0 1 3.6 3.6Zm8.8 8.4a2.7 2.7 0 1 0-3.6 3.6 2.7 2.7 0 0 0 3.6-3.6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 12 20.3 3.7M12 12 3.7 20.3" {...base} />
        <circle cx="6.3" cy="11.3" r="1.1" fill="currentColor" />
        <circle cx="17.7" cy="12.7" r="1.1" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'palette') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <path
          d="M3.8 11.8a8.4 8.4 0 1 1 15.5 5.5H7.7a3.5 3.5 0 1 1 .2-7H14"
          {...base}
        />
        <circle cx="10.7" cy="9.2" r="1" fill="currentColor" />
        <circle cx="13" cy="8.2" r="1" fill="currentColor" />
        <circle cx="15" cy="10.5" r="1" fill="currentColor" />
        <circle cx="13.2" cy="13.2" r="1" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'dress') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <path d="M8.6 6.4h6.8l1.8 1.7 2.2 13.1H4.6L6.8 8.1 8.6 6.4Z" {...base} />
        <path d="M9.5 7.8c-.4.4 1.4-3.6 2.6-3.6h.4c1.3 0 2.7 3.8 2.6 3.6" {...base} />
        <path d="M7.3 20h9.4" {...base} />
      </svg>
    )
  }

  if (name === 'sparkle') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 3.5l1.2 4.1 4.4.4-3.4 2.5 1 4.2-3.8-2.6-3.8 2.6 1-4.2L6.4 7.8l4.4-.4z"
          {...base}
        />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M4 10.4a8 8 0 1 1 15.7 4.2"
        {...base}
      />
      <path d="M16.1 8.4 12 13.5 7 8.4" {...base} />
    </svg>
  )
}
