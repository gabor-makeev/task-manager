import { useState } from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"
import TaskBadges from "./Components/TaskBadges"
import MainContainer from "./Components/MainContainer"
import Overlay from "./Components/Overlay"
import Modal from "./Components/Modal"

export const TaskWindow = ({ task, statuses }) => {
	const [isTaskUpdating, setIsTaskUpdating] = useState(false)

	return (
		<Overlay>
			<Modal>
				<Header task={task} isTaskUpdating={isTaskUpdating} />
				<MainContainer>
					<TaskBadges task={task} />
					<Form
						task={task}
						statuses={statuses}
						setIsTaskUpdating={setIsTaskUpdating}
					/>
				</MainContainer>
			</Modal>
		</Overlay>
	)
}
