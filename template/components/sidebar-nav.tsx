"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sections = [
  { number: 1, title: "Base Teórica" },
  { number: 2, title: "Gerador de Axiomas" },
  { number: 3, title: "Engenharia e Validação" },
  { number: 4, title: "Implementação Vampire" },
  { number: 5, title: "Considerações Finais" },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 h-screen w-64 border-l border-border bg-sidebar p-6 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-sidebar-foreground mb-2">Grafos Livres de C3</h2>
        <p className="text-sm text-sidebar-foreground/60">Projeto de Lógica Computacional</p>
      </div>

      <div className="space-y-2">
        {sections.map((section) => {
          const isActive = pathname === `/${section.number}`
          return (
            <Link
              key={section.number}
              href={`/${section.number}`}
              className={cn(
                "block px-4 py-3 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sidebar-accent text-xs font-medium">
                  {section.number}
                </span>
                <span>{section.title}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
