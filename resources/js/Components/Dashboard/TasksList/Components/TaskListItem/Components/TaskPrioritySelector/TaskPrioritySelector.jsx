import { colors } from "../../../../../../../../constants/colors.js"
import { useState } from "react"
import { router } from "@inertiajs/react"
import PriorityButton from "./Components/PriorityButton"
import ClickableOverlay from "../../../../../../GlobalComponents/ClickableOverlay"

export const TaskPrioritySelector = ({ task, priorities }) => {
    const [isPriorityDropdownActive, setIsPriorityDropdownActive] = useState(false)

    const handlePriorityChangeButtonClick = (priorityId) => {
        router.put(`/tasks/${task.id}`, {
            priority_id: priorityId
        }, {
            onSuccess: () => {
                setIsPriorityDropdownActive(false)
            }
        })
    }

    return (
        <div className="mr-3 flex max-w-40 grow">
            <PriorityButton
                task={task}
                priorities={priorities}
                buttonClickHandler={() => setIsPriorityDropdownActive(true)}
                isActive={isPriorityDropdownActive}
            />
            {isPriorityDropdownActive &&
                <>
                    <ClickableOverlay onClick={() => setIsPriorityDropdownActive(false)} />
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
    )
}
