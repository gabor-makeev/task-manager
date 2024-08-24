import { useRef, useState } from "react"
import { router } from "@inertiajs/react"
import SaveButton from "@/Components/GlobalComponents/SaveButton"
import CancelButton from "./CancelButton"
import TaskNameInput from "./TaskNameInput"

export const Form = ({ setIsFormVisible, parentTask }) => {
	const [formData, setFormData] = useState({
		name: "",
	})

	const cancelButtonRef = useRef(null)
	const saveButtonRef = useRef(null)

	const handleBlur = (e) => {
		if (
			e.relatedTarget &&
			(e.relatedTarget === cancelButtonRef.current ||
				e.relatedTarget === saveButtonRef.current)
		) {
			return
		}

		setIsFormVisible(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const isSubmittedBySaveButton =
			e.nativeEvent.submitter === saveButtonRef.current

		const data = {
			...formData,
			user_id: parentTask.user_id,
			parent_task_id: parentTask.id,
		}

		router.post(
			`/tasks?${new URLSearchParams(window.location.search).toString()}`,
			data,
		)

		setFormData({
			...formData,
			name: "",
		})
		setIsFormVisible(!isSubmittedBySaveButton)
	}

	const handleChange = (e) => {
		const { name, value } = e.target

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={"flex items-center pl-6 pr-3 h-10"}
		>
			<TaskNameInput
				value={formData.name}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<button></button>
			<CancelButton
				handleClick={() => setIsFormVisible(false)}
				cancelButtonRef={cancelButtonRef}
			/>
			<SaveButton saveButtonRef={saveButtonRef} />
		</form>
	)
}
