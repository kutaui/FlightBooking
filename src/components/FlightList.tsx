import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import FlightLoadingSkeleton from "@/components/FlightLoadingSkeleton.tsx";

type FlightListProps = {
    duration: number[]
    departure: number[]
    returnTime?: number[]
    from: string
    to: string
    sortValue: string
}

type Flight = {
    departure: string
    arrival: string
    from: string
    fromCode: string
    to: string
    toCode: string
    length: string
    date: string
    price: number
    company: string
}

export const FlightList = ({departure,  to, duration, from, sortValue}: FlightListProps) => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

    useEffect(() => {
        async function fetchFlights() {
            try {
                const response = await fetch("http://localhost:3000/flights");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFlights(data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        }

        fetchFlights();
    }, []);

    useEffect(() => {
        const filterFlights = () => {
            const lowerFrom = from.toLowerCase();
            const lowerTo = to.toLowerCase();
            return flights.filter((flight) => {
                const lowerFlightFrom = flight.from.toLowerCase();
                const lowerFlightTo = flight.to.toLowerCase();
                return (
                    lowerFlightFrom.includes(lowerFrom) && lowerFlightTo.includes(lowerTo)
                );
            });
        };

        const sortFlights = (flightsToSort: Flight[]) => {
            let sorted: Flight[] = [...flightsToSort];

            if (sortValue === "cheapest") {
                sorted.sort((a, b) => a.price - b.price);
            } else if (sortValue === "fastest") {
                sorted.sort((a, b) => {
                    const [hoursA, minutesA] = a.length.split("h ").map(parseFloat);
                    const [hoursB, minutesB] = b.length.split("h ").map(parseFloat);

                    const totalDurationA = hoursA * 60 + minutesA;
                    const totalDurationB = hoursB * 60 + minutesB;

                    return totalDurationA - totalDurationB;
                });
            }

            return sorted;
        };

        const filteredAndSortedFlights = sortFlights(filterFlights());
        setFilteredFlights(filteredAndSortedFlights);
    }, [flights, from, to, sortValue]);



    return (
        <div className="w-[46%]">
            {isLoading ? (
                <>
                    <FlightLoadingSkeleton/>
                    <FlightLoadingSkeleton/>
                    <FlightLoadingSkeleton/>
                </>
            ) : (
                filteredFlights.map((flight, index) => (
                    <div className="flex space-x-5 border h-48 " key={index}>
                        <img src={flight.company} alt="Airplane Image" className="ml-10 mt-10 w-[120px] h-[100px]"/>
                        <div className="mt-14 pl-12">
                            <h2 className="w-14">{flight.from}</h2>
                            <h2 className="text-2xl">{flight.departure}</h2>
                            <h3 className="text-gray-500">{flight.fromCode}</h3>
                        </div>
                        <div className="flex flex-col items-center mt-14">
                            <p>{flight.length}</p>
                            <div className="border border-black h-0 w-20"/>
                        </div>
                        <div className="mt-14">
                            <h2 className="w-14">{flight.to}</h2>
                            <h2 className="text-2xl">{flight.arrival}</h2>
                            <h3 className="text-gray-500">{flight.toCode}</h3>
                        </div>
                        <div className="mt-14 flex flex-col items-center ml-12">
                            <p className="text-xl font-bold mb-2">${flight.price}</p>
                            <Button className="w-[100px] border  hover:bg-black hover:text-white">Select</Button>
                        </div>
                    </div>
                ))
            )}

        </div>
    )
}