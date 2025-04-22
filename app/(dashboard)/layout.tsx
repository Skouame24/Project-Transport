"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, 
  FileText, 
  ListChecks, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  // { name: "Nouveau certificat", href: "/certificats/nouveau", icon: FileText },
  { name: "Certificats", href: "/certificats", icon: ListChecks },
  { name: "Rapports", href: "/rapports", icon: BarChart3 },
  { name: "Paramètres", href: "/parametres", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête mobile */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 border-b lg:hidden nsia-gradient">
        <span className="text-white font-semibold">NSIA Assurance</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <nav className="flex flex-col h-full">
              <div className="p-4 border-b">
                <span className="font-semibold">NSIA Assurance</span>
              </div>
              <div className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                      pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    )}>
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Navigation bureau */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow nsia-gradient">
          <div className="flex items-center h-16 px-4 border-b border-white/10">
            <span className="text-white font-semibold">NSIA Assurance</span>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white",
                  pathname === item.href ? "bg-white/10" : "hover:bg-white/5"
                )}>
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <Button variant="ghost" className="w-full justify-start gap-3 text-white hover:bg-white/5">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="lg:pl-64">
        {children}
      </main>
    </div>
  )
}