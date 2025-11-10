import * as React from "react"
import { Calendar } from "./calendar"
import { cn } from "./utils"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  className?: string
}

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value)

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onChange?.(selectedDate)
  }

  return (
    <div className={cn("flex justify-center", className)}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        initialFocus
        className="rounded-lg border-0 shadow-none"
      />
    </div>
  )
}
