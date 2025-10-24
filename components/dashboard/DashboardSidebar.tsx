"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, LinkIcon, User, Eye, LogOut, Palette, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Links", href: "/dashboard/links", icon: LinkIcon },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Design", href: "/dashboard/design", icon: Palette },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    })
    router.push("/login")
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex h-full w-64 flex-col border-r bg-card"
    >
      <div className="flex h-16 items-center justify-between border-b px-6">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold"
        >
          Dashboard
        </motion.h1>
        <ThemeToggle />
      </div>

      {user && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6 py-4 border-b"
        >
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </motion.div>
      )}

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-3 transition-all", isActive && "bg-secondary")}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      <div className="border-t p-3 space-y-1">
        <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
          <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => router.push("/profile")}>
            <Eye className="h-5 w-5" />
            Preview Page
          </Button>
        </motion.div>
        <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Log out
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
