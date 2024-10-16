import { colors } from "../../../../../../../../../../constants/colors.js"

export const StatusButton = ({ task, statusesData, onClickHandler }) => {
	const taskStatus = statusesData.statuses.find(
		(status) => status.id === task.status_id,
	)

	const taskStatusColor = colors[taskStatus.color]

	return (
		<button
			type={"button"}
			id={"status"}
			onClick={onClickHandler}
			className={`flex items-center justify-center bg-${taskStatusColor.main} rounded-l h-6 border-r border-${taskStatusColor.contrast} text-xs uppercase text-${taskStatusColor.content} font-medium px-2`}
		>
			{taskStatus.name}
		</button>
	)
}
