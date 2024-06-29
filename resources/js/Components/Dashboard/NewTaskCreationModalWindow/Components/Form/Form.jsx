import Inputs from "./Components/Inputs"
import { router } from "@inertiajs/react"
import { useState } from "react"
import SubmitSection from "./Components/SubmitSection"

export const Form = ({ user }) => {
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

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Inputs formData={formData} handleChange={handleChange} />
            <SubmitSection />
        </form>
    )
}
