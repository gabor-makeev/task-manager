import { useState } from "react"
import { router } from "@inertiajs/react"
import ClickableOverlay from "../../GlobalComponents/ClickableOverlay"
import Header from "./Components/Header"
import Inputs from "./Components/Inputs"
import Footer from "./Components/Footer"

export default function NewTaskCreationForm({ user }) {
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        router.post(`/tasks?${new URLSearchParams(window.location.search).toString()}`, {
            ...formData,
            'user_id': user.id
        })
    }

    const handleOverlayClick = () => {
        router.get(`/?${new URLSearchParams(window.location.search).toString()}`)
    }

    return (
        <div id={"new-task-creation-form__overlay"} className={"absolute inset-0 bg-violet-950/10 flex justify-center items-start"}>
            <ClickableOverlay onClick={() => handleOverlayClick()} />
            <form className={"flex flex-col bg-white rounded-xl shadow-sm max-w-2xl flex-grow mt-36 z-10"} onSubmit={(e) => handleSubmit(e)}>
                <Header />
                <Inputs formData={formData} handleChange={handleChange} />
                <Footer />
            </form>
        </div>
    )
}
