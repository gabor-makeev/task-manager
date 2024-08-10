import { getStatusesByPriority } from "../../../../../../../../../../helpers/statusFormatters.js"
import { colors } from "../../../../../../../../../../constants/colors.js"

export const StatusButton = ({ task, statuses, onClickHandler }) => {
	const statusesByPriority = getStatusesByPriority(statuses)
	const taskStatusColor = colors[statusesByPriority[task.status_id].color]

	return (
		<button
			type={"button"}
			id={"status"}
			onClick={onClickHandler}
			className={`flex items-center justify-center bg-${taskStatusColor.main} rounded-l h-6 border-r border-${taskStatusColor.contrast} text-xs uppercase text-${taskStatusColor.content} font-medium px-2`}
		>
			{statusesByPriority[task.status_id].name}
		</button>
	)
}
