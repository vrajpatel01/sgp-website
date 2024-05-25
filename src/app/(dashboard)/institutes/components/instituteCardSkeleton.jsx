import Skeleton from "react-loading-skeleton"

export default function InstituteCardSkeleton({ itemCount }) {
    return (
        Array(itemCount).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-md shadow-sm p-5 relative flex justify-center flex-col items-center gap-5">
                <Skeleton circle width={80} height={80} />
                <Skeleton width={250} />
                <div className="flex gap-2 flex-wrap justify-center items-center">
                    <Skeleton height={30} width={100} />
                    <Skeleton height={30} width={100} />
                </div>
            </div>
        ))
    )
}