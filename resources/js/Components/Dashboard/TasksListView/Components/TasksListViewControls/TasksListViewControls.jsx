import Heading from "./Components/Heading"
import TasksCounter from "./Components/TasksCounter"
import AddTaskButton from "@/Components/Dashboard/TasksListView/Components/TasksListViewControls/Components/AddTaskButton"

export const TasksListViewControls = ({
	totalTasks,
	showAddTaskButton,
	addTaskButtonClickHandler,
}) => {
	return (
		<div className={"flex font-semibold items-center h-8"}>
			<Heading>Tasks</Heading>
			<TasksCounter>{totalTasks}</TasksCounter>
			{showAddTaskButton && (
				<AddTaskButton
					addTaskButtonClickHandler={addTaskButtonClickHandler}
				/>
			)}
		</div>
	)
}
