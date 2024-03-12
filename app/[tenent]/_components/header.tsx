import { Button } from "@/components/ui/button"
import { Menu, Search } from "lucide-react"

interface HeaderProps {
  color: string
}

export const Header = ({ color }: HeaderProps) => {
  return (
    <header className="space-y-6 p-6 pb-7">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-medium">Seja Bem-Vindo👋</h1>
          <p className="text-muted-foreground">O que deseja pra hoje?</p>
        </div>
        <Button size="icon" variant="outline">
          <Menu color={color} size={24} />
        </Button>
      </div>
      <div className="group flex h-[60px] items-center justify-center gap-6 border px-4">
        <Search strokeWidth="2.5" color={color} size={24} />

        <input
          type="search"
          className="w-full border-0 text-lg outline-none"
          placeholder="Digite o nome da sua comida"
        />
      </div>
    </header>
  )
}
