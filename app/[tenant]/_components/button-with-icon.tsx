import { cn } from "@/lib/utils"

interface ButtonWithIconProps {
  label: string
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  checked?: boolean
  onClick: () => void
}

export const ButtonWithIcon = ({
  label,
  rightIcon,
  leftIcon,
  checked,
  onClick,
}: ButtonWithIconProps) => {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-4 rounded border bg-zinc-300/40 p-2",
        checked && "bg-tenant-primary",
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded bg-white p-2 text-tenant-primary",
          checked && "bg-black/10 text-white",
        )}
      >
        {rightIcon}
      </div>
      <div
        className={cn(
          "flex-1 truncate text-start",
          checked ? "text-white" : "text-black",
        )}
      >
        {label}
      </div>
      <div className="text-tenant-primary">{leftIcon}</div>
    </button>
  )
}
