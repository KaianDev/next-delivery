import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Components
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title?: string
  backHref: string
  inverter?: boolean
}

export const Header = ({ title, backHref, inverter }: HeaderProps) => {
  return (
    <header className="flex h-12 items-center">
      <Link href={backHref}>
        <Button
          size="icon"
          variant={inverter ? "default" : "ghost"}
          className={cn(
            "text-tenant-primary",
            inverter &&
              "rounded bg-black/5 text-white hover:bg-white hover:text-tenant-primary",
          )}
        >
          <ArrowLeft size={24} />
        </Button>
      </Link>
      <div className="flex-1 text-center">
        <p
          className={cn(
            inverter ? "text-white" : "text-black",
            "text-2xl font-semibold",
          )}
        >
          {title}
        </p>
      </div>
      <div className="size-9" />
    </header>
  )
}
