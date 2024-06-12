import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useRef, useState } from "react";
import NewTaskCreationForm from "../Components/NewTaskCreationForm";
import TaskWindow from "@/Components/TaskWindow.jsx";
import TaskListItem from "@/Components/TaskListItem.jsx";
import { getStatusesByPriority, getStatusesByType } from "../../helpers/statusFormatters.js";
import { getNextFilteringOption, getNextSortingOption } from "../../helpers/nextSortingAndFilteringOptionGetters.js";
import ShowClosedLink from "@/Components/Dashboard/ShowClosedLink";

export default function Dashboard({ auth, tasks, statuses, priorities, withNewTaskCreationForm, task }) {
    const [taskNameInput, setTaskNameInput] = useState("")
    const [showingQuickTaskCreationForm, setShowingQuickTaskCreationForm] = useState(false)
    const [showingQuickTaskCreationFormControls, setShowingQuickTaskCreationFormControls] = useState(false)

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const prioritySorting = urlParams.get('priority-sorting')
    const nextSortingOption = getNextSortingOption(prioritySorting)
    const showClosedFiltering = urlParams.get('show-closed-filtering')
    const nextShowClosedOption = getNextFilteringOption(showClosedFiltering)

    const formattedStatuses = getStatusesByPriority(statuses)
    const formattedStatusesByType = getStatusesByType(statuses)

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

        router.post(`/tasks?${new URLSearchParams(window.location.search).toString()}`, {
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
            {withNewTaskCreationForm &&
                <NewTaskCreationForm user={auth.user} />
            }
            {task &&
                <TaskWindow
                    task={task}
                    statuses={statuses}
                    formattedStatuses={formattedStatuses}
                    formattedStatusesByType={formattedStatusesByType}
                />
            }
            <div className={"px-2 py-3 flex justify-items-start"}>
                <ShowClosedLink link={`/?${nextShowClosedOption}`} isActive={showClosedFiltering === ''} />
            </div>
            <div className="py-12">
                <div className="sm:px-6 lg:px-8">
                    <div className={"flex font-semibold items-center h-8"}>
                        <h2 className={"mr-4 text-sm text-stone-800"}>Tasks</h2>
                        <span className={"mr-2 text-xs text-slate-500"}>{ tasks.length }</span>
                        {!showingQuickTaskCreationForm && <button onClick={() => setShowingQuickTaskCreationForm(true)} className={"flex items-center text-xs text-slate-500 hover:bg-gray-100 hover:rounded-md h-6 p-2"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus mr-1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>Add Task</button>}
                    </div>
                    <div className={"text-xs text-slate-500 h-8 border-b border-b-slate-200 flex items-center justify-between"}>
                        Name
                        <Link
                            href={`/?${nextSortingOption}`}
                            className={"max-w-40 grow mr-[80px] hover:bg-gray-100 h-full pl-2.5 pr-3 flex items-center gap-1"}
                        >Priority
                            { prioritySorting === 'desc' &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-arrow-down-circle duration-150 stroke-indigo-500 fill-indigo-100 hover:fill-indigo-200"}><circle cx="12" cy="12" r="10"></circle><polyline strokeWidth={"1.5"} points="8 12 12 16 16 12"></polyline><line strokeWidth={"1.5"} x1="12" y1="8" x2="12" y2="16"></line></svg>
                            }
                            { prioritySorting === 'asc' &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up-circle duration-150 stroke-indigo-500 fill-indigo-100 hover:fill-indigo-200"><circle cx="12" cy="12" r="10"></circle><polyline strokeWidth={"1.5"} points="16 12 12 8 8 12"></polyline><line strokeWidth={"1.5"} x1="12" y1="16" x2="12" y2="8"></line></svg> }
                        </Link>
                    </div>
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
                            <TaskListItem
                                key={task.id}
                                task={task}
                                priorities={priorities}
                                formattedStatuses={formattedStatuses}
                                formattedStatusesByType={formattedStatusesByType}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
