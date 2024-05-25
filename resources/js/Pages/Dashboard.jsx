import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import {useRef, useState} from "react";
import NewTaskCreationForm from "@/Components/NewTaskCreationForm.jsx";
import TaskWindow from "@/Components/TaskWindow.jsx";
import TaskListItem from "@/Components/TaskListItem.jsx";

export default function Dashboard({ auth, tasks, statuses, withNewTaskCreationForm, task }) {
    const colors = {
        'purple': {
            'main': 'purple-900',
            'contrast': 'stone-800',
            'content': 'white'
        },
        'blue': {
            'main': 'blue-500',
            'contrast': 'stone-800',
            'content': 'white'
        },
        'yellow': {
            'main': 'yellow-400',
            'contrast': 'gray-300',
            'content': 'gray-600'
        },
        'green': {
            'main': 'green-700',
            'contrast': 'stone-800',
            'content': 'white'
        },
        'orange': {
            'main': 'orange-500',
            'contrast': 'stone-800',
            'content': 'white'
        },
        'red': {
            'main': 'red-500',
            'contrast': 'stone-800',
            'content': 'white'
        },
        'gray': {
            'main': 'gray-300',
            'contrast': 'gray-400',
            'content': 'gray-600'
        }
    }

    const formattedStatuses = statuses
        .sort((a, b) => {
            const statusTypePriority = {
                'not started': 0,
                'active': 1,
                'closed': 2
            }

            if (statusTypePriority[a.type] > statusTypePriority[b.type]) {
                return 1
            } else if (statusTypePriority[a.type] < statusTypePriority[b.type]) {
                return -1
            }

            return 0
        })
        .reduce((a, v) => ({...a, [v.id]: v}), {})

    const formattedStatusesByType = statuses.reduce((a, v) => {
        if (v.type in a) {
            return {...a, [v.type]: [...a[v.type], v]}
        }

        return {...a, [v.type]: [v] }
    }, {})

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
            {task && <TaskWindow task={task} statuses={statuses} formattedStatuses={formattedStatuses} formattedStatusesByType={formattedStatusesByType} colors={colors} />}

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
                            <TaskListItem key={task.id} task={task} colors={colors} formattedStatuses={formattedStatuses} formattedStatusesByType={formattedStatusesByType} />
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
