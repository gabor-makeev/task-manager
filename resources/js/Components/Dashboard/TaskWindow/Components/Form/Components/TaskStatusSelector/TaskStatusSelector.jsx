import { useState } from "react"
import {
	getStatusesByPriority,
	getStatusesByType,
} from "../../../../../../../../helpers/statusFormatters.js"
import { getCurrentDateTime } from "../../../../../../../../helpers/getCurrentDateTime.js"
import ClickableOverlay from "../../../../../../GlobalComponents/ClickableOverlay"
import StatusSelectionDropdown from "../../../../../../GlobalComponents/StatusSelectionDropdown"
import Label from "./Components/Label"
import CompleteTaskButton from "./Components/CompleteTaskButton"
import NextTaskStatusButton from "./Components/NextTaskStatusButton"
import StatusButton from "./Components/StatusButton"
import ClosedAtDate from "./Components/ClosedAtDate"

export const TaskStatusSelector = ({
	task,
	statuses,
	formData,
	setFormData,
}) => {
	const [isStatusDropdownActive, setIsStatusDropdownActive] = useState(false)

	const statusesByPriority = getStatusesByPriority(statuses)
	const statusesByType = getStatusesByType(statuses)

	const selectStatus = (statusId) => {
		const data = {
			status_id: statusId,
			closed_at: null,
		}

		if (statusId === statusesByType["closed"][0].id) {
			data.closed_at = getCurrentDateTime()
		}

		setFormData({ ...formData, ...data })

		setIsStatusDropdownActive(false)
	}

	const findNextStatusId = () => {
		for (let i = 0; i < statuses.length; i++) {
			if (
				statuses[i].name === statusesByPriority[task.status_id].name &&
				statuses[i + 1]
			) {
				return statuses[i + 1].id
			}
		}

		return statusesByType["not started"][0].id
	}

	const selectNextStatus = () => {
		const nextTaskStatusId = findNextStatusId()

		setFormData({ ...formData, status_id: nextTaskStatusId })
	}

	const selectCompleteStatus = () => {
		const taskClosedAtTime = getCurrentDateTime()

		setFormData({
			...formData,
			status_id: statusesByType.closed[0].id,
			closed_at: taskClosedAtTime,
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
				<NextTaskStatusButton
					task={task}
					statuses={statuses}
					handleClick={selectNextStatus}
				/>
				{statusesByPriority[task.status_id].type !== "closed" && (
					<CompleteTaskButton onClick={selectCompleteStatus} />
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
							statusOptionClickHandler={selectStatus}
						/>
					</>
				)}
			</div>
		</div>
	)
}
