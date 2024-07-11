import { useState } from "react"
import {
	getStatusesByPriority,
	getStatusesByType,
} from "../../../../../../../../../../helpers/statusFormatters.js"
import Label from "./Components/Label/index.js"
import CompleteTaskButton from "./Components/CompleteTaskButton/index.js"
import NextTaskStatusButton from "./Components/NextTaskStatusButton/index.js"
import StatusButton from "./Components/StatusButton/index.js"
import ClickableOverlay from "../../../../../../../../GlobalComponents/ClickableOverlay/index.js"
import StatusSelectionDropdown from "../../../../../../../../GlobalComponents/StatusSelectionDropdown/index.js"
import { router } from "@inertiajs/react"
import ClosedAtDate from "@/Components/Dashboard/TaskWindow/Components/Form/Components/Inputs/Components/TaskStatusSelector/Components/ClosedAtDate/index.js"

export const TaskStatusSelector = ({ task, statuses }) => {
	const [isStatusDropdownActive, setIsStatusDropdownActive] = useState(false)

	const statusesByPriority = getStatusesByPriority(statuses)
	const statusesByType = getStatusesByType(statuses)

	const handleStatusChangeButtonClick = (statusId) => {
		const data = {
			status_id: statusId,
		}

		if (statusId === statusesByType["closed"][0].id) {
			const taskClosedAtTime = new Date()
				.toISOString()
				.replace("T", " ")
				.replace(/\..*/, "")

			data.closed_at = taskClosedAtTime
		}

		router.put(`/tasks/${task.id}`, data, {
			onSuccess: () => {
				setIsStatusDropdownActive(false)
			},
		})
	}

	return (
		<div className={"mt-7 flex items-center gap-1 pl-1.5 pb-8 min-h-9"}>
			<Label />
			<div
				className={`flex max-w-72 py-1.5 pl-1.5 grow rounded-md ${isStatusDropdownActive ? "bg-gray-100" : ""}`}
			>
				<StatusButton
					task={task}
					statuses={statuses}
					onClickHandler={() => setIsStatusDropdownActive(true)}
				/>
				<NextTaskStatusButton task={task} statuses={statuses} />
				{statusesByPriority[task.status_id].type !== "closed" && (
					<CompleteTaskButton task={task} statuses={statuses} />
				)}
				{statusesByPriority[task.status_id].type === "closed" && (
					<ClosedAtDate task={task} />
				)}
				{isStatusDropdownActive && (
					<>
						<ClickableOverlay
							onClick={() => setIsStatusDropdownActive(false)}
						/>
						<StatusSelectionDropdown
							task={task}
							statusesByType={statusesByType}
							statusOptionClickHandler={
								handleStatusChangeButtonClick
							}
						/>
					</>
				)}
			</div>
		</div>
	)
}
