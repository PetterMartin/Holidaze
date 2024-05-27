import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonVenues = () => {
  return (
    <div className="mt-16">
      <h1 className="text-3xl font-semibold mb-6 ms-1">
        <Skeleton width={200} />
      </h1>
      <div className="md:w-[1300px] grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:overflow-auto">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="border rounded-2xl">
            <div>
              <div className="relative">
                <Skeleton className="w-full h-48 object-cover rounded-t-2xl mb-1" />
              </div>
              <div className="flex flex-col justify-between pt-2 pb-4 px-4">
                <div className="flex flex-col gap-1">
                  <h1 className="font-semibold text-gray-700 max-w-56 overflow-hidden capitalize">
                    <Skeleton width="80%" />
                  </h1>
                  <div className="flex justify-between">
                    <div className="font-semibold text-gray-700">
                      <Skeleton width="60%" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <Skeleton width="40%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonVenues;
