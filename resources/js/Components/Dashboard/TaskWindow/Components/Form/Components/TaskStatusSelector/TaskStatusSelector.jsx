import { useState } from "react"
import ClickableOverlay from "../../../../../../GlobalComponents/ClickableOverlay"
import StatusSelectionDropdown from "../../../../../../GlobalComponents/StatusSelectionDropdown"
import CompleteTaskButton from "./Components/CompleteTaskButton"
import NextTaskStatusButton from "./Components/NextTaskStatusButton"
import StatusButton from "./Components/StatusButton"
import ClosedAtDate from "./Components/ClosedAtDate"
import IconedLabel from "@/Components/GlobalComponents/IconedLabel"
import { statusIcon } from "@/Components/Dashboard/TaskWindow/Components/Form/Components/TaskStatusSelector/statusIcon.jsx"
import TaskSelectorsContainer from "@/Components/GlobalComponents/TaskSelectorContainer"

export const TaskStatusSelector = ({
	task,
	statusesData,
	formData,
	setFormData,
}) => {
	const [isStatusDropdownActive, setIsStatusDropdownActive] = useState(false)

	const taskStatus = statusesData.statuses.find(
		(status) => status.id === task.status_id,
	)

	const taskStatusType = statusesData.statusTypes.find((statusType) => {
		return statusType.id === taskStatus.status_type_id
	})

	const selectStatus = (statusId) => {
		setFormData({ ...formData, status_id: statusId })

		setIsStatusDropdownActive(false)
	}

	const findNextStatusId = () => {
		const sortedStatuses = [...statusesData.statuses].sort(
			(a, b) => a.position - b.position,
		)

		const sortedStatusTypes = [...statusesData.statusTypes].sort(
			(a, b) => a.position - b.position,
		)

		const nextStatusInStatusTypeGroup = statusesData.statuses.find(
			(status) => {
				return (
					status.status_type_id === taskStatusType.id &&
					status.position > taskStatus.position
				)
			},
		)

		if (nextStatusInStatusTypeGroup) {
			return nextStatusInStatusTypeGroup.id
		}

		const nextStatusGroup = sortedStatusTypes.find((statusType) => {
			return statusType.position > taskStatusType.position
		})

		if (nextStatusGroup) {
			const nextStatusGroupStatuses = sortedStatuses.filter((status) => {
				return status.status_type_id === nextStatusGroup.id
			})

			return nextStatusGroupStatuses[0].id
		}

		const firstStatus = sortedStatuses.find((status) => {
			return status.status_type_id === sortedStatusTypes[0].id
		})

		return firstStatus.id
	}

	const selectNextStatus = () => {
		const nextTaskStatusId = findNextStatusId()
		const data = {
			...formData,
			status_id: nextTaskStatusId,
		}

		setFormData({ ...formData, ...data })
	}

	const selectCompleteStatus = () => {
		setFormData({
			...formData,
			status_id: statuses.closed[0].id,
		})
	}

	return (
		<TaskSelectorsContainer>
			<IconedLabel
				htmlFor={"status"}
				svgIcon={statusIcon}
				labelText={"Status"}
			/>
			<div
				className={`flex grow py-1.5 pl-1.5 rounded-md ${isStatusDropdownActive ? "bg-gray-100" : ""}`}
			>
				<StatusButton
					task={task}
					statusesData={statusesData}
					onClickHandler={() => setIsStatusDropdownActive(true)}
				/>
				<NextTaskStatusButton
					task={task}
					statusesData={statusesData}
					handleClick={selectNextStatus}
				/>
				{taskStatusType.name !== "closed" && (
					<CompleteTaskButton onClick={selectCompleteStatus} />
				)}
				{taskStatusType.name === "closed" && (
					<ClosedAtDate task={task} />
				)}
				{isStatusDropdownActive && (
					<>
						<ClickableOverlay
							onClick={() => setIsStatusDropdownActive(false)}
						/>
						<StatusSelectionDropdown
							task={task}
							statusesData={statusesData}
							statusOptionClickHandler={selectStatus}
						/>
					</>
				)}
			</div>
		</TaskSelectorsContainer>
	)
}
