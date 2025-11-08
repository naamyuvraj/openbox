"use client"

import { X, Home, FolderOpen, Activity, Settings, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockCollaborators } from "@/lib/mock-data"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const sidebarItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/admin", label: "Admin", icon: Users },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [showFriendsModal, setShowFriendsModal] = useState(false)
  const [friends, setFriends] = useState(mockCollaborators)
  const [newFriendName, setNewFriendName] = useState("")

  const handleAddFriend = () => {
    if (newFriendName.trim()) {
      const newFriend = {
        id: Date.now().toString(),
        name: newFriendName,
        role: "Collaborator",
        avatar: newFriendName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      }
      setFriends([...friends, newFriend])
      setNewFriendName("")
      setShowFriendsModal(false)
    }
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={onClose} />}

      <aside
        className={cn(
          "fixed md:relative w-64 h-screen border-r border-border bg-sidebar flex flex-col transition-transform duration-300 z-40",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Header with close button */}
        <div className="h-16 border-b border-sidebar-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2 font-black text-sm text-sidebar-foreground md:hidden">
            <div className="w-6 h-6 bg-sidebar-foreground text-sidebar-accent flex items-center justify-center text-xs font-black">
              O
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground font-semibold",
                  )}
                  onClick={onClose}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Friends/Collaborators Section */}
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase">Friends</p>
            <Dialog open={showFriendsModal} onOpenChange={setShowFriendsModal}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="w-6 h-6">
                  <Plus className="w-3 h-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Friend to Collaborate</DialogTitle>
                  <DialogDescription>Invite a friend to collaborate on projects</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="friend-name">Friend Name</Label>
                    <Input
                      id="friend-name"
                      placeholder="e.g., Alex Rivera"
                      value={newFriendName}
                      onChange={(e) => setNewFriendName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowFriendsModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddFriend}>Add Friend</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-1 max-h-32 overflow-y-auto">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-sidebar-primary/20 cursor-pointer transition text-xs"
              >
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="text-[0.5rem] bg-sidebar-primary text-sidebar-primary-foreground font-black">
                    {friend.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sidebar-foreground">{friend.name}</p>
                  <p className="text-sidebar-foreground/60 text-[0.7rem]">{friend.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-2">
          <Link href="/profile">
            <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </Button>
          </Link>
        </div>
      </aside>
    </>
  )
}
