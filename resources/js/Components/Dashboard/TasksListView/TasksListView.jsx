import { useState } from "react"
import TasksListViewControls from "./Components/TasksListViewControls"
import List from "./Components/List"

export const TasksListView = ({ auth, tasks, priorities, statuses }) => {
	const [showingQuickTaskCreationForm, setShowingQuickTaskCreationForm] =
		useState(false)

	return (
		<div className="py-12">
			<div className="sm:px-6 lg:px-8">
				<TasksListViewControls
					tasks={tasks}
					showAddTaskButton={
						!showingQuickTaskCreationForm && !!tasks.length
					}
					addTaskButtonClickHandler={() =>
						setShowingQuickTaskCreationForm(true)
					}
				/>
				<List
					auth={auth}
					tasks={tasks}
					statuses={statuses}
					priorities={priorities}
					showingQuickTaskCreationForm={showingQuickTaskCreationForm}
					setShowingQuickTaskCreationForm={
						setShowingQuickTaskCreationForm
					}
				/>
			</div>
		</div>
	)
}
