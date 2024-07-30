import TaskNameInput from "./Components/TaskNameInput"
import TaskDescriptionTextarea from "../../../../../../GlobalComponents/TaskDescriptionTextarea"

export const Inputs = ({ formData, setFormData }) => {
	const handleChange = (e) => {
		const { name, value } = e.target

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

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
