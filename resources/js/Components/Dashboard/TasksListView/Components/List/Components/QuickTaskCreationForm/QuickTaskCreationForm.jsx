import { useRef, useState } from "react"
import { router } from "@inertiajs/react"
import TaskNameInput from "./Components/TaskNameInput"
import SaveButton from "@/Components/GlobalComponents/SaveButton/index.js"

export const QuickTaskCreationForm = ({
	auth,
	setShowingQuickTaskCreationForm,
}) => {
	const [formData, setFormData] = useState({
		name: "",
	})
	const [showingControls, setShowingControls] = useState(false)

	const saveButton = useRef(null)

	const handleSubmit = (e) => {
		e.preventDefault()

		const isSubmittedBySaveButton =
			e.nativeEvent.submitter === saveButton.current

		const urlParams = new URLSearchParams(window.location.search).toString()

		router.post(`/tasks?${urlParams}`, {
			name: formData.name,
			user_id: auth.user.id,
		})

		setFormData({
			...formData,
			name: "",
		})

		setShowingQuickTaskCreationForm(!isSubmittedBySaveButton)
	}

	const handleTaskNameInputBlur = (e) => {
		if (e.relatedTarget === saveButton.current) {
			return
		}

		setFormData({
			...formData,
			name: "",
		})
		setShowingControls(false)
		setShowingQuickTaskCreationForm(false)
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)} className={"flex"}>
			<TaskNameInput
				autoFocus
				required
				value={formData.name}
				onFocus={() => setShowingControls(true)}
				onBlur={(e) => handleTaskNameInputBlur(e)}
				onChange={(e) =>
					setFormData({ ...formData, name: e.target.value })
				}
			/>
			<button></button>
			{showingControls && (
				<div className={"flex items-center"}>
					<SaveButton saveButtonRef={saveButton} />
				</div>
			)}
		</form>
	)
}
