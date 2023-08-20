import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {DatePicker} from "@/components/ui/datepicker.tsx";
import React, {useState} from "react";
import {z} from "zod";
import {Label} from "@/components/ui/label.tsx";
import {useFlightContext} from "@/context/FlightContext.tsx";


const inputSchema = z.string().regex(/^[a-z]+$/)


export const SearchFlight = () => {
    const {
        isOneWay,
        setIsOneWay,
        setDepartureDate,
        departureDate,
        setFrom,
        setReturnDate,
        returnDate,
        setTo,
    } = useFlightContext()

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
            setToError(null);
        } else {
            try {
                inputSchema.parse(inputValue);
                setTo(inputValue);
                setToError(null);
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
        <nav className="flex w-full justify-center sm:flex-col sm:items-center">
            <div className="w-[20%] sm:w-[80%] ">
                <Label htmlFor="from">From</Label>
                <Input id="from" onChange={fromHandler} placeholder="Istanbul" className="placeholder-gray-400 "/>
                {fromError && <p className="text-red-500 text-sm mt-1">{fromError}</p>}

                <div className="flex items-center space-x-2  ">
                    <Checkbox onCheckedChange={checkHandler} checked={isOneWay} id="oneway"
                              className="border border-black "/>
                    <label htmlFor="oneway" className="">One Way Flight</label>
                </div>
            </div>
            <div className="w-[20%] sm:w-[80%]">
                <Label htmlFor="To">To</Label>
                <Input id="to" onChange={toHandler} placeholder="Ankara" className="placeholder-gray-400 w-full"/>
                {toError && <p className="text-red-500 text-sm mt-1">{toError}</p>}
            </div>
            <div className="mt-6 sm:w-[80%] sm:items-center sm:flex ">
                <DatePicker  date={departureDate} setDate={setDepartureDate}>Departure Date</DatePicker>
                <DatePicker setDate={setReturnDate} date={returnDate} isOneWay={isOneWay}>Return Date</DatePicker>
            </div>
        </nav>
    )
}