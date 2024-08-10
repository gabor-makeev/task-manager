import { getStatusesByPriority } from "../../../../../../../../../../helpers/statusFormatters.js"
import { colors } from "../../../../../../../../../../constants/colors.js"

export const NextTaskStatusButton = ({ task, statuses, handleClick }) => {
	const statusesByPriority = getStatusesByPriority(statuses)
	const taskStatusColor = colors[statusesByPriority[task.status_id].color]

	return (
		<button
			type={"button"}
			onClick={handleClick}
			className={`w-6 h-6 flex items-center justify-center rounded-r bg-${taskStatusColor.main}`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="16px"
				viewBox="0 -960 960 960"
				width="16px"
				className={`fill-${taskStatusColor.content}`}
			>
				<path d="M391.5-315.5v-329l251 164.5-251 164.5Z" />
			</svg>
		</button>
	)
}
