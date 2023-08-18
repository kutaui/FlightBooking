import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {DatePicker} from "@/components/ui/datepicker.tsx";
import React, {useState} from "react";
import {z} from "zod";

type SearchFlightProps = {
    setFrom: (from: string) => void
    setTo: (to: string) => void
    isOneWay: boolean
    setIsOneWay: (isOneWay: boolean) => void
    setDepartureDate: (date: Date | undefined) => void
    departureDate: Date | undefined
    returnDate: Date | undefined
    setReturnDate: (date: Date | undefined) => void
}

const inputSchema = z.string().regex(/^[a-z]+$/)




export const SearchFlight = ({isOneWay, setIsOneWay, setDepartureDate, departureDate,setFrom, setTo,setReturnDate,returnDate}: SearchFlightProps) => {

    const [fromError, setFromError] = useState<string | null>(null);
    const [toError, setToError] = useState<string | null>(null);

    const fromHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            setFrom(inputValue);
            setFromError(null); // Clear error when input is empty
        } else {
            try {
                inputSchema.parse(inputValue);
                setFrom(inputValue);
                setFromError(null); // Clear any existing error
            } catch (error) {
                if (error instanceof z.ZodError) {
                    setFromError("Only letters allowed");
                }
            }
        }
    }
    const toHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            setTo(inputValue);
            setToError(null); // Clear error when input is empty
        } else {
            try {
                inputSchema.parse(inputValue);
                setTo(inputValue);
                setToError(null); // Clear any existing error
            } catch (error) {
                if (error instanceof z.ZodError) {
                    setToError("Only letters allowed");
                }
            }
        }
    }


    const checkHandler = () => {
        setIsOneWay(!isOneWay)
    }

    return (
        <nav className="flex w-full justify-center">
            <div className="w-[20%]">
                <Input onChange={fromHandler} placeholder="Departure Airport" className="placeholder-gray-600 "/>
                {fromError && <p className="text-red-500 text-sm mt-1">{fromError}</p>}

                <div className="flex items-center space-x-2 ">
                    <Checkbox onCheckedChange={checkHandler} checked={isOneWay} id="oneway"
                              className="border border-black "/>
                    <label htmlFor="oneway" className="">One Way Flight</label>
                </div>
            </div>
            <div className="w-[20%]">
            <Input onChange={toHandler} placeholder="Arrival Airport" className="placeholder-gray-600 w-full"/>
            {toError && <p className="text-red-500 text-sm mt-1">{toError}</p>}
            </div>
            <DatePicker date={departureDate} setDate={setDepartureDate}>Departure Date</DatePicker>
            <DatePicker setDate={setReturnDate} date={returnDate} isOneWay={isOneWay}>Return Date</DatePicker>

        </nav>
    )
}