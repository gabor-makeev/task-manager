import { useRef } from "react";

export const CopyTaskIdButton = ({ task }) => {
    const copyIdButton = useRef(null)

    const handleCopyIdButtonClick = async (e) => {
        const initialButtonText = e.target.textContent

        await navigator.clipboard.writeText(task.id)

        e.target.textContent = "Copied"

        setTimeout(() => {
            e.target.textContent = initialButtonText
        }, 700)
    }

    return (
        <button
            onClick={(e) => handleCopyIdButtonClick(e)}
            ref={copyIdButton}
            className={"bg-indigo-500 active:bg-indigo-700 text-white text-sm font-medium px-3 rounded-md h-8 cursor-pointer hover:bg-indigo-600 mr-3 w-20"}>Copy ID
        </button>
    )
}
