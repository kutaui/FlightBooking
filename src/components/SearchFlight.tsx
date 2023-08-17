import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {DatePicker} from "@/components/ui/datepicker.tsx";
import React from "react";

type SearchFlightProps = {
    setFrom: (from: string) => void
    setTo: (to: string) => void
    isOneWay: boolean
    setIsOneWay: (isOneWay: boolean) => void
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export const SearchFlight = ({isOneWay, setIsOneWay, date, setDate, setFrom, setTo}: SearchFlightProps) => {



    const fromHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFrom(e.target.value)
    }
    const toHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTo(e.target.value)
    }


    const checkHandler = () => {
        setIsOneWay(!isOneWay)
    }

    return (
        <nav className="flex w-full justify-center">
            <div className="w-[20%]">
                <Input onChange={fromHandler} placeholder="Kalkış Havaalanı" className="placeholder-gray-600 "/>
                <div className="flex items-center space-x-2 ">
                    <Checkbox onCheckedChange={checkHandler} checked={isOneWay} id="oneway"
                              className="border border-black "/>
                    <label htmlFor="oneway" className="">Tek Yönlü Uçuş</label>
                </div>
            </div>
            <Input onChange={toHandler} placeholder="Varış Havaalanı" className="placeholder-gray-600 w-[20%]"/>
            <DatePicker date={date} setDate={setDate}>Kalkış Tarihi</DatePicker>
            <DatePicker isOneWay={isOneWay} date={date} setDate={setDate}>Varış Tarihi</DatePicker>

        </nav>
    )
}