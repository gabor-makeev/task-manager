import { useState } from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"
import TaskBadges from "./Components/TaskBadges"
import MainContainer from "./Components/MainContainer"
import Overlay from "./Components/Overlay"

export const TaskWindow = ({ task, statuses }) => {
	const [isTaskUpdating, setIsTaskUpdating] = useState(false)

	return (
		<Overlay>
			<div
				className={
					"flex flex-col grow bg-white h-full max-w-screen-2xl rounded-xl"
				}
			>
				<Header task={task} isTaskUpdating={isTaskUpdating} />
				<MainContainer>
					<TaskBadges task={task} />
					<Form
						task={task}
						statuses={statuses}
						setIsTaskUpdating={setIsTaskUpdating}
					/>
				</MainContainer>
			</div>
		</Overlay>
	)
}
