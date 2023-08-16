import {Slider} from "@/components/ui/slider.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
    returnTime: number[];
    setReturnTime: (value: number[]) => void;
    duration: number[];
    setDuration: (value: number[]) => void;
    isOneWay?: boolean
}

export const FlightFilter = ({
                                 departureTime,
                                 setDepartureTime,
                                 duration,
                                 setDuration,
                                 returnTime,
                                 setReturnTime,
                                 isOneWay
                             }: FlightFilterProps) => {


    const consoleLog = () => {
        console.log(departureTime)
        console.log(duration)
    }
    const handleDepartureChange = (newValues: number[]) => {
        setDepartureTime(newValues);
    };

    const handleArrivalChange = (newValues: number[]) => {
        setReturnTime(newValues);
    }

    const handleDurationChange = (newValues: number[]) => {
        setDuration(newValues);
    };

    return (
        <aside className="w-[22%]">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sıralama Ölçütü"/>
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectItem className="hover:bg-gray-200" value="light">En ucuz</SelectItem>
                    <SelectItem className="hover:bg-gray-200" value="dark">En Hızlı</SelectItem>
                    <SelectItem className="hover:bg-gray-200" value="system">System</SelectItem>
                </SelectContent>
            </Select>

            <div>
                <h3 className="font-bold mb-4 text-xl">Kalkış Saatleri</h3>
                <h5 className="font-bold">Gidiş</h5>
                <p className="text-xs">{convertValueToTime(departureTime[0])} - {convertValueToTime(departureTime[1])}</p>
                <Slider
                    defaultValue={departureTime}
                    min={0}
                    max={48}
                    step={1}
                    onValueChange={handleDepartureChange}
                    minStepsBetweenThumbs={1}
                    className="w-[250px] h-10"
                />
                {!isOneWay && <><h5 className="font-bold">Dönüş</h5><p
                    className="text-xs">{convertValueToTime(returnTime[0])} - {convertValueToTime(returnTime[1])}</p>
                    <Slider
                        defaultValue={departureTime}
                        min={0}
                        max={48}
                        step={1}
                        onValueChange={handleArrivalChange}
                        onValueCommit={consoleLog}
                        minStepsBetweenThumbs={1}
                        className="w-[250px] h-10"/></>}
            </div>
            <div className="mt-10">
                <h3 className="font-bold mb-1 text-xl">Uçuş Süresi</h3>
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
