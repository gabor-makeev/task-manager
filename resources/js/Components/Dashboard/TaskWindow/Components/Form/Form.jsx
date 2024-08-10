import { useEffect, useRef, useState } from "react"
import { router } from "@inertiajs/react"
import TaskNameField from "./Components/TaskNameField"
import TaskStatusSelector from "./Components/TaskStatusSelector"
import TaskDescriptionTextarea from "@/Components/GlobalComponents/TaskDescriptionTextarea"

export const Form = ({ task, statuses, setIsTaskUpdating }) => {
	const [formData, setFormData] = useState({
		name: task.name,
		description: task.description,
		status_id: task.status_id,
		closed_at: task.closed_at,
	})

	const firstRenderRef = useRef(true)
	const formRef = useRef(null)

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false

			return
		}

		setIsTaskUpdating(true)

		let submitTimeout = 1000

		if (task.status_id !== formData.status_id) {
			submitTimeout = 0
		}

		const timeout = setTimeout(() => {
			formRef.current.requestSubmit()
		}, submitTimeout)

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
