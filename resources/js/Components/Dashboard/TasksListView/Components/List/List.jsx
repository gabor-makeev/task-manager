import {
	getStatusesByPriority,
	getStatusesByType,
} from "../../../../../../helpers/statusFormatters.js"
import Item from "./Components/Item"
import ListHeaders from "./Components/ListHeaders"
import QuickTaskCreationForm from "./Components/QuickTaskCreationForm"

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
					<Item
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
