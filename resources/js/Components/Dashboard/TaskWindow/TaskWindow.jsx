import { router } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"
import TaskBadges from "./Components/TaskBadges"
import MainContainer from "./Components/MainContainer"

export const TaskWindow = ({ task, statuses }) => {
	const [isTaskUpdating, setIsTaskUpdating] = useState(false)

	const handleOverlayClick = (e) => {
		if (e.target.id === "task-window__overlay") {
			router.get(
				`/?${new URLSearchParams(window.location.search).toString()}`,
			)
		}
	}

	return (
		<div
			id={"task-window__overlay"}
			onClick={(e) => handleOverlayClick(e)}
			className={
				"absolute inset-0 bg-black/75 flex justify-center items-start px-5 pt-5 pb-14"
			}
		>
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
		</div>
	)
}
