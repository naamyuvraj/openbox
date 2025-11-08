"use client"

import { Menu, ChevronDown, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"

interface NavbarProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

export function Navbar({ onMenuClick, sidebarOpen }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-16 border-b border-border bg-background flex items-center px-6 gap-4">
      <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
        <Menu className="w-5 h-5" />
      </Button>

      {/* Logo - Bold minimalist */}
      <div className="flex items-center gap-2 font-black text-base text-foreground hidden sm:flex tracking-tight">
        <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center font-black text-sm">
          O
        </div>
        <span>OPENBOX</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="hover:bg-muted"
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </Button>

      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-foreground text-background text-sm font-bold">JD</AvatarFallback>
            </Avatar>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>John Doe</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
