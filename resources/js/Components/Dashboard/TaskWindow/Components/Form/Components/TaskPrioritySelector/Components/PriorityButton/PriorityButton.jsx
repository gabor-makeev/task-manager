import { colors } from "../../../../../../../../../../constants/colors.js"

export const PriorityButton = ({ task, priorities, buttonClickHandler }) => {
	const taskPriority = priorities.find(
		(priority) => priority.id === task.priority_id,
	)

	return (
		<button
			type={"button"}
			id={"priority"}
			onClick={buttonClickHandler}
			className={"flex items-center grow gap-1"}
		>
			{taskPriority && (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className={`feather feather-flag stroke-${colors[taskPriority.color].main} fill-${colors[taskPriority.color].main}`}
					>
						<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
						<line x1="4" y1="22" x2="4" y2="15"></line>
					</svg>
					<span className={"capitalize text-sm"}>
						{taskPriority.name}
					</span>
				</>
			)}
			{!taskPriority && (
				<span className={"text-sm text-slate-500"}>Empty</span>
			)}
		</button>
	)
}
