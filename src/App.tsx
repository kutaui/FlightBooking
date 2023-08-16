import "@/index.css"
import {SearchFlight} from "@/components/SearchFlight.tsx";
import React from "react";
import {FlightList} from "@/components/FlightList.tsx";

function App() {
    const [isOneWay, setIsOneWay] = React.useState<boolean>(false)
    const [date, setDate] = React.useState<Date>()

    return (
        <div className="max-w-[1440px] mx-auto items-center justify-center">
            <SearchFlight date={date} setDate={setDate} isOneWay={isOneWay} setIsOneWay={setIsOneWay}/>
            <FlightList/>
        </div>
    )
}

export default App
