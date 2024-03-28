"use client"

import { IconNode } from "lucide-react"
import Link from "next/link"

interface MenuItemProps {
  children: React.ReactNode
  label: string
  isButton?: boolean
  isLink?: boolean
  href?: string
  onClick?: () => void
}

export const MenuItem = ({
  children,
  label,
  isButton,
  isLink,
  href,
  onClick,
}: MenuItemProps) => {
  return (
    <div>
      {isButton && (
        <button
          onClick={onClick}
          className="flex h-10 w-full items-center gap-6 border-b border-transparent duration-300 hover:border-zinc-200"
        >
          <div className="flex size-4 items-center justify-center text-muted-foreground">
            {children}
          </div>
          <div className="text-muted-foreground">{label}</div>
        </button>
      )}
      {isLink && (
        <Link href={href as string}>
          <div className="flex h-10 items-center gap-6 border-b border-transparent duration-300 hover:border-zinc-200">
            <div className="flex size-4 items-center justify-center text-muted-foreground">
              {children}
            </div>
            <div className="text-muted-foreground">{label}</div>
          </div>
        </Link>
      )}
    </div>
  )
}
