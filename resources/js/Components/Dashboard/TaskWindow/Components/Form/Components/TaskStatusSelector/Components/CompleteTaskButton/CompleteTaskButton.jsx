import { router } from "@inertiajs/react"
import { getStatusesByType } from "../../../../../../../../../../helpers/statusFormatters.js"

export const CompleteTaskButton = ({ task, statuses }) => {
    const statusesByType = getStatusesByType(statuses)
    const handleCompleteButtonClick = () => {
        router.put(`/tasks/${task.id}`, {
            status_id: statusesByType.closed[0].id
        })
    }

    return (
        <button
            onClick={handleCompleteButtonClick}
            className={"ml-2 w-6 h-6 border border-gray-300 group hover:border-green-500 rounded flex justify-center items-center duration-200"}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className={"fill-gray-300 group-hover:fill-green-500 duration-200"}><path d="M389-259.35 187.35-460l58.89-59.89L389-377.13l324.76-323.76L772.65-642 389-259.35Z"/></svg>
        </button>
    )
}
