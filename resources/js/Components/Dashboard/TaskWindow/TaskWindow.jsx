import { router } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"

export const TaskWindow = ({ task, statuses }) => {
    const [formData, setFormData] = useState({
        name: task.name,
        description: task.description
    })
    const [isTaskUpdating, setIsTaskUpdating] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const firstRenderRef = useRef(true)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false

            return
        }

        setIsTaskUpdating(true)

        const timeout = setTimeout(() => {
            router.put(`/tasks/${task.id}`, formData, {
                onSuccess: () => {
                    setIsTaskUpdating(false)
                }
            })
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [formData])

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
                    formData={formData}
                    handleChange={handleChange}
                />
            </div>
        </div>
    )
}
