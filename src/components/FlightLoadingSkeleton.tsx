import { Skeleton } from '@/components/ui/skeleton.tsx';

const FlightLoadingSkeleton = () => (
    <Skeleton className="flex space-x-5 border border-slate-300 h-48">
        <Skeleton className="ml-10 mt-10 w-[120px] h-[100px] bg-slate-200" />
        <div className="mt-16 pl-12">
            <Skeleton className="w-14 h-4 mb-2 bg-slate-300 " />
            <Skeleton className="w-8 h-4 bg-slate-300 " />
        </div>
        <div className="flex flex-col items-center mt-14">
            <Skeleton className="w-20 h-3 mt-3 bg-slate-300 " />
        </div>
        <div className="mt-16">
            <Skeleton className="w-14 h-4 mb-2 bg-slate-300 " />
            <Skeleton className="w-8 h-4 bg-slate-300 " />
        </div>
        <div className="mt-16 flex flex-col items-center pl-14">
            <Skeleton className="w-12 h-4 bg-slate-300 " />
            <Skeleton className="w-[100px] h-8  mt-4 bg-slate-300 " />
        </div>
    </Skeleton>
);

export default FlightLoadingSkeleton;
