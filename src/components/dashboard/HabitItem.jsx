import { getDateNow, getWeekday, getWeekdayWords } from "@/lib/utils/dateUtils"

export default function HabitItem({name, color, completeDays, activeDays}) {
    const isCompletedToday = completeDays.includes(getDateNow())
    const isActiveToday = activeDays.includes(getWeekday())

    return (
        <>
            {isActiveToday ? (isCompletedToday ? (
                /* Active and complete format*/
                <div className={`flex items-center justify-between shadow-md rounded-lg ${color} p-4 mb-2`}>
                    <div className="flex-initial flex flex-col items-center mr-3">
                        <span className={`block h-2 w-2 rounded-full ${color}`}></span>
                        <span className={`block h-12 w-0.5 ${color}`}></span>
                    </div>

                    <div className="flex-auto">
                        <h3 className="font-bold text-md text-white">{name}</h3>
                        <p className="text-gray-200 text-sm" >🗸 Completed</p>
                    </div>

                    <div className="flex-none">
                        <p className="text-white">Undo</p>
                    </div>
                </div>
                ) : (
                /* Active and not complete format*/
                <div className="flex items-center justify-between shadow-md rounded-lg bg-gray-50 p-4 mb-2">
                    <div className="flex-initial flex flex-col items-center mr-3">
                        <span className={`block h-2 w-2 rounded-full ${color}`}></span>
                        <span className={`block h-12 w-0.5 ${color}`}></span>
                    </div>

                    <div className="flex-auto">
                        <h3 className="font-bold text-md">{name}</h3>
                        <p className="text-gray-400 text-sm" >🕒 Pending</p>
                    </div>

                    <div className="flex-none">
                        <p className="text-blue-500">Mark Complete</p>
                    </div>
                </div>
                )) : (
                /* Not active today format*/
                <div className="flex items-center justify-between shadow-md rounded-lg bg-gray-300 p-4 mb-2">
                    <div className="flex-initial flex flex-col items-center mr-3">
                        <span className={`block h-2 w-2 rounded-full bg-gray-600`}></span>
                        <span className={`block h-12 w-0.5 bg-gray-600`}></span>
                    </div>

                    <div className="flex-auto">
                        <h3 className="text-gray-600 font-bold text-md">{name}</h3>
                        <p className="text-gray-500 text-sm" >Inactive on {getWeekdayWords()}</p>
                    </div>
                </div>
                )}
        </>
    )

}