import {useRef, useState} from "react"
import {router} from "@inertiajs/react"
import FormSubmit from "./Components/FormSubmit"
import FormDescriptionInput from "./Components/FormTaskDescriptionInput"
import FormTaskNameInput from "./Components/FormTaskNameInput"
import FormCloseButton from "@/Components/NewTaskCreationForm/Components/FormCloseButton/index.js";

export default function NewTaskCreationForm({ user }) {
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

    return (
        <div id={"new-task-creation-form__overlay"} className={"absolute inset-0 bg-violet-950/10 flex justify-center items-start"} ref={overlay} onClick={(e) => handleOverlayClick(e)}>
            <form className={"flex flex-col bg-white rounded-xl shadow-sm max-w-2xl flex-grow mt-36"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"flex flex-col justify-center border-b px-6 h-12"}>
                    <FormCloseButton clickHandler={handleCloseButtonClick} />
                </div>
                <div className={"p-6 border-b"}>
                    <FormTaskNameInput
                        placeholder={"Task name"}
                        value={taskNameInput}
                        setValue={setTaskNameInput}
                    />
                    <div className={"flex"}>
                        <FormDescriptionInput
                            emptyTextareaText={"Add description"}
                            value={taskDescriptionInput}
                            setValue={setTaskDescriptionInput}
                        />
                    </div>
                </div>
                <div className="py-4 pr-4 pl-6 flex justify-end">
                    <FormSubmit value={"Create Task"} />
                </div>
            </form>
        </div>
    )
}
