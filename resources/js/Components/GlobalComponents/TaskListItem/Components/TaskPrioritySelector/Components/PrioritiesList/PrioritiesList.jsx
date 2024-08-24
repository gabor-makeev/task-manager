import { colors } from "../../../../../../../../constants/colors.js"
import ClearTaskPriorityButton from "./Components/ClearTaskPriorityButton/index.js"
import SetPriorityButton from "./Components/SetPriorityButton/index.js"

export const PrioritiesList = ({
	task,
	priorities,
	handlePriorityChangeButtonClick,
}) => {
	return (
		<div className="min-w-44 absolute -ml-1.5 mt-11 bg-white rounded-md shadow-2xl text-xs">
			<ul className={"mt-1.5 py-2 text-sm"}>
				{priorities.map((priority) => (
					<SetPriorityButton
						key={priority.id}
						task={task}
						priority={priority}
						priorityColor={
							colors[priorities[priority.id - 1].color].main
						}
						handlePriorityChangeButtonClick={
							handlePriorityChangeButtonClick
						}
					/>
				))}
				<ClearTaskPriorityButton
					clearTaskPriority={() =>
						handlePriorityChangeButtonClick(null)
					}
				/>
			</ul>
		</div>
	)
}
