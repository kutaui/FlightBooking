import "@/index.css"
import {SearchFlight} from "@/components/SearchFlight.tsx";
import {useState} from "react";
import {FlightList} from "@/components/FlightList.tsx";
import {FlightFilter} from "@/components/FlightFilter.tsx";

function App() {
    const [isOneWay, setIsOneWay] = useState<boolean>(false)
    const [date, setDate] = useState<Date>()
    const [departureRealTime, setDepartureRealTime] = useState([0, 48]);
    const [departure, setDeparture] = useState<number[]>([0, 48])
    const [returnRealTime, setReturnRealTime] = useState([0, 48]);
    const [returnTime, setReturnTime] = useState<number[]>([0, 48])
    const [durationRealTime, setDurationRealTime] = useState([1.5, 11.5])
    const [duration, setDuration] = useState<number[]>([1.5, 11.5])
    const [from, setFrom] = useState<string>("")
    const [to, setTo] = useState<string>("")
    const [sortValue, setSortValue] = useState<string>("")


    return (
        <section className="max-w-[1440px] mx-auto items-center justify-center">
            <SearchFlight setFrom={setFrom} setTo={setTo} date={date} setDate={setDate} isOneWay={isOneWay}
                          setIsOneWay={setIsOneWay}/>
            <div className="flex justify-center mt-10">
                <FlightFilter setSortValue={setSortValue} setReturnRealTime={setReturnRealTime}
                              returnRealTime={returnRealTime} durationRealTime={durationRealTime}
                              setDurationRealTime={setDurationRealTime} departureRealTime={departureRealTime}
                              setDepartureRealTime={setDepartureRealTime} isOneWay={isOneWay}
                              setDuration={setDuration} setReturnTime={setReturnTime} setDeparture={setDeparture}/>
                <FlightList departure={departure} returnTime={returnTime} duration={duration} sortValue={sortValue} to={to} from={from}/>
            </div>
        </section>
    )
}

export default App
