import "@/index.css"
import {SearchFlight} from "@/components/SearchFlight.tsx";
import React, {useState} from "react";
import {FlightList} from "@/components/FlightList.tsx";
import {FlightFilter} from "@/components/FlightFilter.tsx";

function App() {
    const [isOneWay, setIsOneWay] = React.useState<boolean>(false)
    const [date, setDate] = React.useState<Date>()
    const [departureTime, setDepartureTime] = useState([0, 48]);
    const [returnTime, setReturnTime] = useState([0, 48]);

    const [duration, setDuration] = useState([1.5, 11.5])


    return (
        <section className="max-w-[1440px] mx-auto items-center justify-center">
            <SearchFlight date={date} setDate={setDate} isOneWay={isOneWay} setIsOneWay={setIsOneWay}/>
            <div className="flex justify-center mt-10">
                <FlightFilter setReturnTime={setReturnTime} returnTime={returnTime} duration={duration} setDuration={setDuration} departureTime={departureTime}
                              setDepartureTime={setDepartureTime} isOneWay={isOneWay}/>
                <FlightList/>
            </div>
        </section>
    )
}

export default App
