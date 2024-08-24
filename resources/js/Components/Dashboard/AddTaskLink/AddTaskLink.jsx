import { Link } from "@inertiajs/react"

export const AddTaskLink = () => {
	const urlParams = window.location.href.split("?")[1]

	return (
		<Link
			href={route("tasks.create", urlParams ? urlParams + "&" : "")}
			className="flex items-center bg-indigo-500 text-white px-3 rounded-md h-8 cursor-pointer hover:bg-indigo-600"
		>
			Add task
		</Link>
	)
}
