import { useState } from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"
import TaskBadges from "./Components/TaskBadges"
import MainContainer from "./Components/MainContainer"
import Overlay from "./Components/Overlay"
import Modal from "./Components/Modal"
import Subtasks from "./Components/Subtasks"
import ParentTaskLink from "@/Components/Dashboard/TaskWindow/Components/ParentTaskLink"

export const TaskWindow = ({
	task,
	parent = null,
	subtasks,
	statusesData,
	priorities,
}) => {
	const [isTaskUpdating, setIsTaskUpdating] = useState(false)

	return (
		<Overlay>
			<Modal>
				<Header task={task} isTaskUpdating={isTaskUpdating} />
				<MainContainer>
					{parent && <ParentTaskLink task={parent} />}
					<TaskBadges task={task} />
					<Form
						task={task}
						statusesData={statusesData}
						priorities={priorities}
						setIsTaskUpdating={setIsTaskUpdating}
					/>
					<Subtasks
						parentTask={task}
						subtasks={subtasks}
						statusesData={statusesData}
						priorities={priorities}
					/>
				</MainContainer>
			</Modal>
		</Overlay>
	)
}
