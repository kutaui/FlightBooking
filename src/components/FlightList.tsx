import flightData from "@/../data/flights.json"
import airplane from "@/assets/airplane.png"
import {Button} from "@/components/ui/button.tsx";

export const FlightList = () => {
    return (
        <div className="w-[46%]">
            {flightData.data.map((flight, index) => (
                <div className="flex space-x-5 border h-48 " key={index}>
                    <img src={airplane} alt="Airplane Image" className="ml-10 mt-10 w-[120px] h-[100px]"/>
                    <div className="mt-14 pl-12">
                        <h2 className="text-2xl">{flight.departure}</h2>
                        <h3 className="text-gray-500">{flight.fromCode}</h3>
                    </div>
                    <div className="flex flex-col items-center mt-14">
                        <p>{flight.length}</p>
                        <div className="border border-black h-0 w-20"/>
                    </div>
                    <div className="mt-14">
                        <h2 className="text-2xl">{flight.arrival}</h2>
                        <h3 className="text-gray-500">{flight.toCode}</h3>
                    </div>
                    <div className="mt-14 flex flex-col items-center pl-14">
                    <p className="text-xl font-bold mb-2">${flight.price}</p>
                        <Button className="w-[100px] border  hover:bg-black hover:text-white">Select</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}