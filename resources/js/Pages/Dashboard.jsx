import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import {useRef, useState} from "react";
import NewTaskCreationForm from "@/Components/NewTaskCreationForm.jsx";
import TaskWindow from "@/Components/TaskWindow.jsx";

export default function Dashboard({ auth, tasks, withNewTaskCreationForm, task }) {
    const [taskNameInput, setTaskNameInput] = useState("")
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

        router.post('/tasks', {
            name: taskNameInput,
            'user_id': auth.user.id
        })

        setTaskNameInput("")
        setShowingQuickTaskCreationForm(false)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            {withNewTaskCreationForm && <NewTaskCreationForm user={auth.user} />}
            {task && <TaskWindow task={task} />}

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
                                            <button ref={quickTaskCreationFormSaveButton} className={"flex items-center gap-1 px-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-xs h-6"}>Save<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-corner-down-left"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg></button>
                                        </div>
                                    }
                                </form>
                            </li>
                        }
                        {tasks.map(task => (
                            <li key={task.id} className={"flex min-h-9 border-b border-b-slate-200 hover:bg-gray-100 pl-7"}>
                                <Link as={"button"} className="mr-3 self-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle stroke-slate-500 hover:fill-gray-200"><circle cx="12" cy="12" r="10"></circle></svg>
                                </Link>
                                <Link href={`/tasks/${task.id}`} className={"grow text-stone-800 hover:text-indigo-400 text-sm grid items-center"}>{task.name}</Link>
                                <Link as={"button"} href={`/tasks/${task.id}`} method={"delete"} className={"mx-5 p-1 hover:bg-gray-300 rounded self-center"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 stroke-red-700"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
