import {Slider} from "@/components/ui/slider.tsx";

function convertValueToTime(value: number) {
    if (value === 48) {
        return "23:59";
    }
    const minutes = value * 30;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

type FlightFilterProps = {
    departureTime: number[]
    setDepartureTime: (value: number[]) => void;
    duration: number[];
    setDuration: (value: number[]) => void;
}

export const FlightFilter = ({departureTime, setDepartureTime, duration, setDuration}: FlightFilterProps) => {


    const consoleLog = () => {
        console.log(departureTime)
        console.log(duration)
    }
    const handleChange = (newValues: number[]) => {
        setDepartureTime(newValues);
    };
    const handleDurationChange = (newValues: number[]) => {
        setDuration(newValues);
    };

    return (
        <aside className="w-[22%]">
            <div>
                <h3 className="font-bold mb-1">Departure Time</h3>
                <p className="text-xs">{convertValueToTime(departureTime[0])} - {convertValueToTime(departureTime[1])}</p>
                <Slider
                    defaultValue={departureTime}
                    min={0}
                    max={48}
                    step={1}
                    onValueChange={handleChange}
                    minStepsBetweenThumbs={1}
                    className="w-[250px] h-10"
                />
            </div>
            <div>
                <h3 className="font-bold mb-1 text-xl">Flight Duration</h3>
                <p className="text-xs">{duration[0]} - {duration[1]}</p>
                <Slider
                    defaultValue={duration}
                    min={1.5}
                    max={11.5}
                    step={0.5}
                    onValueChange={handleDurationChange}
                    onBlur={consoleLog}

                    className="w-[250px] h-10"
                />
            </div>
        </aside>
    );
};
