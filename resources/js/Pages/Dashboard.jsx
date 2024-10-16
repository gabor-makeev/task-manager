import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import NewTaskCreationModalWindow from "../Components/Dashboard/NewTaskCreationModalWindow"
import TaskWindow from "../Components/Dashboard/TaskWindow"
import ShowClosedLink from "../Components/Dashboard/ShowClosedLink"
import AddTaskLink from "../Components/Dashboard/AddTaskLink"
import TasksListView from "../Components/Dashboard/TasksListView"

export default function Dashboard({
	auth,
	tasks,
	subtasks,
	parent = null,
	statusesData,
	priorities,
	withNewTaskCreationForm,
	task,
}) {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Dashboard" />
			{withNewTaskCreationForm && (
				<NewTaskCreationModalWindow user={auth.user} />
			)}
			{task && (
				<TaskWindow
					task={task}
					subtasks={subtasks}
					statusesData={statusesData}
					priorities={priorities}
					parent={parent}
				/>
			)}
			<div className={"px-12 py-3 flex justify-between items-center"}>
				<ShowClosedLink />
				<AddTaskLink />
			</div>
			<TasksListView
				auth={auth}
				tasks={tasks}
				statusesData={statusesData}
				priorities={priorities}
			/>
		</AuthenticatedLayout>
	)
}
