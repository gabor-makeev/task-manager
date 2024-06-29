import { router } from "@inertiajs/react"
import ClickableOverlay from "../../GlobalComponents/ClickableOverlay"
import Header from "./Components/Header"
import Form from "./Components/Form"

export default function NewTaskCreationModalWindow({ user }) {
    const handleOverlayClick = () => {
        router.get(`/?${new URLSearchParams(window.location.search).toString()}`)
    }

    return (
        <div id={"new-task-creation-form__overlay"} className={"absolute inset-0 bg-violet-950/10 flex justify-center items-start"}>
            <ClickableOverlay onClick={() => handleOverlayClick()} />
            <div className={"flex flex-col bg-white rounded-xl shadow-sm max-w-2xl flex-grow mt-36 z-10"}>
                <Header />
                <Form user={user} />
            </div>
        </div>
    )
}
