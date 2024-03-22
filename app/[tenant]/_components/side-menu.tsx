import Link from "next/link"
import {
  FileText,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  Utensils,
} from "lucide-react"

// Components
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CustomButton } from "@/components/custom-button"
import { Line } from "@/components/line"
import { MenuItem } from "./menu-item"

interface SideMenuProps {
  tenantSlug: string
}

export const SideMenu = ({ tenantSlug }: SideMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu className="text-tenant-primary" size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col">
        <Link href={`/${tenantSlug}/login`}>
          <div className="relative ml-6 max-w-[230px] border-b border-tenant-primary pb-10">
            <CustomButton>Fazer Login</CustomButton>
          </div>
        </Link>
        <Line className="-mt-[17px]" />
        <div className="mt-6 flex flex-1 flex-col gap-4  pl-6">
          <MenuItem label="Cardápio" isLink href={`/${tenantSlug}`}>
            <Utensils size={20} />
          </MenuItem>

          <MenuItem label="Sacola" isLink href={`/${tenantSlug}`}>
            <ShoppingBag size={20} />
          </MenuItem>

          <MenuItem label="Meus Pedidos" isLink href={`/${tenantSlug}`}>
            <FileText size={20} />
          </MenuItem>

          <MenuItem label="Configurações" isLink href={`/${tenantSlug}`}>
            <Settings size={20} />
          </MenuItem>

          <div className="mt-auto w-full">
            <MenuItem label="Sair" isButton onClick={() => {}}>
              <LogOut size={20} />
            </MenuItem>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
