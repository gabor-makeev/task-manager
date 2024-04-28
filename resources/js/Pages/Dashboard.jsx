import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useRef, useState} from "react";
import NewTaskCreationForm from "@/Components/NewTaskCreationForm.jsx";

export default function Dashboard({ auth }) {
    const [tasks, setTasks] = useState([]);
    const [taskNameInput, setTaskNameInput] = useState("")
    const [showingNewTaskCreationForm, setShowingNewTaskCreationForm] = useState(false)
    const [showingQuickTaskCreationForm, setShowingQuickTaskCreationForm] = useState(false)
    const [showingQuickTaskCreationFormControls, setShowingQuickTaskCreationFormControls] = useState(false)

    const quickTaskCreationFormSaveButton = useRef(null)

    const handleQuickTaskCreationFormTaskNameInputBlur = (e) => {
        if (e.relatedTarget === quickTaskCreationFormSaveButton.current) {
            return
        }

        setTaskNameInput("")
        setShowingQuickTaskCreationFormControls(false)
        setShowingQuickTaskCreationForm(false)
    }

    const handleQuickTaskCreationFormSubmit = (e) => {
        e.preventDefault()

        setTasks([{
            id: tasks.length,
            name: taskNameInput,
        }, ...tasks])

        setTaskNameInput("")
        setShowingQuickTaskCreationForm(false)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            setShowingNewTaskCreationForm={setShowingNewTaskCreationForm}
        >
            <Head title="Dashboard" />
            {showingNewTaskCreationForm && <NewTaskCreationForm setShowingNewTaskCreationForm={setShowingNewTaskCreationForm} tasks={tasks} setTasks={setTasks} />}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className={"flex font-semibold items-center h-8"}>
                        <h2 className={"mr-4 text-sm text-stone-800"}>Tasks</h2>
                        <span className={"mr-2 text-xs text-slate-500"}>{ tasks.length }</span>
                        {!showingQuickTaskCreationForm && <button onClick={() => setShowingQuickTaskCreationForm(true)} className={"flex items-center text-xs text-slate-500 hover:bg-gray-100 hover:rounded-md h-6 p-2"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus mr-1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>Add Task</button>}
                    </div>
                    <div className={"text-xs text-slate-500 h-8 border-b border-b-slate-200 flex items-center"}>Name</div>
                    <ul>
                        {(!tasks.length || showingQuickTaskCreationForm) &&
                            <li key={"quickTaskCreationForm"} className={"border-b border-b-slate-200"}>
                                <form onSubmit={(e) => handleQuickTaskCreationFormSubmit(e)} className={"flex"}>
                                    <label htmlFor="quickTaskCreationFormTaskNameInput" className={"hidden"}></label>
                                    <input type="text" placeholder={"Task Name"} onFocus={() => setShowingQuickTaskCreationFormControls(true)} onBlur={(e) => handleQuickTaskCreationFormTaskNameInputBlur(e)} autoFocus required onChange={(e) => setTaskNameInput(e.target.value)} value={taskNameInput} id={"quickTaskCreationFormTaskNameInput"} className={"grow max-w-xl border-0 focus:ring-0 focus:outline-0 text-sm font-medium"} />
                                    {showingQuickTaskCreationFormControls &&
                                        <div className={"flex items-center"}>
                                            <button ref={quickTaskCreationFormSaveButton} className={"flex items-center gap-1 px-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-xs h-6"}>Save<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-corner-down-left"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg></button>
                                        </div>
                                    }
                                </form>
                            </li>
                        }
                        {tasks.map(task => <li key={task.id}>{task.name}</li>)}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
