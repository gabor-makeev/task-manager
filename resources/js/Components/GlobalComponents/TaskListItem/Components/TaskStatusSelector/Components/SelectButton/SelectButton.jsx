import { colors } from "../../../../../../../../constants/colors.js"

export const SelectButton = ({ task, statusesData, buttonClickHandler }) => {
	const taskStatus = statusesData.statuses.find(
		(status) => status.id === task.status_id,
	)

	const taskStatusType = statusesData.statusTypes.find(
		(statusType) => statusType.id === taskStatus.status_type_id,
	)

	return (
		<button
			onClick={buttonClickHandler}
			className={"self-center hover:bg-gray-200 p-1 duration-150 rounded"}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={`feather feather-disc stroke-${colors[taskStatus.color].main} fill-transparent`}
			>
				<circle cx="12" cy="12" r="10"></circle>
				<circle
					cx="12"
					cy="12"
					r="6"
					className={`fill-${taskStatusType.name === "not started" ? "transparent stroke-transparent" : colors[taskStatus.color].main}`}
				></circle>
			</svg>
		</button>
	)
}
