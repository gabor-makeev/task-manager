import TaskBadges from "./Components/TaskBadges"
import Inputs from "./Components/Inputs"

export const Form = ({ task, statuses, formData, handleChange }) => {
	return (
		<div className="grow">
			<div className="max-w-2xl mx-auto mt-6 flex flex-col">
				<TaskBadges task={task} />
				<Inputs
					task={task}
					statuses={statuses}
					formData={formData}
					handleChange={handleChange}
				/>
			</div>
		</div>
	)
}
