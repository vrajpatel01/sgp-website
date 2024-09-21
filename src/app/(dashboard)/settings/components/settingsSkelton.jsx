import Skeleton from "react-loading-skeleton"

export default function SettingsSkelton() {
    return (
        <div>
            <Skeleton height={30} width={250} />
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto mt-10">
                    <div>
                        <Skeleton height={30} width={400} />
                        <Skeleton height={20} width={200} />
                    </div>
                    <div className="grid grid-cols-1 gap-2 max-w-fit">
                        <Skeleton height={30} width={400} />
                        <Skeleton height={30} width={400} />
                        <Skeleton height={30} width={400} />
                        <Skeleton height={30} width={400} />
                        <Skeleton height={30} width={400} />
                        <div className="flex w-full justify-end">
                            <Skeleton height={40} width={100} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}