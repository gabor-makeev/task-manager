import { useRef, useState } from "react"
import { router } from "@inertiajs/react"
import QuickTaskCreationFormControls from "./Components/QuickTaskCreationFormControls"
import TaskNameInput from "./Components/TaskNameInput"

export const QuickTaskCreationForm = ({
	auth,
	setShowingQuickTaskCreationForm,
}) => {
	const [taskNameInput, setTaskNameInput] = useState("")
	const [
		showingQuickTaskCreationFormControls,
		setShowingQuickTaskCreationFormControls,
	] = useState(false)

	const quickTaskCreationFormSaveButton = useRef(null)

	const createTask = () => {
		router.post(
			`/tasks?${new URLSearchParams(window.location.search).toString()}`,
			{
				name: taskNameInput,
				user_id: auth.user.id,
			},
		)
	}

	const handleQuickTaskCreationFormSubmit = (e) => {
		e.preventDefault()

		createTask()

		setTaskNameInput("")
		setShowingQuickTaskCreationForm(false)
	}

	const handleEnterKeyDown = (e) => {
		if (e.key !== "Enter") {
			return
		}

		createTask()

		setTaskNameInput("")
		setShowingQuickTaskCreationForm(true)
	}

	const handleQuickTaskCreationFormTaskNameInputBlur = (e) => {
		if (e.relatedTarget === quickTaskCreationFormSaveButton.current) {
			return
		}

		setTaskNameInput("")
		setShowingQuickTaskCreationFormControls(false)
		setShowingQuickTaskCreationForm(false)
	}

	return (
		<li className={"border-b border-b-slate-200"}>
			<form
				onSubmit={(e) => handleQuickTaskCreationFormSubmit(e)}
				className={"flex"}
			>
				<TaskNameInput
					autoFocus
					required
					value={taskNameInput}
					onFocus={() =>
						setShowingQuickTaskCreationFormControls(true)
					}
					onBlur={(e) =>
						handleQuickTaskCreationFormTaskNameInputBlur(e)
					}
					onChange={(e) => setTaskNameInput(e.target.value)}
					onKeyDown={handleEnterKeyDown}
				/>
				<button disabled></button>
				{showingQuickTaskCreationFormControls && (
					<QuickTaskCreationFormControls
						saveButtonRef={quickTaskCreationFormSaveButton}
					/>
				)}
			</form>
		</li>
	)
}
