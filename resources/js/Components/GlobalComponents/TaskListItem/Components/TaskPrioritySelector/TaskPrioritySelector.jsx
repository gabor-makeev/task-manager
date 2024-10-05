import { useState } from "react"
import PriorityButton from "./Components/PriorityButton"
import ClickableOverlay from "../../../ClickableOverlay"
import TaskPriorityDropdown from "@/Components/GlobalComponents/TaskPriorityDropdown"

export const TaskPrioritySelector = ({
	task,
	priorities,
	formData,
	setFormData,
}) => {
	const [isPriorityDropdownActive, setIsPriorityDropdownActive] =
		useState(false)

	const selectPriority = (priorityId) => {
		setFormData({
			...formData,
			priority_id: priorityId,
		})

		setIsPriorityDropdownActive(false)
	}

	return (
		<div className="mr-3 flex max-w-40 grow">
			<PriorityButton
				task={task}
				priorities={priorities}
				buttonClickHandler={() => setIsPriorityDropdownActive(true)}
				isActive={isPriorityDropdownActive}
			/>
			{isPriorityDropdownActive && (
				<>
					<ClickableOverlay
						onClick={() => setIsPriorityDropdownActive(false)}
					/>
					<TaskPriorityDropdown
						task={task}
						priorities={priorities}
						handlePriorityChangeButtonClick={selectPriority}
					/>
				</>
			)}
		</div>
	)
}
