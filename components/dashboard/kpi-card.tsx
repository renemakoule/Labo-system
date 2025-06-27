"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: string
  change?: {
    value: string
    type: "positive" | "negative" | "neutral"
  }
  icon?: LucideIcon
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

export function KPICard({ title, value, change, icon: Icon, onClick, className, children }: KPICardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        onClick && "cursor-pointer hover:scale-[1.02]",
        className,
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <Badge
            variant={change.type === "positive" ? "default" : change.type === "negative" ? "destructive" : "secondary"}
            className="mt-2"
          >
            {change.value}
          </Badge>
        )}
        {children}
      </CardContent>
    </Card>
  )
}
