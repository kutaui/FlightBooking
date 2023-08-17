export default function convertValueToTime(value: number) {
    if (value === 48) {
        return "23:59";
    }
    const minutes = value * 30;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}