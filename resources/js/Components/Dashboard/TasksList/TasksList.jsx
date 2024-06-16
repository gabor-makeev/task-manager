import { useRef, useState } from "react"
import { Link, router } from "@inertiajs/react"
import TaskListItem from "./Components/TaskListItem"
import { getNextSortingOption } from "../../../../helpers/nextSortingAndFilteringOptionGetters.js"
import { getStatusesByPriority, getStatusesByType } from "../../../../helpers/statusFormatters.js"
import TasksListControls from "./Components/TasksListControls"

export const TasksList = ({ auth, tasks, priorities, statuses }) => {
    // TODO: refactor this component
    const [taskNameInput, setTaskNameInput] = useState("")
    const [showingQuickTaskCreationForm, setShowingQuickTaskCreationForm] = useState(false)
    const [showingQuickTaskCreationFormControls, setShowingQuickTaskCreationFormControls] = useState(false)

    const quickTaskCreationFormSaveButton = useRef(null)

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const prioritySorting = urlParams.get('priority-sorting')
    const nextSortingOption = getNextSortingOption(prioritySorting)

    const statusesByPriority = getStatusesByPriority(statuses)
    const statusesByType = getStatusesByType(statuses)

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
        <div className="py-12">
            <div className="sm:px-6 lg:px-8">
                <TasksListControls
                    tasks={tasks}
                    showAddTaskButton={!showingQuickTaskCreationForm}
                    addTaskButtonClickHandler={() => setShowingQuickTaskCreationForm(true)}
                />
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
                            statusesByPriority={statusesByPriority}
                            statusesByType={statusesByType}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}
