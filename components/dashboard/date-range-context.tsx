"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { subDays, startOfMonth, endOfMonth, subMonths, startOfQuarter, endOfQuarter, subQuarters } from "date-fns"

type DateRange = {
  from: Date
  to: Date
}

type DateRangeContextType = {
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
  presetRanges: { label: string; range: DateRange }[]
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined)

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  })

  const presetRanges = [
    {
      label: "Aujourd'hui",
      range: { from: new Date(), to: new Date() },
    },
    {
      label: "Cette Semaine",
      range: { from: subDays(new Date(), 7), to: new Date() },
    },
    {
      label: "Ce Mois",
      range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) },
    },
    {
      label: "Mois Dernier",
      range: { from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) },
    },
    {
      label: "Dernier Trimestre",
      range: { from: startOfQuarter(subQuarters(new Date(), 1)), to: endOfQuarter(subQuarters(new Date(), 1)) },
    },
  ]

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange, presetRanges }}>{children}</DateRangeContext.Provider>
  )
}

export function useDateRange() {
  const context = useContext(DateRangeContext)
  if (!context) {
    throw new Error("useDateRange must be used within DateRangeProvider")
  }
  return context
}
