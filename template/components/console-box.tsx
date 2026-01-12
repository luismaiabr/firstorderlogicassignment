"use client"

import type React from "react"

export function ConsoleBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-950 text-green-400 font-mono text-sm p-4 rounded-lg overflow-x-auto ${className}`}>
      <pre className="whitespace-pre-wrap">{children}</pre>
    </div>
  )
}
