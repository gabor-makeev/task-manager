import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import NewTaskCreationModalWindow from "../Components/Dashboard/NewTaskCreationModalWindow"
import TaskWindow from "../Components/Dashboard/TaskWindow"
import ShowClosedLink from "../Components/Dashboard/ShowClosedLink"
import TasksListView from "../Components/Dashboard/TasksListView"

export default function Dashboard({
	auth,
	tasks,
	subtasks,
	statuses,
	priorities,
	withNewTaskCreationForm,
	task,
}) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 leading-tight">
					Dashboard
				</h2>
			}
		>
			<Head title="Dashboard" />
			{withNewTaskCreationForm && (
				<NewTaskCreationModalWindow user={auth.user} />
			)}
			{task && (
				<TaskWindow
					task={task}
					subtasks={subtasks}
					statuses={statuses}
					priorities={priorities}
				/>
			)}
			<div className={"px-12 py-3 flex justify-items-start"}>
				<ShowClosedLink />
			</div>
			<TasksListView
				auth={auth}
				tasks={tasks}
				statuses={statuses}
				priorities={priorities}
			/>
		</AuthenticatedLayout>
	)
}
