import { Link } from "@inertiajs/react"

export const TaskLink = ({ task }) => {
	const urlParams = window.location.href.split("?")[1]

	return (
		<Link
			href={route(
				"task.show",
				task.id + (urlParams ? `?${urlParams}` : ""),
			)}
			className={
				"grow text-stone-800 hover:text-indigo-400 text-sm grid items-center"
			}
		>
			{task.name}
		</Link>
	)
}
