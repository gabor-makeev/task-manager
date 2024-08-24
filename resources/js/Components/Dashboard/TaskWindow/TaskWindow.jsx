import { useState } from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"
import TaskBadges from "./Components/TaskBadges"
import MainContainer from "./Components/MainContainer"
import Overlay from "./Components/Overlay"
import Modal from "./Components/Modal"
import Subtasks from "./Components/Subtasks"

export const TaskWindow = ({ task, subtasks, statuses, priorities }) => {
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
					<Subtasks
						parentTask={task}
						subtasks={subtasks}
						statuses={statuses}
						priorities={priorities}
					/>
				</MainContainer>
			</Modal>
		</Overlay>
	)
}
