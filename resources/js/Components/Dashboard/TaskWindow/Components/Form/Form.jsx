import TaskNameField from "./Components/TaskNameField"
import TaskDescriptionTextarea from "../../../../GlobalComponents/TaskDescriptionTextarea"
import TaskBadges from "./Components/TaskBadges"
import TaskStatusSelector from "./Components/TaskStatusSelector"

export const Form = ({ task, statuses, formData, handleChange }) => {
	return (
		<div className="grow">
			<div className="max-w-2xl mx-auto mt-6 flex flex-col">
				<TaskBadges task={task} />
				<TaskNameField value={formData.name} onChange={handleChange} />
				<TaskStatusSelector task={task} statuses={statuses} />
				<TaskDescriptionTextarea
					taskDescription={task.description}
					value={formData.description}
					handleChange={handleChange}
					bordered
				/>
			</div>
		</div>
	)
}
