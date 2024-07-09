interface ComponentIconProps {
  color?: string
  size?: number
}

export function RouterIcon({
  color = '#2188FF',
  size = 22,
}: ComponentIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.833 3.5c1.25 0 2.5.5 3.5 1.417L18 4.25a5.874 5.874 0 00-4.167-1.75c-1.5 0-3 .583-4.166 1.75l.666.667c1-.917 2.25-1.417 3.5-1.417zm-2.75 2.083l.667.667c.583-.583 1.333-.833 2.083-.833.75 0 1.5.25 2.084.833l.666-.667c-.75-.75-1.75-1.166-2.75-1.166s-2 .416-2.75 1.166zm5.25 5.25h-1.666V7.5H13v3.333H4.667C3.75 10.833 3 11.583 3 12.5v3.333c0 .917.75 1.667 1.667 1.667h11.666c.917 0 1.667-.75 1.667-1.667V12.5c0-.917-.75-1.667-1.667-1.667zm0 5H4.667V12.5h11.666v3.333zM5.5 13.333h1.667V15H5.5v-1.667zm2.917 0h1.666V15H8.417v-1.667zm2.916 0H13V15h-1.667v-1.667z"
        fill={color}
      />
    </svg>
  )
}
