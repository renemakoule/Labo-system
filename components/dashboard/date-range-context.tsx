"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { subDays, startOfMonth, endOfMonth, subMonths, startOfQuarter, endOfQuarter, subQuarters } from "date-fns"

type DateRange = {
  from: Date
  to: Date
}

// Le type a été mis à jour pour utiliser une clé de traduction
export type PresetRange = {
  labelKey: string;
  range: DateRange;
}

type DateRangeContextType = {
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
  presetRanges: PresetRange[] // Le type a été mis à jour
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined)

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  })

  // On utilise `labelKey` au lieu de `label`
  const presetRanges: PresetRange[] = [
    {
      labelKey: "today",
      range: { from: new Date(), to: new Date() },
    },
    {
      labelKey: "thisWeek",
      range: { from: subDays(new Date(), 7), to: new Date() },
    },
    {
      labelKey: "thisMonth",
      range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) },
    },
    {
      labelKey: "lastMonth",
      range: { from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) },
    },
    {
      labelKey: "lastQuarter",
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