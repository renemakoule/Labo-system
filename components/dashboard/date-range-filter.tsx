"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr, ar } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDateRange } from "./date-range-context"

export function DateRangeFilter() {
  const { t, locale } = useLanguage();
  const { dateRange, setDateRange, presetRanges } = useDateRange();
  const [isOpen, setIsOpen] = useState(false);

  const handlePresetSelect = (selectedLabelKey: string) => {
    const selectedPreset = presetRanges.find(p => p.labelKey === selectedLabelKey);
    if (selectedPreset) {
      setDateRange(selectedPreset.range);
    }
  }

  const dateLocale = locale === 'ar' ? ar : fr;

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={handlePresetSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t('DateRangeFilter.selectPlaceholder')} />
        </SelectTrigger>
        <SelectContent>
          {presetRanges.map((preset) => (
            <SelectItem key={preset.labelKey} value={preset.labelKey}>
              {t(`DateRangeFilter.${preset.labelKey}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[280px] justify-start text-start font-normal">
            <CalendarIcon className="me-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd MMM yyyy", { locale: dateLocale })} -{" "}
                  {format(dateRange.to, "dd MMM yyyy", { locale: dateLocale })}
                </>
              ) : (
                format(dateRange.from, "dd MMM yyyy", { locale: dateLocale })
              )
            ) : (
              <span>{t('DateRangeFilter.datePickerPlaceholder')}</span>
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
            locale={dateLocale}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}