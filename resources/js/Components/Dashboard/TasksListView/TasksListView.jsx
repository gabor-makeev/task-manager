import { useState } from "react"
import TasksListViewControls from "./Components/TasksListViewControls"
import List from "./Components/List"
import Pagination from "./Components/Pagination"

export const TasksListView = ({ auth, tasks, priorities, statuses }) => {
	const [showingQuickTaskCreationForm, setShowingQuickTaskCreationForm] =
		useState(false)

	const {
		current_page,
		first_page_url,
		last_page,
		last_page_url,
		next_page_url,
		prev_page_url,
		total,
		from,
		to,
	} = tasks

	return (
		<div className="py-12 px-5">
			<div className="sm:px-6 lg:px-8 flex flex-col">
				<TasksListViewControls
					totalTasks={total}
					showAddTaskButton={!showingQuickTaskCreationForm && !!total}
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
				{last_page !== 1 && (
					<Pagination
						currentPage={current_page}
						firstPageUrl={first_page_url}
						lastPage={last_page}
						lastPageUrl={last_page_url}
						nextPageUrl={next_page_url}
						prevPageUrl={prev_page_url}
						tasksOnPageFrom={from}
						tasksOnPageTo={to}
					/>
				)}
			</div>
		</div>
	)
}
