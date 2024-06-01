import {Link, router} from "@inertiajs/react";
import {useState} from "react";

export default function TaskListItem({ task, colors, priorities, formattedStatuses, formattedStatusesByType }) {
    const [isStatusDropdownActive, setIsStatusDropdownActive] = useState(false)
    const [isPriorityDropdownActive, setIsPriorityDropdownActive] = useState(false)

    const handleStatusChangeButtonClick = (statusId) => {
        router.put(`/tasks/${task.id}`, {
            status_id: statusId
        }, {
            onSuccess: () => {
                setIsStatusDropdownActive(false)
            }
        })
    }

    const handlePriorityChangeButtonClick = (priorityId) => {
        router.put(`/tasks/${task.id}`, {
            priority_id: priorityId
        }, {
            onSuccess: () => {
                setIsPriorityDropdownActive(false)
            }
        })
    }

    console.log(formattedStatuses[task.status_id])

    return (
        <li key={task.id} className={"flex min-h-9 border-b border-b-slate-200 hover:bg-gray-100 pl-7"}>
            <div className="mr-3 self-center flex">
                <button className={"self-center hover:bg-gray-200 p-1 duration-150 rounded"} onClick={() => setIsStatusDropdownActive(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-disc stroke-${colors[formattedStatuses[task.status_id].color].main} fill-transparent`}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6" className={`fill-${formattedStatuses[task.status_id].type === "not started" ? "transparent stroke-transparent" : colors[formattedStatuses[task.status_id].color].main}`}></circle></svg>
                </button>
                {isStatusDropdownActive &&
                    <>
                        <div className={"absolute inset-0"} onClick={() => setIsStatusDropdownActive(false)}></div>
                        <div className="min-w-44 absolute -ml-1.5 mt-11 bg-white rounded-md shadow-2xl text-xs">
                            {formattedStatusesByType['not started'] && formattedStatusesByType['not started'].length &&
                                <div className={"border-b pt-4 px-2 pb-2.5"}>
                                    <span className={"px-2 pb-1.5 text-slate-500 font-medium uppercase"}>not started</span>
                                    <ul className={"mt-1.5"}>
                                        {formattedStatusesByType['not started'].map(formattedNotStartedStatus => (
                                            <li key={formattedNotStartedStatus.id}><button onClick={() => handleStatusChangeButtonClick(formattedNotStartedStatus.id)} className={`flex items-center gap-2 w-full rounded-md hover:bg-gray-100 px-2 h-7 uppercase ${formattedNotStartedStatus.id === task.status_id ? "font-bold text-slate-800" : "text-slate-700 font-medium"}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-disc stroke-${colors[formattedNotStartedStatus.color].main} fill-transparent`}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6" className={"fill-transparent stroke-transparent"}></circle></svg><span className={"mr-auto"}>{formattedNotStartedStatus.name}</span>{formattedNotStartedStatus.id === task.status_id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="transparent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-check stroke-purple-900"}><polyline points="20 6 9 17 4 12"></polyline></svg>}</button></li>
                                        ))}
                                    </ul>
                                </div>
                            }
                            { formattedStatusesByType['active'] && formattedStatusesByType['active'].length &&
                                <div className={"border-b pt-4 px-2 pb-2.5"}>
                                    <span className={"px-2 pb-1.5 text-slate-500 font-medium uppercase"}>active</span>
                                    <ul className={"mt-1.5"}>
                                        {formattedStatusesByType['active'].map(formattedActiveStatus => (
                                            <li key={formattedActiveStatus.id}><button onClick={() => handleStatusChangeButtonClick(formattedActiveStatus.id)} className={`flex items-center gap-2 w-full rounded-md hover:bg-gray-100 px-2 h-7 uppercase ${formattedActiveStatus.id === task.status_id ? "font-bold text-slate-800" : "text-slate-700 font-medium"}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-disc stroke-${colors[formattedActiveStatus.color].main} fill-transparent`}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6" className={`fill-${colors[formattedActiveStatus.color].main}`}></circle></svg><span className={"mr-auto"}>{formattedActiveStatus.name}</span>{formattedActiveStatus.id === task.status_id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="transparent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-check stroke-purple-900"}><polyline points="20 6 9 17 4 12"></polyline></svg>}</button></li>
                                        ))}
                                    </ul>
                                </div>
                            }
                            { formattedStatusesByType['closed'] && formattedStatusesByType['closed'].length &&
                                <div>
                                    <ul>
                                        {formattedStatusesByType['closed'].map(formattedClosedStatus => (
                                            <li key={formattedClosedStatus.id}><button onClick={() => handleStatusChangeButtonClick(formattedClosedStatus.id)} className={`flex gap-2 w-full rounded-md hover:bg-gray-100 uppercase pt-2 pr-8 pb-2.5 pl-4 ${formattedClosedStatus.id === task.status_id ? "font-bold text-slate-800" : "text-slate-700 font-medium"}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-disc stroke-${colors[formattedClosedStatus.color].main} fill-${colors[formattedClosedStatus.color].main}`}><circle cx="12" cy="12" r="10"></circle></svg><span className={"mr-auto"}>{formattedClosedStatus.name}</span>{formattedClosedStatus.id === task.status_id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="transparent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-check stroke-purple-900"}><polyline points="20 6 9 17 4 12"></polyline></svg>}</button></li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
            <Link href={`/tasks/${task.id}`} className={"grow text-stone-800 hover:text-indigo-400 text-sm grid items-center"}>{task.name}</Link>
            <div className="mr-3 flex max-w-40 grow">
                <button onClick={() => setIsPriorityDropdownActive(true)} className={`flex gap-2 w-full items-center rounded-sm hover:ring-slate-300 hover:ring-1 pl-2.5 pr-3 ${isPriorityDropdownActive ? "bg-white ring-1 ring-indigo-500" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-flag stroke-${task.priority_id ? colors[priorities[task.priority_id - 1].color].main : "gray-300"} fill-${task.priority_id ? colors[priorities[task.priority_id - 1].color].main : "none"}`}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                    {task.priority_id && <span className={"capitalize"}>{priorities[task.priority_id - 1].name}</span>}
                </button>
                {isPriorityDropdownActive &&
                    <>
                        <div className={"absolute inset-0"} onClick={() => setIsPriorityDropdownActive(false)}></div>
                        <div className="min-w-44 absolute -ml-1.5 mt-11 bg-white rounded-md shadow-2xl text-xs">
                            <ul className={"mt-1.5 py-2 text-sm"}>
                                {priorities.map(priority => (
                                    <li key={priority.id} className={"px-2"}>
                                        <button onClick={() => handlePriorityChangeButtonClick(priority.id)} className={`flex items-center gap-2 w-full rounded-md hover:bg-gray-100 px-2 h-7 capitalize ${priority.id === task.priority_id ? "font-bold text-slate-800" : "text-slate-700"}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-flag stroke-${colors[priorities[priority.id - 1].color].main} fill-${colors[priorities[priority.id - 1].color].main}`}>
                                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>
                                            </svg>
                                            <span className={"mr-auto"}>{priority.name}</span>
                                            {task.priority_id && priority.id === task.priority_id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-check stroke-purple-900"}><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                        </button>
                                    </li>
                                ))}
                                <li className={"px-2 pt-2 border-t border-t-slate-200 mt-2"}>
                                    <button onClick={() => handlePriorityChangeButtonClick(null)} className={"flex items-center gap-2 w-full rounded-md hover:bg-gray-100 px-2 h-7 capitalize text-slate-700 font-medium"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-slash stroke-gray-500"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                                        <span className={"mr-auto"}>clear</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                }
            </div>
            <Link href={`/tasks/${task.id}`} method={"delete"} as={"button"}  className={"mx-5 p-1 hover:bg-gray-300 rounded self-center"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 stroke-red-700"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </Link>
        </li>
    )
}
