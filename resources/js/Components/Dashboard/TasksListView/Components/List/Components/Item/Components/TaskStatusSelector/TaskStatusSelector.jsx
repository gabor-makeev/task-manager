import { useState } from "react"
import { router } from "@inertiajs/react"
import SelectButton from "./Components/SelectButton"
import ClickableOverlay from "../../../../../../../../GlobalComponents/ClickableOverlay"
import StatusSelectionDropdown from "../../../../../../../../GlobalComponents/StatusSelectionDropdown"

export const TaskStatusSelector = ({
	task,
	statusesByPriority,
	statusesByType,
}) => {
	const [isStatusSelectorActive, setIsStatusSelectorActive] = useState(false)

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
				setIsStatusSelectorActive(false)
			},
		})
	}

	return (
		<div className="mr-3 self-center flex">
			<SelectButton
				task={task}
				statusesByPriority={statusesByPriority}
				buttonClickHandler={() => setIsStatusSelectorActive(true)}
			/>
			{isStatusSelectorActive && (
				<>
					<ClickableOverlay
						onClick={() => setIsStatusSelectorActive(false)}
					/>
					<StatusSelectionDropdown
						task={task}
						statusesByType={statusesByType}
						statusOptionClickHandler={handleStatusChangeButtonClick}
					/>
				</>
			)}
		</div>
	)
}
