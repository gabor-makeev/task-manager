import TaskNameInput from "./Components/TaskNameInput"
import TaskDescriptionTextarea from "../../../../../../GlobalComponents/TaskDescriptionTextarea"

export const Inputs = ({ formData, handleChange }) => {
	return (
		<div className={"p-6 border-b"}>
			<TaskNameInput
				placeholder={"Task name"}
				value={formData.name}
				onChange={handleChange}
			/>
			<TaskDescriptionTextarea
				value={formData.description}
				handleChange={handleChange}
				isNewTask
			/>
		</div>
	)
}
