import { Link, router } from "@inertiajs/react"
import { useRef } from "react"
import SavingTaskDataIndicator from "./Components/SavingTaskDataIndicator"

export const Header = ({ task, isTaskUpdating }) => {
    const taskCreatedAtDate = new Date(task.created_at)
    const formattedTaskCreatedAtMonth = taskCreatedAtDate.toLocaleString('default', { month: 'short' })
    const formattedTaskCreatedAtDay = taskCreatedAtDate.getDate()
    const formattedTaskCreatedAtDate = `${formattedTaskCreatedAtMonth} ${formattedTaskCreatedAtDay}`

    const copyIdButton = useRef(null)

    const handleCopyIdButtonClick = async (e) => {
        const initialButtonText = e.target.textContent

        await navigator.clipboard.writeText(task.id)

        e.target.textContent = "Copied"

        setTimeout(() => {
            e.target.textContent = initialButtonText
        }, 700)
    }

    const handleCloseButtonClick = (e) => {
        e.preventDefault()

        router.get(`/?${new URLSearchParams(window.location.search).toString()}`)
    }

    return <>
        { isTaskUpdating && <SavingTaskDataIndicator />}
        <div className="border-b w-full h-12 flex justify-end items-center px-2">
            <span className={"text-xs text-slate-600 mr-2"}>Created on { formattedTaskCreatedAtDate }</span>
            <button onClick={(e) => handleCopyIdButtonClick(e)} ref={copyIdButton} className={"bg-indigo-500 active:bg-indigo-700 text-white text-sm font-medium px-3 rounded-md h-8 cursor-pointer hover:bg-indigo-600 mr-3 w-20"}>Copy ID</button>
            <div className="bg-gray-200 w-px h-6 mr-3"></div>
            <div className={"flex"}>
                <Link href={`/tasks/${task.id}`} method={"delete"} as={"button"}  className={"duration-150 hover:bg-gray-100 rounded-lg w-8 h-8 flex items-center justify-center"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 stroke-red-700"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </Link>
                <button type={"button"} onClick={(e) => handleCloseButtonClick(e)} className={"duration-150 hover:bg-gray-100 rounded-lg w-8 h-8 flex items-center justify-center"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x stroke-slate-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>
    </>
}
