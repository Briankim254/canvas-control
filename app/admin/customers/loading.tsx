import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="p-4">
      {/* <div className="flex justify-end items-center mb-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div> */}

      <div className="flex flex-row justify-end items-center mb-4 space-x-2">
        <Skeleton className="h-10 w-1/6" />
      </div>

      <div className="flex flex-col justify-between items-center mb-4">
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export default loading;