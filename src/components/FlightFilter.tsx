import {Slider} from "@/components/ui/slider.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useEffect} from "react";
import {convertValueToTime} from "@/lib/ConvertValueToTime.ts";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button.tsx";

import {convertValueToDuration} from "@/lib/ConvertValueToTime.ts";
import {useFlightContext} from "@/FlightContext.tsx";
import {FilterSidebar} from "@/components/FilterSidebar.tsx";


export const FlightFilter = () => {
    const {
        isOneWay,
        departureRealTime,
        setDepartureRealTime,
        durationRealTime,
        setDurationRealTime,
        returnRealTime,
        setReturnRealTime,
        setDuration,
        setReturnTime,
        setDeparture,
        setSortValue
    } = useFlightContext()


    const handleDepartureChange = (newValues: number[]) => {
        setDepartureRealTime(newValues);
    };

    const handleArrivalChange = (newValues: number[]) => {
        setReturnRealTime(newValues);
    }

    const handleRealTimeDurationChange = (newValues: number[]) => {
        setDurationRealTime(newValues);
    };
    const handleDurationChange = (newValues: number[]) => {
        const newDuration = [convertValueToDuration(newValues[0]), convertValueToDuration(newValues[1])];
        setDuration(newDuration);
    }

    const handleDepartureTimeChange = (newValues: number[]) => {
        const newValue = [convertValueToTime(newValues[0]), convertValueToTime(newValues[1])];
        // my head hurts I can't deal with this
        //@ts-ignore
        setDeparture(newValue);
    }


    // if I don't do this on the initial load the flights are empty because they are not converted yet
    useEffect(() => {
        const newDuration = [
            convertValueToDuration(durationRealTime[0]),
            convertValueToDuration(durationRealTime[1]),
        ];

        const newValue = [convertValueToTime(departureRealTime[0]), convertValueToTime(departureRealTime[1])];
        //@ts-ignore
        setDeparture(newValue);
        setDuration(newDuration);
    }, []);

    return (<>
        {/* this is mobile filter*/}
        <FilterSidebar/>
        {/* this is desktop filter*/}
        <aside className="w-[22%] sm:hidden">
            <Select onValueChange={setSortValue}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By"/>
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectItem className="hover:bg-gray-200" value="cheapest">Cheapest first</SelectItem>
                    <SelectItem className="hover:bg-gray-200" value="fastest">Fastest first</SelectItem>
                </SelectContent>
            </Select>

            <div className="mt-8">
                <h3 className="font-bold mb-4 text-xl">Departure Times</h3>
                <h5 className="font-bold">Outbound</h5>
                <p className="text-xs">{convertValueToTime(departureRealTime[0])} - {convertValueToTime(departureRealTime[1])}</p>
                <Slider
                    defaultValue={departureRealTime}
                    min={0}
                    max={48}
                    step={1}
                    onValueChange={handleDepartureChange}
                    onValueCommit={handleDepartureTimeChange}
                    minStepsBetweenThumbs={1}
                    className="w-[250px] h-10"
                />
                {!isOneWay && <><h5 className="font-bold">Return</h5><span
                    className="text-xs">{convertValueToTime(returnRealTime[0])} - {convertValueToTime(returnRealTime[1])}</span>
                    <Slider
                        defaultValue={returnRealTime}
                        min={0}
                        max={48}
                        step={1}
                        onValueChange={handleArrivalChange}
                        onValueCommit={setReturnTime}
                        minStepsBetweenThumbs={1}
                        className="w-[250px] h-10"/></>}
            </div>
            <div className="mt-10">
                <h3 className="font-bold mb-1 text-xl">Flight Duration</h3>
                <span className="text-xs">{durationRealTime[0]} hours - {durationRealTime[1]} hours</span>
                <Slider
                    defaultValue={durationRealTime}
                    min={1.5}
                    max={11.5}
                    step={0.5}
                    onValueChange={handleRealTimeDurationChange}
                    onValueCommit={handleDurationChange}
                    className="w-[250px] h-10"
                />
            </div>
            <Dialog>
                <DialogTrigger asChild><Button className="hover:bg-black hover:text-white border mt-10">Click for flight
                    dates</Button></DialogTrigger>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Try these departure dates for filtering</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col justify-center items-center">
                        <h5>2023-08-20</h5>
                        <h5>2023-08-22</h5>
                        <h5>2023-08-25</h5>
                        <h5>2023-08-21</h5>
                        <h5>2023-08-26</h5>
                        <h5>2023-08-29</h5>
                        <h5>2023-09-02</h5>
                        <h5>2023-09-05</h5>
                        <h5>2023-09-11</h5>
                        <h5>2023-09-14</h5>
                    </div>
                </DialogContent>
            </Dialog>
        </aside>
    </>);
};
