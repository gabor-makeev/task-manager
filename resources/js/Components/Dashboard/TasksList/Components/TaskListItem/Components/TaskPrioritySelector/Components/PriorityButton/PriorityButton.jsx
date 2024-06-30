import { colors } from "../../../../../../../../../../constants/colors.js"

export const PriorityButton = ({
	task,
	priorities,
	isActive,
	buttonClickHandler,
}) => {
	return (
		<button
			onClick={buttonClickHandler}
			className={`flex gap-2 w-full items-center rounded-sm hover:ring-slate-300 hover:ring-1 pl-2.5 pr-3 ${isActive ? "bg-white ring-1 ring-indigo-500" : ""}`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={`feather feather-flag stroke-${task.priority_id ? colors[priorities[task.priority_id - 1].color].main : "gray-300"} fill-${task.priority_id ? colors[priorities[task.priority_id - 1].color].main : "none"}`}
			>
				<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
				<line x1="4" y1="22" x2="4" y2="15"></line>
			</svg>
			{task.priority_id && (
				<span className={"capitalize"}>
					{priorities[task.priority_id - 1].name}
				</span>
			)}
		</button>
	)
}
