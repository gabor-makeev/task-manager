import Title from "./Components/Title"
import { useState } from "react"
import Form from "./Components/Form"
import NewTaskButton from "./Components/NewTaskButton"
import List from "./Components/List"
import TaskListItem from "@/Components/GlobalComponents/TaskListItem"

export const Subtasks = ({
	parentTask,
	subtasks,
	statusesData,
	priorities,
}) => {
	const [isFormVisible, setIsFormVisible] = useState(false)

	return (
		<div>
			<div className={"mt-4 mb-5 flex justify-start border-b h-11"}>
				<Title>Subtasks</Title>
			</div>
			<List>
				{subtasks.map((subtask) => (
					<TaskListItem
						key={subtask.id}
						priorities={priorities}
						statusesData={statusesData}
						task={subtask}
					/>
				))}
				{!isFormVisible && (
					<li>
						<NewTaskButton onClick={() => setIsFormVisible(true)} />
					</li>
				)}
				{isFormVisible && (
					<li>
						<Form
							setIsFormVisible={setIsFormVisible}
							parentTask={parentTask}
						/>
					</li>
				)}
			</List>
		</div>
	)
}
