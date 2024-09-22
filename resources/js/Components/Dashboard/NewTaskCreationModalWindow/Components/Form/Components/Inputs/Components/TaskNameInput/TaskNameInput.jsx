import { useEffect, useRef } from "react"

export const TaskNameInput = (props) => {
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef.current.focus()
	}, [])

	return (
		<input
			ref={inputRef}
			{...props}
			type="text"
			required
			name={"name"}
			className={
				"border-0 placeholder-slate-500 focus:ring-0 focus:outline-0 text-lg font-medium px-0 pt-0 pb-3 w-full"
			}
		/>
	)
}
