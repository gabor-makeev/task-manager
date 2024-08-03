import Inputs from "./Components/Inputs"
import { useEffect, useRef, useState } from "react"
import { router } from "@inertiajs/react"

export const Form = ({ task, statuses, setIsTaskUpdating }) => {
	const [formData, setFormData] = useState({
		name: task.name,
		description: task.description,
	})

	const firstRenderRef = useRef(true)

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false

			return
		}

		setIsTaskUpdating(true)

		const timeout = setTimeout(() => {
			router.put(`/tasks/${task.id}`, formData, {
				onSuccess: () => {
					setIsTaskUpdating(false)
				},
			})
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

	return (
		<>
			{/* TODO: implement separate input field elements */}
			<Inputs
				task={task}
				statuses={statuses}
				formData={formData}
				handleChange={handleChange}
			/>
		</>
	)
}
