import TaskStatusSelector from "./Components/TaskStatusSelector"
import TaskDeleteButton from "./Components/TaskDeleteButton"
import TaskLink from "./Components/TaskLink"
import TaskPrioritySelector from "./Components/TaskPrioritySelector"

export const TaskListItem = ({
	task,
	priorities,
	statusesByPriority,
	statusesByType,
}) => {
	return (
		<li
			key={task.id}
			className={
				"flex min-h-9 border-b border-b-slate-200 hover:bg-gray-100 pl-7"
			}
		>
			<TaskStatusSelector
				task={task}
				statusesByPriority={statusesByPriority}
				statusesByType={statusesByType}
			/>
			<TaskLink task={task} />
			<TaskPrioritySelector task={task} priorities={priorities} />
			<TaskDeleteButton task={task} />
		</li>
	)
}
