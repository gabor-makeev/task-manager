import { colors } from "../../../../../../../../constants/colors.js"
import { useState } from "react"
import { getStatusesByPriority, getStatusesByType } from "../../../../../../../../helpers/statusFormatters.js"
import { router } from "@inertiajs/react"
import Label from "./Components/Label"
import CompleteTaskButton from "./Components/CompleteTaskButton"
import NextTaskStatusButton from "./Components/NextTaskStatusButton"
import StatusButton from "./Components/StatusButton"
import ClickableOverlay from "../../../../../../GlobalComponents/ClickableOverlay"

export const TaskStatusSelector = ({ task, statuses }) => {
    const [isStatusDropdownActive, setIsStatusDropdownActive] = useState(false)

    const statusesByPriority = getStatusesByPriority(statuses)
    const statusesByType = getStatusesByType(statuses)

    const handleStatusChangeButtonClick = (statusId) => {
        router.put(`/tasks/${task.id}`, {
            status_id: statusId
        }, {
            onSuccess: () => {
                setIsStatusDropdownActive(false)
            }
        })
    }

    return (
        <div className={"mt-7 flex items-center gap-1 pl-1.5 pb-8 min-h-9"}>
            <Label />
            <div className={`flex max-w-72 py-1.5 pl-1.5 grow rounded-md ${isStatusDropdownActive ? "bg-gray-100" : ""}`}>
                <StatusButton
                    task={task}
                    statuses={statuses}
                    onClickHandler={() => setIsStatusDropdownActive(true)}
                />
                <NextTaskStatusButton task={task} statuses={statuses} />
                {statusesByPriority[task.status_id].type !== "closed" &&
                    <CompleteTaskButton task={task} statuses={statuses} />
                }
                {isStatusDropdownActive &&
                    <>
                        <ClickableOverlay onClick={() => setIsStatusDropdownActive(false)} />
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
    )
}
