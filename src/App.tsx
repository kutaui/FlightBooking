import "@/index.css"
import {SearchFlight} from "@/components/SearchFlight.tsx";
import {FlightList} from "@/components/FlightList.tsx";
import {FlightFilter} from "@/components/FlightFilter.tsx";

function App() {


    return (
        <section className="max-w-[1440px] mx-auto items-center justify-center">
            <SearchFlight />
            <div className="flex justify-center mt-10 sm:block">
                <FlightFilter/>
                <FlightList/>
            </div>
        </section>
    )
}

export default App
