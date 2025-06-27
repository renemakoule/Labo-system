"use client"

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDateRange } from "./date-range-context"
import { useState } from "react"

export function DateRangeFilter() {
  const { dateRange, setDateRange, presetRanges } = useDateRange()
  const [isOpen, setIsOpen] = useState(false)

  const handlePresetSelect = (preset: string) => {
    const range = presetRanges.find((p) => p.label === preset)
    if (range) {
      setDateRange(range.range)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={handlePresetSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Période prédéfinie" />
        </SelectTrigger>
        <SelectContent>
          {presetRanges.map((preset) => (
            <SelectItem key={preset.label} value={preset.label}>
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd MMM yyyy", { locale: fr })} -{" "}
                  {format(dateRange.to, "dd MMM yyyy", { locale: fr })}
                </>
              ) : (
                format(dateRange.from, "dd MMM yyyy", { locale: fr })
              )
            ) : (
              <span>Sélectionner une période</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                setDateRange({ from: range.from, to: range.to })
                setIsOpen(false)
              }
            }}
            numberOfMonths={2}
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
