import { useState } from "react"
import PriorityButton from "./Components/PriorityButton/index.js"
import ClickableOverlay from "../../../ClickableOverlay/index.js"
import PrioritiesList from "./Components/PrioritiesList/index.js"

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
					<PrioritiesList
						task={task}
						priorities={priorities}
						handlePriorityChangeButtonClick={selectPriority}
					/>
				</>
			)}
		</div>
	)
}
