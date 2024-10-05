import { priorityIcon } from "./priorityIcon.jsx"
import { useState } from "react"
import IconedLabel from "@/Components/GlobalComponents/IconedLabel"
import TaskPriorityDropdown from "@/Components/GlobalComponents/TaskPriorityDropdown"
import TaskSelectorsContainer from "@/Components/GlobalComponents/TaskSelectorContainer"
import ClickableOverlay from "@/Components/GlobalComponents/ClickableOverlay"
import PriorityButton from "@/Components/Dashboard/TaskWindow/Components/Form/Components/TaskPrioritySelector/Components/PriorityButton"

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
		<TaskSelectorsContainer>
			<IconedLabel
				htmlFor={"priority"}
				labelText={"Priority"}
				svgIcon={priorityIcon}
			/>
			<div
				className={`flex grow py-1.5 pl-1.5 rounded-md ${isPriorityDropdownActive ? "bg-gray-100" : ""}`}
			>
				<PriorityButton
					buttonClickHandler={() => setIsPriorityDropdownActive(true)}
					task={task}
					priorities={priorities}
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
		</TaskSelectorsContainer>
	)
}
