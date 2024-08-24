import { useState } from "react"
import SelectButton from "./Components/SelectButton/index.js"
import ClickableOverlay from "../../../ClickableOverlay/index.js"
import StatusSelectionDropdown from "../../../StatusSelectionDropdown/index.js"

export const TaskStatusSelector = ({
	task,
	statusesByPriority,
	statusesByType,
	formData,
	setFormData,
}) => {
	const [isStatusSelectorActive, setIsStatusSelectorActive] = useState(false)

	const selectStatus = (statusId) => {
		setFormData({
			...formData,
			status_id: statusId,
		})

		setIsStatusSelectorActive(false)
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
						statusOptionClickHandler={selectStatus}
					/>
				</>
			)}
		</div>
	)
}
