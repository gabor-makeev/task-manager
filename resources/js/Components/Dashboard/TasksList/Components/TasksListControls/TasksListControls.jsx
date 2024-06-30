import Heading from "./Components/Heading"
import TasksCounter from "./Components/TasksCounter"
import AddTaskButton from "@/Components/Dashboard/TasksList/Components/TasksListControls/Components/AddTaskButton/index.js"

export const TasksListControls = ({
	tasks,
	showAddTaskButton,
	addTaskButtonClickHandler,
}) => {
	return (
		<div className={"flex font-semibold items-center h-8"}>
			<Heading>Tasks</Heading>
			<TasksCounter>{tasks.length}</TasksCounter>
			{showAddTaskButton && (
				<AddTaskButton
					addTaskButtonClickHandler={addTaskButtonClickHandler}
				/>
			)}
		</div>
	)
}
