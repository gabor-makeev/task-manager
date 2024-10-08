import {
	getStatusesByPriority,
	getStatusesByType,
} from "../../../../../../helpers/statusFormatters.js"
import ListHeaders from "./Components/ListHeaders"
import QuickTaskCreationForm from "./Components/QuickTaskCreationForm"
import TaskListItem from "@/Components/GlobalComponents/TaskListItem"

export const List = ({
	auth,
	tasks,
	statuses,
	priorities,
	showingQuickTaskCreationForm,
	setShowingQuickTaskCreationForm,
}) => {
	const statusesByPriority = getStatusesByPriority(statuses)
	const statusesByType = getStatusesByType(statuses)

	return (
		<>
			<ListHeaders />
			<ul className={"basis-[540px]"}>
				{(!tasks.data.length || showingQuickTaskCreationForm) && (
					<li className={"border-b border-b-slate-200"}>
						<QuickTaskCreationForm
							auth={auth}
							setShowingQuickTaskCreationForm={
								setShowingQuickTaskCreationForm
							}
						/>
					</li>
				)}
				{tasks.data.map((task) => (
					<TaskListItem
						key={task.id}
						task={task}
						priorities={priorities}
						statusesByPriority={statusesByPriority}
						statusesByType={statusesByType}
					/>
				))}
			</ul>
		</>
	)
}
