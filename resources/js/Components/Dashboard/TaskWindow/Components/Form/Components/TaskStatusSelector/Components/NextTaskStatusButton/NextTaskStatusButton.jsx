import { colors } from "../../../../../../../../../../constants/colors.js"

export const NextTaskStatusButton = ({ task, statusesData, handleClick }) => {
	const taskStatus = statusesData.statuses.find(
		(status) => status.id === task.status_id,
	)

	const taskStatusColor = colors[taskStatus.color]

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
