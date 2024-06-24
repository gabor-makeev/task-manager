import { router } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import { colors } from "../../../../constants/colors.js"
import { getStatusesByPriority, getStatusesByType } from "../../../../helpers/statusFormatters.js"
import TaskDescriptionTextarea from "../../GlobalComponents/TaskDescriptionTextarea"
import TaskNameField from "./Components/TaskNameField"
import Header from "@/Components/Dashboard/TaskWindow/Components/Header/index.js";

export const TaskWindow = ({ task, statuses }) => {
    // TODO: refactor this component
    const [taskNameInput, setTaskNameInput] = useState(task.name)
    const [isTaskUpdating, setIsTaskUpdating] = useState(false)
    const [isStatusDropdownActive, setIsStatusDropdownActive] = useState(false)
    const [showingDescriptionInput, setShowingDescriptionInput] = useState(false)
    const [taskDescriptionInput, setTaskDescriptionInput] = useState(task.description)

    const statusesByPriority = getStatusesByPriority(statuses);
    const statusesByType = getStatusesByType(statuses);


    const taskStatusColor = colors[statusesByPriority[task.status_id].color]

    const firstRenderRef = useRef(true)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false

            return
        }

        setIsTaskUpdating(true)

        const timeout = setTimeout(() => {
            router.put(`/tasks/${task.id}`, {
                name: taskNameInput,
                description: taskDescriptionInput
            }, {
                onSuccess: () => {
                    setIsTaskUpdating(false)
                }
            })
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [taskNameInput, taskDescriptionInput])

    useEffect(() => {
        if (task.description && !showingDescriptionInput) {
            setShowingDescriptionInput(true)
        }
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target.id === "task-window__overlay") {
            router.get(`/?${new URLSearchParams(window.location.search).toString()}`)
        }
    }

    const handleCopyIdButtonClick = async (e) => {
        const initialButtonText = e.target.textContent

        await navigator.clipboard.writeText(task.id)

        e.target.textContent = "Copied"

        setTimeout(() => {
            e.target.textContent = initialButtonText
        }, 700)
    }

    const handleStatusChangeButtonClick = (statusId) => {
        router.put(`/tasks/${task.id}`, {
            status_id: statusId
        }, {
            onSuccess: () => {
                setIsStatusDropdownActive(false)
            }
        })
    }

    const handleCompleteButtonClick = () => {
        router.put(`/tasks/${task.id}`, {
            status_id: statusesByType.closed[0].id
        })
    }

    const handleNextStatusButtonClick = () => {
        let exit = false

        statuses.forEach((status, index) => {
            if (status.name === statusesByPriority[task.status_id].name && statuses[index + 1]) {
                router.put(`/tasks/${task.id}`, {
                    status_id: statuses[index + 1].id
                })

                exit = true
            }
        })

        if (!exit) {
            router.put(`/tasks/${task.id}`, {
                status_id: statusesByType['not started'][0].id
            })
        }
    }

    return (
        <div id={"task-window__overlay"} onClick={(e) => handleOverlayClick(e)} className={"absolute inset-0 bg-black/75 flex justify-center items-start px-5 pt-5 pb-14"}>
            <div className={"flex flex-col grow bg-white h-full max-w-screen-2xl rounded-xl"}>
                <Header task={task} isTaskUpdating={isTaskUpdating} />
                <div className="grow">
                    <div className="max-w-2xl mx-auto mt-6 flex flex-col">
                        <div className={"flex text-xs"}>
                            <button disabled className={"border border-gray-300 rounded-l-md pt-1 pr-2 pb-1 pl-1 flex gap-1"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-disc stroke-white fill-gray-600"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle></svg>Task</button>
                            <button onClick={(e) => handleCopyIdButtonClick(e)} className={"border-y border-r border-gray-300 rounded-r-md px-2 py-1 hover:bg-gray-100"}>{ task.id }</button>
                        </div>
                        <TaskNameField value={taskNameInput} setValue={setTaskNameInput} />
                        <div className={"mt-7 flex items-center gap-1 pl-1.5 pb-8 min-h-9"}>
                            <label htmlFor="status" className={"flex items-center w-32 gap-2 cursor-pointer text-sm text-slate-500"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-disc stroke-gray-600 fill-white"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="4"></circle></svg>Status</label>
                            <div className={`flex max-w-72 py-1.5 pl-1.5 grow rounded-md ${isStatusDropdownActive ? "bg-gray-100" : ""}`}>
                                <button id={"status"} onClick={() => setIsStatusDropdownActive(true)} className={`flex items-center justify-center bg-${taskStatusColor.main} rounded-l h-6 border-r border-${taskStatusColor.contrast} text-xs uppercase text-${taskStatusColor.content} font-medium px-2`}>{statusesByPriority[task.status_id].name }</button>
                                <button onClick={handleNextStatusButtonClick} className={`w-6 h-6 flex items-center justify-center rounded-r bg-${taskStatusColor.main}`}><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" className={`fill-${taskStatusColor.content}`}><path d="M391.5-315.5v-329l251 164.5-251 164.5Z"/></svg></button>
                                {statusesByPriority[task.status_id].type !== "closed" && <button onClick={handleCompleteButtonClick} className={"ml-2 w-6 h-6 border border-gray-300 group hover:border-green-500 rounded flex justify-center items-center duration-200"}><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className={"fill-gray-300 group-hover:fill-green-500 duration-200"}><path d="M389-259.35 187.35-460l58.89-59.89L389-377.13l324.76-323.76L772.65-642 389-259.35Z"/></svg></button>}
                                {isStatusDropdownActive &&
                                    <>
                                        <div className={"absolute inset-0"} onClick={() => setIsStatusDropdownActive(false)}></div>
                                        <div className="min-w-44 absolute -ml-1.5 mt-11 bg-white rounded-md shadow-2xl text-xs">
                                            {statusesByType['not started'] && statusesByType['not started'].length &&
                                                <div className={"border-b pt-4 px-2 pb-2.5"}>
                                                    <span className={"px-2 pb-1.5 text-slate-500 font-medium uppercase"}>not started</span>
                                                    <ul className={"mt-1.5"}>
                                                        {statusesByType['not started'].map(formattedNotStartedStatus => (
                                                            <li key={formattedNotStartedStatus.id}><button onClick={() => handleStatusChangeButtonClick(formattedNotStartedStatus.id)} className={`flex items-center gap-2 w-full rounded-md hover:bg-gray-100 px-2 h-7 uppercase ${formattedNotStartedStatus.id === task.status_id ? "font-bold text-slate-800" : "text-slate-700 font-medium"}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-disc stroke-${colors[formattedNotStartedStatus.color].main} fill-transparent`}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6" className={"fill-transparent stroke-transparent"}></circle></svg><span className={"mr-auto"}>{formattedNotStartedStatus.name}</span>{formattedNotStartedStatus.id === task.status_id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-check stroke-purple-900"}><polyline points="20 6 9 17 4 12"></polyline></svg>}</button></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            }
                                            { statusesByType['active'] && statusesByType['active'].length &&
                                                <div className={"border-b pt-4 px-2 pb-2.5"}>
                                                    <span className={"px-2 pb-1.5 text-slate-500 font-medium uppercase"}>active</span>
                                                    <ul className={"mt-1.5"}>
                                                        {statusesByType['active'].map(formattedActiveStatus => (
                                                            <li key={formattedActiveStatus.id}><button onClick={() => handleStatusChangeButtonClick(formattedActiveStatus.id)} className={`flex items-center gap-2 w-full rounded-md hover:bg-gray-100 px-2 h-7 uppercase ${formattedActiveStatus.id === task.status_id ? "font-bold text-slate-800" : "text-slate-700 font-medium"}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-disc stroke-${colors[formattedActiveStatus.color].main} fill-white`}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6" className={`fill-${colors[formattedActiveStatus.color].main}`}></circle></svg><span className={"mr-auto"}>{formattedActiveStatus.name}</span>{formattedActiveStatus.id === task.status_id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-check stroke-purple-900"}><polyline points="20 6 9 17 4 12"></polyline></svg>}</button></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            }
                                            { statusesByType['closed'] && statusesByType['closed'].length &&
                                                <div>
                                                    <ul>
                                                        {statusesByType['closed'].map(formattedClosedStatus => (
                                                            <li key={formattedClosedStatus.id}><button onClick={() => handleStatusChangeButtonClick(formattedClosedStatus.id)} className={`flex gap-2 w-full rounded-md hover:bg-gray-100 uppercase pt-2 pr-8 pb-2.5 pl-4 ${formattedClosedStatus.id === task.status_id ? "font-bold text-slate-800" : "text-slate-700 font-medium"}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-disc stroke-${colors[formattedClosedStatus.color].main} fill-${colors[formattedClosedStatus.color].main}`}><circle cx="12" cy="12" r="10"></circle></svg><span className={"mr-auto"}>{formattedClosedStatus.name}</span>{formattedClosedStatus.id === task.status_id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-check stroke-purple-900"}><polyline points="20 6 9 17 4 12"></polyline></svg>}</button></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <TaskDescriptionTextarea
                            taskDescription={task.description}
                            bordered
                            value={taskDescriptionInput}
                            setValue={setTaskDescriptionInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
