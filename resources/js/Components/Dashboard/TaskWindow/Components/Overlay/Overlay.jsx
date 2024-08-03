import { router } from "@inertiajs/react"

export const Overlay = ({ children }) => {
	const handleOverlayClick = (e) => {
		if (e.target.id === "task-window__overlay") {
			const urlParams = new URLSearchParams(
				window.location.search,
			).toString()

			router.get(`/?${urlParams}`)
		}
	}

	return (
		<div
			id={"task-window__overlay"}
			onClick={(e) => handleOverlayClick(e)}
			className={
				"absolute inset-0 bg-black/75 flex justify-center items-start px-5 pt-5 pb-14"
			}
		>
			{children}
		</div>
	)
}
