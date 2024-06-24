import { router } from "@inertiajs/react"
import SavingTaskDataIndicator from "./Components/SavingTaskDataIndicator"
import TaskCreatedAtDate from "./Components/TaskCreatedAtDate"
import CopyTaskIdButton from "./Components/CopyTaskIdButton"
import VerticalSeparator from "./Components/VerticalSeparator"
import DeleteTaskButton from "./Components/DeleteTaskButton"

export const Header = ({ task, isTaskUpdating }) => {
    const handleCloseButtonClick = (e) => {
        e.preventDefault()

        router.get(`/?${new URLSearchParams(window.location.search).toString()}`)
    }

    return <>
        { isTaskUpdating && <SavingTaskDataIndicator />}
        <div className="border-b w-full h-12 flex justify-end items-center px-2">
            <TaskCreatedAtDate task={task} />
            <CopyTaskIdButton task={task} />
            <VerticalSeparator />
            <div className={"flex"}>
                <DeleteTaskButton task={task} />
                <button type={"button"} onClick={(e) => handleCloseButtonClick(e)} className={"duration-150 hover:bg-gray-100 rounded-lg w-8 h-8 flex items-center justify-center"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x stroke-slate-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>
    </>
}
