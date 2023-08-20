import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import FlightLoadingSkeleton from "@/components/FlightLoadingSkeleton.tsx";
import {format} from "date-fns";
import {useFlightContext} from "@/context/FlightContext.tsx";
import RenderIf from "@/components/RenderIf.tsx";

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

export const FlightList = () => {
    const {
        departureDate,
        from,
        sortValue,
        duration,
        departure,
        to,
    } = useFlightContext()

    const [flights, setFlights] = useState<Flight[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
    const formattedDate = departureDate ? format(departureDate, "yyyy-MM-dd") : null;
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [filtersApplied, setFiltersApplied] = useState<boolean>(false);


    useEffect(() => {
        async function fetchFlights() {
            try {
                const response = await fetch("https://flights-api-vt7q.onrender.com/flights");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFlights(data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);

                setFiltersApplied(true); // Mark filters as applied on successful fetch
            } catch (error) {
                setIsLoading(false);
                setFetchError(true);
                console.error('Error fetching flights:', error);
            }
        }

        fetchFlights();
    }, []);

    useEffect(() => {
        const filterFlights = () => {
            const lowerFrom = from.toLowerCase();
            const lowerTo = to.toLowerCase();
            const [minDepartureHour, minDepartureMinute] = departure[0].toString().split(":").map(Number);
            const [maxArrivalHour, maxArrivalMinute] = departure[1].toString().split(":").map(Number);

            return flights.filter((flight) => {
                const lowerFlightFrom = flight.from.toLowerCase();
                const lowerFlightTo = flight.to.toLowerCase();

                const [durationHours, durationMinutes] = flight.length.split(":").map(Number);
                const flightDurationInMinutes = durationHours * 60 + durationMinutes;
                const minDurationInMinutes = duration[0];
                const maxDurationInMinutes = duration[1];

                const [flightDepartureHour, flightDepartureMinute] = flight.departure.split(":").map(Number);
                const [flightArrivalHour, flightArrivalMinute] = flight.arrival.split(":").map(Number);

                return (
                    lowerFlightFrom.includes(lowerFrom) &&
                    lowerFlightTo.includes(lowerTo) &&
                    flightDurationInMinutes >= minDurationInMinutes &&
                    flightDurationInMinutes <= maxDurationInMinutes &&
                    (flightDepartureHour > minDepartureHour || (flightDepartureHour === minDepartureHour && flightDepartureMinute >= minDepartureMinute)) &&
                    (flightArrivalHour < maxArrivalHour || (flightArrivalHour === maxArrivalHour && flightArrivalMinute <= maxArrivalMinute)) &&
                    (formattedDate === null || flight.date === formattedDate) // Adjusted condition

                );
            });
        };

        const sortFlights = (flightsToSort: Flight[]) => {
            let sorted: Flight[] = [...flightsToSort];

            if (sortValue === "cheapest") {
                sorted.sort((a, b) => a.price - b.price);
            } else if (sortValue === "fastest") {
                sorted.sort((a, b) => {
                    const [hoursA, minutesA] = a.length.split(":").map(parseFloat);
                    const [hoursB, minutesB] = b.length.split(":").map(parseFloat);

                    const totalDurationA = hoursA * 60 + minutesA;
                    const totalDurationB = hoursB * 60 + minutesB;

                    return totalDurationA - totalDurationB;
                });
            }

            return sorted;
        };

        const filteredAndSortedFlights = sortFlights(filterFlights());
        setFilteredFlights(filteredAndSortedFlights);
    }, [flights, from, to, sortValue, duration, departure, formattedDate]);


    return (
        <div className="w-[46%] sm:w-[95%]">
            <RenderIf condition={filteredFlights.length > 0}>
                <h2>Listing {filteredFlights.length} flights</h2>
            </RenderIf>
            <RenderIf condition={fetchError}>
                <div className="flex justify-center mt-10">
                    <p className="text-red-500 text-2xl">Error fetching flights. Please try again later.</p>
                </div>
            </RenderIf>
            <RenderIf condition={!fetchError && filtersApplied && filteredFlights.length === 0}>
                <div className="flex justify-center mt-10">
                    <p className="text-2xl">No flights found</p>
                </div>
            </RenderIf>
            <RenderIf condition={!isLoading} fallback={<>
                <FlightLoadingSkeleton/>
                <FlightLoadingSkeleton/>
                <FlightLoadingSkeleton/>
            </>}>
                {filteredFlights.map((flight, index) => (
                    <div className="space-x-5 border h-48 sm:h-56 sm:justify-center" key={index}>
                        <div className="flex sm:justify-around sm:border-b sm:pb-1 w-full ">
                            <img src={flight.company} alt="Airline Company Logo"
                                 className="ml-10 mt-10 w-[120px] h-[100px] sm:w-16 sm:h-16 sm:absolute sm:mt-2 sm:ml-0 "/>

                            <div className="mt-14 ml-14 sm:flex sm:flex-col sm:pl-0 sm:mt-20">
                                <h2 className="w-14 sm:w-4">{flight.from}</h2>
                                <h2 className="text-2xl sm:text-sm">{flight.departure}</h2>
                                <h3 className="text-gray-500">{flight.fromCode}</h3>
                            </div>
                            <div className="flex flex-col px-8 items-center mt-14 sm:mt-20 sm:pl-4">
                                <p>{flight.length} hr</p>
                                <div className="border border-black h-0 w-20"/>
                            </div>
                            <div className="mt-14 sm:flex sm:flex-col sm:mt-20">
                                <h2 className="w-14">{flight.to}</h2>
                                <h2 className="text-2xl sm:text-sm">{flight.arrival}</h2>
                                <h3 className="text-gray-500">{flight.toCode}</h3>
                            </div>
                            <div className="mt-14 flex flex-col items-center ml-12 sm:hidden ">
                                <p className="text-xl font-bold mb-2 sm:mr-4 sm:mb-0">${flight.price}</p>
                                <Button className="w-[100px] border hover:bg-black hover:text-white">Select</Button>
                            </div>
                        </div>
                        <div
                            className="mt-14 hidden flex-col items-center ml-12 sm:mt-4 sm:flex sm:flex-row sm:justify-center ">
                            <p className="text-xl font-bold mb-2 sm:mr-4 sm:mb-0">${flight.price}</p>
                            <Button className="w-[100px] border hover:bg-black hover:text-white">Select</Button>
                        </div>
                    </div>))}
            </RenderIf>


        </div>
    )
}