type IconProps = {
  name: 'camera' | 'shield' | 'print' | 'users' | 'sparkle' | 'scissors' | 'palette' | 'dress'
  className?: string
}

const strokeStyle = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.7,
}

const fillStyle = {
  fill: 'currentColor',
}

export default function V2Icon({ name, className = 'h-6 w-6' }: IconProps) {
  if (name === 'camera') {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect {...strokeStyle} x="4" y="6" width="16" height="13" rx="2.5" />
        <path {...strokeStyle} d="M9 6V4.6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6" />
        <circle cx="12" cy="12.5" r="2.9" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12.5" r="1" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          {...strokeStyle}
          d="M12 3l7 3v5.5c0 4.2-2.4 8-7 9.5-4.6-1.5-7-5.3-7-9.5V6l7-3Z"
        />
        <path {...strokeStyle} d="m9 11 2.2 2.2 4.1-4.2" />
      </svg>
    )
  }

  if (name === 'print') {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path {...strokeStyle} d="M7 8H5.5A1.5 1.5 0 0 0 4 9.5v7a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 16.5v-7A1.5 1.5 0 0 0 18.5 8H17" />
        <path {...strokeStyle} d="M8 8V5.3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1V8" />
        <path {...strokeStyle} d="M8 12h8" />
        <path {...strokeStyle} d="M7 17h10" />
      </svg>
    )
  }

  if (name === 'users') {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          {...strokeStyle}
          d="M12 15.4c3.7 0 6.8 1.7 6.8 3.8v1.3H5.2v-1.3c0-2.1 3-3.8 6.8-3.8"
        />
        <circle {...strokeStyle} cx="12" cy="9" r="3" />
        <circle cx="6.2" cy="9.5" r="1.8" {...fillStyle} />
        <circle cx="17.8" cy="9.5" r="1.8" {...fillStyle} />
      </svg>
    )
  }

  if (name === 'scissors') {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <line {...strokeStyle} x1="3.5" y1="3.5" x2="20.5" y2="20.5" />
        <path {...strokeStyle} d="m16.8 12 3.2 2.7M12 12 7 16.5M7 12 12 7.5" />
        <circle cx="12" cy="12" r="4.2" {...fillStyle} />
        <circle cx="12" cy="12" r="1.4" fill="white" />
      </svg>
    )
  }

  if (name === 'palette') {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          {...strokeStyle}
          d="M3 12c0-4.5 4-7.5 8.2-7.5 2 0 3.8.5 5.1 1.5H18a3.5 3.5 0 0 1 0 7h-.6A3.8 3.8 0 1 1 10.7 7"
        />
        <circle cx="7.2" cy="8.8" r="0.9" fill="currentColor" />
        <circle cx="12.2" cy="7.2" r="0.9" fill="currentColor" />
        <circle cx="16" cy="12" r="0.9" fill="currentColor" />
        <circle cx="14.5" cy="16.3" r="0.9" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'dress') {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          {...strokeStyle}
          d="M6 7.5c0 3.4 2 5.5 6 6 4-0.5 6-2.6 6-6"
        />
        <path
          {...strokeStyle}
          d="M7.6 7.5h8.8l.9-2a1 1 0 0 0-.9-1.4H7.6a1 1 0 0 0-.9 1.4l.9 2Z"
        />
        <path {...strokeStyle} d="M10 16.8v2.8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.8" />
      </svg>
    )
  }

  if (name === 'sparkle') {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          {...strokeStyle}
          d="M12 5.2l1.4 4.2 4.4-0.2-3.5 2.4 1.4 4.2L12 14.2l-3.7 2.6 1.4-4.2-3.5-2.4 4.4 0.2L12 5.2Z"
        />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        {...strokeStyle}
        d="M12 5l6.8 3v7.4c0 3.5-2.5 6.6-6.8 8-4.3-1.4-6.8-4.5-6.8-8V8l6.8-3Z"
      />
      <path {...strokeStyle} d="M9.5 11.2 12 13.7 14.5 11.2" />
    </svg>
  )
}
