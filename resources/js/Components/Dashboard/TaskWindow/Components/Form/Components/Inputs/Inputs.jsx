import TaskNameField from "./Components/TaskNameField"
import TaskStatusSelector from "./Components/TaskStatusSelector"
import TaskDescriptionTextarea from "../../../../../../GlobalComponents/TaskDescriptionTextarea"

export const Inputs = ({ task, statuses, formData, handleChange }) => {
	return (
		<>
			<TaskNameField value={formData.name} onChange={handleChange} />
			<TaskStatusSelector task={task} statuses={statuses} />
			<TaskDescriptionTextarea
				taskDescription={task.description}
				value={formData.description}
				handleChange={handleChange}
				bordered
			/>
		</>
	)
}
