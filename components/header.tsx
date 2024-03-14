import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Components
import { Button } from "./ui/button"

interface HeaderProps {
  title?: string
  backHref: string
}

export const Header = ({ title, backHref }: HeaderProps) => {
  return (
    <header className="flex h-12 items-center">
      <Link href={backHref}>
        <Button size="icon" variant="ghost">
          <ArrowLeft size={24} className="text-tenant" />
        </Button>
      </Link>
      <div className="flex-1 text-center">
        <p className="text-2xl font-semibold">{title}</p>
      </div>
      <div className="size-9" />
    </header>
  )
}
