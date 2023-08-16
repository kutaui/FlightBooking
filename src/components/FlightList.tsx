import flightData from "@/../data/flights.json"
import airplane from "@/assets/airplane.png"

export const FlightList = () => {
    return (
        <div className="">
            {flightData.data.map((flight, index) => (
                <div className="flex space-x-5 ml-[14.5rem] border h-48 w-[50%]" key={index}>
                    <img src={airplane} alt="Airplane Image" className="ml-10 mt-10 w-[120px] h-[100px]"/>
                    <div>
                        <h2 className="text-2xl">{flight.departure}</h2>
                        <h3>{flight.fromCode}</h3>
                    </div>
                    <div className="">
                        <p>{flight.length}</p>
                        <div className="border border-black h-0 w-20"/>
                    </div>
                    <div>
                        <h2 className="text-2xl">{flight.arrival}</h2>
                        <h3>{flight.toCode}</h3>
                    </div>
                    <p>Price: ${flight.price}</p>
                </div>
            ))}
        </div>
    )
}