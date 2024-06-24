import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import NewTaskCreationForm from "../Components/Dashboard/NewTaskCreationForm"
import TaskWindow from "../Components/Dashboard/TaskWindow"
import ShowClosedLink from "@/Components/Dashboard/ShowClosedLink"
import TasksList from "@/Components/Dashboard/TasksList"

export default function Dashboard({ auth, tasks, statuses, priorities, withNewTaskCreationForm, task }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            {withNewTaskCreationForm &&
                <NewTaskCreationForm user={auth.user} />
            }
            {task &&
                <TaskWindow
                    task={task}
                    statuses={statuses}
                />
            }
            <div className={"px-2 py-3 flex justify-items-start"}>
                <ShowClosedLink />
            </div>
            <TasksList auth={auth} tasks={tasks} statuses={statuses} priorities={priorities} />
        </AuthenticatedLayout>
    );
}
