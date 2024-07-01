import Heading from "./Components/Heading"
import TasksCounter from "./Components/TasksCounter"
import AddTaskButton from "@/Components/Dashboard/TasksListView/Components/TasksListViewControls/Components/AddTaskButton"

export const TasksListViewControls = ({
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
