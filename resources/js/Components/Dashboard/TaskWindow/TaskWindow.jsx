import { router } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"

export const TaskWindow = ({ task, statuses }) => {
    const [taskNameInput, setTaskNameInput] = useState(task.name)
    const [isTaskUpdating, setIsTaskUpdating] = useState(false)
    const [taskDescriptionInput, setTaskDescriptionInput] = useState(task.description)

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

    const handleOverlayClick = (e) => {
        if (e.target.id === "task-window__overlay") {
            router.get(`/?${new URLSearchParams(window.location.search).toString()}`)
        }
    }

    return (
        <div id={"task-window__overlay"} onClick={(e) => handleOverlayClick(e)} className={"absolute inset-0 bg-black/75 flex justify-center items-start px-5 pt-5 pb-14"}>
            <div className={"flex flex-col grow bg-white h-full max-w-screen-2xl rounded-xl"}>
                <Header task={task} isTaskUpdating={isTaskUpdating} />
                <Form
                    task={task}
                    statuses={statuses}
                    taskNameInputValue={taskNameInput}
                    setTaskNameInputValue={setTaskNameInput}
                    taskDescriptionInputValue={taskDescriptionInput}
                    setTaskDescriptionInputValue={setTaskDescriptionInput}
                />
            </div>
        </div>
    )
}
