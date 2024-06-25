export const TaskIdButton = ({ task }) => {
    const handleCopyIdButtonClick = async (e) => {
        const initialButtonText = e.target.textContent

        await navigator.clipboard.writeText(task.id)

        e.target.textContent = "Copied"

        setTimeout(() => {
            e.target.textContent = initialButtonText
        }, 700)
    }

    return <button onClick={(e) => handleCopyIdButtonClick(e)} className={"border-y border-r border-gray-300 rounded-r-md px-2 py-1 hover:bg-gray-100"}>{ task.id }</button>
}
