interface AssetIconProps {
  color?: string
  size?: number
}

export function AssetIcon({ color = '#2188FF', size = 22 }: AssetIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.302.612l-.051.001a.84.84 0 00-.362.112l-8.655 4.8a.786.786 0 00-.293.28.746.746 0 00-.108.386v9.619c0 .14.04.276.115.395.074.12.18.218.309.284l8.651 4.797.049.025v.002c.024.011.05.021.075.03l.01.003c.026.009.051.016.077.022.01 0 .01.002.015.003a.894.894 0 00.172.018.866.866 0 00.172-.018c.009 0 .01-.002.014-.003a.886.886 0 00.077-.022l.01-.003a.805.805 0 00.076-.03v-.002a.968.968 0 00.048-.025l8.652-4.797a.787.787 0 00.31-.284.746.746 0 00.113-.395V6.22 6.19a.745.745 0 00-.282-.585l-.026-.021c0-.002-.009-.004-.009-.006a.826.826 0 00-.096-.061L11.714.72a.825.825 0 00-.42-.11h.007zm.009 1.95a.39.39 0 01.188.048l5.892 3.267a.355.355 0 010 .628L11.5 9.772a.389.389 0 01-.377 0L5.23 6.505a.355.355 0 010-.628l5.892-3.267a.39.39 0 01.189-.048zm-7.283 5.59c.068 0 .135.017.194.05l5.88 3.26a.368.368 0 01.138.133.35.35 0 01.05.18v6.522c0 .278-.313.451-.564.312l-5.88-3.26a.369.369 0 01-.138-.133.35.35 0 01-.05-.18V8.514a.37.37 0 01.37-.361zm14.566 0a.37.37 0 01.37.362v6.522a.36.36 0 01-.188.312l-5.88 3.261c-.251.14-.565-.034-.565-.313v-6.52a.36.36 0 01.188-.314l5.88-3.26a.386.386 0 01.195-.05z"
        fill={color}
      />
    </svg>
  )
}