import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useState} from "react";
import NewTaskCreationForm from "@/Components/NewTaskCreationForm.jsx";

export default function Dashboard({ auth }) {
    const [tasks, setTasks] = useState([]);
    const [taskNameInput, setTaskNameInput] = useState("")
    const [showingNewTaskCreationForm, setShowingNewTaskCreationForm] = useState(false)

    const handleAddTask = (e) => {
        e.preventDefault();

        addTask(taskNameInput)

        setTaskNameInput("")
    }

    const addTask = (taskName) => {
        setTasks([...tasks, {
            id: tasks.length,
            name: taskName
        }])
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            setShowingNewTaskCreationForm={setShowingNewTaskCreationForm}
        >
            <Head title="Dashboard" />
            {showingNewTaskCreationForm && <NewTaskCreationForm setShowingNewTaskCreationForm={setShowingNewTaskCreationForm} />}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={(e) => handleAddTask(e)}>
                        <label htmlFor="taskName">Task name
                            <input type="text" id={"taskName"} value={taskNameInput} onChange={(e) => {
                                setTaskNameInput(e.target.value)
                            }} />
                        </label>
                        <input type="submit" value="Add task" />
                    </form>
                    { tasks && <ul>
                        {tasks.map(task => <li key={task.id}>{task.name}</li>)}
                    </ul> }
                    { !tasks.length && <p>There are no tasks yet created</p>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
