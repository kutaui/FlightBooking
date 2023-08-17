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
    departureRealTime: number[]
    setDepartureRealTime: (value: number[]) => void;
    returnRealTime: number[];
    setReturnRealTime: (value: number[]) => void;
    durationRealTime: number[];
    setDurationRealTime: (value: number[]) => void;
    isOneWay?: boolean
    setSortValue: (value: string) => void
    setDuration: (value: number[]) => void
    setDeparture: (value: number[]) => void
    setReturnTime: (value: number[]) => void
}

export const FlightFilter = ({
                                 departureRealTime,
                                 setDepartureRealTime,
                                 durationRealTime,
                                 setDurationRealTime,
                                 returnRealTime,
                                 setReturnRealTime,
                                 isOneWay,
                                 setSortValue,
                                 setDuration,
                                 setReturnTime,
                                 setDeparture
                             }: FlightFilterProps) => {


    const handleDepartureChange = (newValues: number[]) => {
        setDepartureRealTime(newValues);
    };

    const handleArrivalChange = (newValues: number[]) => {
        setReturnRealTime(newValues);
    }

    const handleDurationChange = (newValues: number[]) => {
        setDurationRealTime(newValues);
    };

    return (
        <aside className="w-[22%]">
            <Select onValueChange={setSortValue}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sıralama Ölçütü"/>
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectItem className="hover:bg-gray-200" value="cheapest">En ucuz</SelectItem>
                    <SelectItem className="hover:bg-gray-200" value="fastest">En Hızlı</SelectItem>
                </SelectContent>
            </Select>

            <div>
                <h3 className="font-bold mb-4 text-xl">Kalkış Saatleri</h3>
                <h5 className="font-bold">Gidiş</h5>
                <p className="text-xs">{convertValueToTime(departureRealTime[0])} - {convertValueToTime(departureRealTime[1])}</p>
                <Slider
                    defaultValue={departureRealTime}
                    min={0}
                    max={48}
                    step={1}
                    onValueChange={handleDepartureChange}
                    onValueCommit={setDeparture}
                    minStepsBetweenThumbs={1}
                    className="w-[250px] h-10"
                />
                {!isOneWay && <><h5 className="font-bold">Dönüş</h5><p
                    className="text-xs">{convertValueToTime(returnRealTime[0])} - {convertValueToTime(returnRealTime[1])}</p>
                    <Slider
                        defaultValue={returnRealTime}
                        min={0}
                        max={48}
                        step={1}
                        onValueChange={handleArrivalChange}
                        onValueCommit={setReturnTime}
                        minStepsBetweenThumbs={1}
                        className="w-[250px] h-10"/></>}
            </div>
            <div className="mt-10">
                <h3 className="font-bold mb-1 text-xl">Uçuş Süresi</h3>
                <p className="text-xs">{durationRealTime[0]} saat - {durationRealTime[1]} saat</p>
                <Slider
                    defaultValue={durationRealTime}
                    min={1.5}
                    max={11.5}
                    step={0.5}
                    onValueChange={handleDurationChange}
                    onValueCommit={setDuration}
                    className="w-[250px] h-10"
                />
            </div>
        </aside>
    );
};
