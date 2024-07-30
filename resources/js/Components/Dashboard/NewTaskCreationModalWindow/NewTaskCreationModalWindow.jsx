import { router } from "@inertiajs/react"
import ClickableOverlay from "../../GlobalComponents/ClickableOverlay"
import Header from "./Components/Header"
import Form from "./Components/Form"
import Container from "./Components/Container"

export default function NewTaskCreationModalWindow({ user }) {
	const handleOverlayClick = () => {
		const urlParams = new URLSearchParams(window.location.search).toString()

		router.get(`/?${urlParams}`)
	}

	return (
		<div
			id={"new-task-creation-form__overlay"}
			className={
				"absolute inset-0 bg-violet-950/10 flex justify-center items-start"
			}
		>
			<ClickableOverlay onClick={() => handleOverlayClick()} />
			<Container>
				<Header />
				<Form user={user} />
			</Container>
		</div>
	)
}
