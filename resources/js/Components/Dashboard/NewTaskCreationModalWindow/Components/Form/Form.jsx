import { router } from "@inertiajs/react"
import { useState } from "react"
import Inputs from "./Components/Inputs"
import SubmitSection from "./Components/SubmitSection"

export const Form = ({ user }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	})

	const handleSubmit = (e) => {
		e.preventDefault()

		router.post(
			`/tasks?${new URLSearchParams(window.location.search).toString()}`,
			{
				...formData,
				user_id: user.id,
			},
		)
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<Inputs formData={formData} setFormData={setFormData} />
			<SubmitSection />
		</form>
	)
}
