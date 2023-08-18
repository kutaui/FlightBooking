import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React from "react";


type DatepickerProps = {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
    isOneWay?: boolean
    children: React.ReactNode
}

export function DatePicker({date, setDate, isOneWay, children}: DatepickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={isOneWay}
                    variant={"outline"}
                    className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {date ? format(date, "PPP") : <span>{children}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
