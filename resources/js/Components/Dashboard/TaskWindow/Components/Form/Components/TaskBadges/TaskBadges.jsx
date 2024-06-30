import TaskButton from "./Components/TaskButton"
import TaskIdButton from "./Components/TaskIdButton"

export const TaskBadges = ({ task }) => {
	return (
		<div className={"flex text-xs"}>
			<TaskButton />
			<TaskIdButton task={task} />
		</div>
	)
}
