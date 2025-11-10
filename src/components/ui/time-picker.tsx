import * as React from "react"
import { cn } from "./utils"

interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [hours, setHours] = React.useState(value ? value.split(':')[0] : '10')
  const [minutes, setMinutes] = React.useState(value ? value.split(':')[1] : '00')
  const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM')

  React.useEffect(() => {
    const timeString = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
    onChange?.(timeString)
  }, [hours, minutes, period, onChange])

  const hourRef = React.useRef<HTMLDivElement>(null)
  const minuteRef = React.useRef<HTMLDivElement>(null)

  const scrollToHour = (hour: string) => {
    setHours(hour)
  }

  const scrollToMinute = (minute: string) => {
    setMinutes(minute)
  }

  return (
    <div className={cn("flex items-center justify-center gap-2 p-4", className)}>
      {/* Hours */}
      <div className="flex flex-col items-center">
        <label className="text-xs text-gray-500 mb-2">Hour</label>
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-12 border-y-2 border-green-500 bg-green-50/50 rounded-lg"></div>
          </div>
          <div ref={hourRef} className="h-full overflow-y-auto scrollbar-hide py-14">
            {Array.from({ length: 12 }, (_, i) => {
              const hour = (i + 1).toString()
              return (
                <button
                  key={hour}
                  onClick={() => scrollToHour(hour)}
                  className={cn(
                    "w-full py-2 text-center transition-all",
                    hours === hour ? "text-lg text-green-600" : "text-gray-400"
                  )}
                >
                  {hour.padStart(2, '0')}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <span className="text-2xl mt-8">:</span>

      {/* Minutes */}
      <div className="flex flex-col items-center">
        <label className="text-xs text-gray-500 mb-2">Minute</label>
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-12 border-y-2 border-green-500 bg-green-50/50 rounded-lg"></div>
          </div>
          <div ref={minuteRef} className="h-full overflow-y-auto scrollbar-hide py-14">
            {Array.from({ length: 12 }, (_, i) => {
              const minute = (i * 5).toString()
              return (
                <button
                  key={minute}
                  onClick={() => scrollToMinute(minute)}
                  className={cn(
                    "w-full py-2 text-center transition-all",
                    minutes === minute ? "text-lg text-green-600" : "text-gray-400"
                  )}
                >
                  {minute.padStart(2, '0')}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* AM/PM */}
      <div className="flex flex-col items-center">
        <label className="text-xs text-gray-500 mb-2">Period</label>
        <div className="flex flex-col gap-2 mt-14">
          <button
            onClick={() => setPeriod('AM')}
            className={cn(
              "px-4 py-2 rounded-lg transition-all",
              period === 'AM' 
                ? "bg-green-600 text-white shadow-md" 
                : "bg-gray-100 text-gray-600"
            )}
          >
            AM
          </button>
          <button
            onClick={() => setPeriod('PM')}
            className={cn(
              "px-4 py-2 rounded-lg transition-all",
              period === 'PM' 
                ? "bg-green-600 text-white shadow-md" 
                : "bg-gray-100 text-gray-600"
            )}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  )
}
