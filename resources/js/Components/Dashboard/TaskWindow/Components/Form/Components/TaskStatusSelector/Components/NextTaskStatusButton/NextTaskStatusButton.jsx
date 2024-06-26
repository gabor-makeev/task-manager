import { getStatusesByPriority, getStatusesByType } from "../../../../../../../../../../helpers/statusFormatters.js"
import { colors } from "../../../../../../../../../../constants/colors.js"
import { router } from "@inertiajs/react"

export const NextTaskStatusButton = ({ task, statuses }) => {
    const statusesByPriority = getStatusesByPriority(statuses)
    const statusesByType = getStatusesByType(statuses)
    const taskStatusColor = colors[statusesByPriority[task.status_id].color]

    const findNextStatusId = () => {
        for (let i = 0; i < statuses.length; i++) {
            if (statuses[i].name === statusesByPriority[task.status_id].name && statuses[i + 1]) {
                return statuses[i + 1].id
            }
        }

        return statusesByType['not started'][0].id
    }

    const nextTaskStatusId = findNextStatusId()

    const handleNextStatusButtonClick = () => {
        router.put(`/tasks/${task.id}`, {
            status_id: nextTaskStatusId
        })
    }

    return (
        <button
            onClick={handleNextStatusButtonClick}
            className={`w-6 h-6 flex items-center justify-center rounded-r bg-${taskStatusColor.main}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" className={`fill-${taskStatusColor.content}`}><path d="M391.5-315.5v-329l251 164.5-251 164.5Z"/></svg>
        </button>
    )
}
