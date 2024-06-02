import {useRef, useState} from "react";
import {router} from "@inertiajs/react";

export default function NewTaskCreationForm({ user }) {
    const [showingDescriptionInput, setShowingDescriptionInput] = useState(false)
    const [taskNameInput, setTaskNameInput] = useState("")
    const [taskDescriptionInput, setTaskDescriptionInput] = useState("")

    const overlay = useRef(null)

    const handleOverlayClick = (e) => {
        if (e.target.id === "new-task-creation-form__overlay") {
            router.get(`/?${new URLSearchParams(window.location.search).toString()}`)
        }
    }

    const handleCloseButtonClick = (e) => {
        e.preventDefault()

        router.get(`/?${new URLSearchParams(window.location.search).toString()}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        router.post(`/tasks?${new URLSearchParams(window.location.search).toString()}`, {
            name: taskNameInput,
            description: taskDescriptionInput,
            'user_id': user.id
        })
    }

    const handleAddDescriptionButtonClick = () => {
        setShowingDescriptionInput(true)
    }

    return (
        <div id={"new-task-creation-form__overlay"} className={"absolute inset-0 bg-violet-950/10 flex justify-center items-start"} ref={overlay} onClick={(e) => handleOverlayClick(e)}>
            <form className={"flex flex-col bg-white rounded-xl shadow-sm max-w-2xl flex-grow mt-36"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"flex flex-col justify-center border-b px-6 h-12"}>
                    <button type={"button"} className={"p-1.5 self-end hover:bg-gray-100 duration-150 rounded-lg"} onClick={(e) => handleCloseButtonClick(e)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x stroke-slate-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                </div>
                <div className={"p-6 border-b"}>
                    <input type="text" required autoFocus name={"task-name"} placeholder={"Task name"} onChange={(e) => setTaskNameInput(e.target.value)} className={"border-0 placeholder-slate-500 focus:ring-0 focus:outline-0 text-lg font-medium px-0 pt-0 pb-3 w-full"} />
                    <div className={"flex"}>
                        {!showingDescriptionInput && <button onClick={handleAddDescriptionButtonClick} type={"button"} className={"group flex gap-2.5 text-slate-500 text-sm py-1.5 px-2 -mx-1.5 flex-grow hover:bg-gray-100 hover:text-slate-700 hover:rounded-md"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file stroke-slate-400 group-hover:stroke-slate-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>Add description</button>}
                        {showingDescriptionInput && <textarea name="task-description" rows="10" placeholder={"Add description"} onChange={(e) => setTaskDescriptionInput(e.target.value)} autoFocus className={"border-0 focus:ring-0 resize-none px-0 w-full"}></textarea>}
                    </div>
                </div>
                <div className="py-4 pr-4 pl-6 flex justify-end">
                    <input type="submit" value={"Create Task"} className={"bg-indigo-500 text-white px-3 rounded-md h-8 cursor-pointer hover:bg-indigo-600"} />
                </div>
            </form>
        </div>
    )
}
