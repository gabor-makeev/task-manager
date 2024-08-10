import { useEffect, useRef, useState } from "react"
import { router } from "@inertiajs/react"
import TaskNameField from "./Components/TaskNameField"
import TaskStatusSelector from "./Components/TaskStatusSelector"
import TaskDescriptionTextarea from "@/Components/GlobalComponents/TaskDescriptionTextarea"

export const Form = ({ task, statuses, setIsTaskUpdating }) => {
	const [formData, setFormData] = useState({
		name: task.name,
		description: task.description,
	})

	const firstRenderRef = useRef(true)
	const formRef = useRef(null)

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false

			return
		}

		setIsTaskUpdating(true)

		const timeout = setTimeout(() => {
			formRef.current.requestSubmit()
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [formData])

	const handleChange = (e) => {
		const { name, value } = e.target

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		router.put(`/tasks/${task.id}`, formData, {
			onSuccess: () => {
				setIsTaskUpdating(false)
			},
		})
	}

	return (
		<form onSubmit={handleSubmit} ref={formRef}>
			<TaskNameField value={formData.name} onChange={handleChange} />
			<TaskStatusSelector
				task={task}
				statuses={statuses}
				formData={formData}
				setFormData={setFormData}
			/>
			<TaskDescriptionTextarea
				taskDescription={task.description}
				value={formData.description}
				handleChange={handleChange}
				bordered
			/>
		</form>
	)
}
