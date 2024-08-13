import TaskStatusSelector from "./Components/TaskStatusSelector"
import TaskDeleteButton from "./Components/TaskDeleteButton"
import TaskLink from "./Components/TaskLink"
import TaskPrioritySelector from "./Components/TaskPrioritySelector"
import { useEffect, useRef, useState } from "react"
import { router } from "@inertiajs/react"

export const Item = ({
	task,
	priorities,
	statusesByPriority,
	statusesByType,
}) => {
	const [formData, setFormData] = useState({
		status_id: task.status_id,
		priority_id: task.priority_id,
	})

	const firstRenderRef = useRef(true)
	const formRef = useRef(null)

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false

			return
		}

		formRef.current.requestSubmit()
	}, [formData])

	const handleSubmit = (e) => {
		e.preventDefault()

		router.put(`/tasks/${task.id}`, formData)
	}

	return (
		<li key={task.id}>
			<form
				onSubmit={handleSubmit}
				ref={formRef}
				className={
					"flex min-h-9 border-b border-b-slate-200 hover:bg-gray-100 pl-7"
				}
			>
				<TaskStatusSelector
					task={task}
					statusesByPriority={statusesByPriority}
					statusesByType={statusesByType}
					formData={formData}
					setFormData={setFormData}
				/>
				<TaskLink task={task} />
				<TaskPrioritySelector
					task={task}
					priorities={priorities}
					formData={formData}
					setFormData={setFormData}
				/>
				<TaskDeleteButton task={task} />
			</form>
		</li>
	)
}
