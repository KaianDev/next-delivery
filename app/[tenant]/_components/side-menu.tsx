"use client"

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
import { useAuthContext } from "@/contexts/auth"
import { useState } from "react"

interface SideMenuProps {
  tenantSlug: string
}

export const SideMenu = ({ tenantSlug }: SideMenuProps) => {
  const {
    auth: { user },
    logout,
  } = useAuthContext()

  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu className="text-tenant-primary" size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col">
        <div className="relative ml-6 max-w-[230px] border-b border-tenant-primary pb-12 pt-8">
          {!user && (
            <Link href={`/${tenantSlug}/login`}>
              <CustomButton>Fazer Login</CustomButton>
            </Link>
          )}
          {user && (
            <div className="flex flex-col">
              <strong className="text-2xl">{user.name}</strong>
              <small className="text-muted-foreground">
                Último pedido há (X) semanas
              </small>
            </div>
          )}
        </div>

        <Line className="-mt-[17px]" />
        <div className="mt-6 flex flex-1 flex-col gap-4  pl-6">
          <MenuItem label="Cardápio" isButton onClick={() => setOpen(false)}>
            <Utensils size={20} />
          </MenuItem>

          <MenuItem label="Sacola" isLink href={`/${tenantSlug}/cart`}>
            <ShoppingBag size={20} />
          </MenuItem>

          <MenuItem label="Meus Pedidos" isLink href={`/${tenantSlug}/order`}>
            <FileText size={20} />
          </MenuItem>

          <MenuItem label="Configurações" isLink href={`/${tenantSlug}`}>
            <Settings size={20} />
          </MenuItem>

          {user && (
            <div className="mt-auto w-full">
              <MenuItem label="Sair" isButton onClick={handleLogout}>
                <LogOut size={20} />
              </MenuItem>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
