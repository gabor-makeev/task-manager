import { Link } from "@inertiajs/react"

export const ParentTaskLink = ({ id }) => {
	const urlParams = window.location.href.split("?")[1]

	return (
		<Link
			href={route("tasks.show", id + (urlParams ? `?${urlParams}` : ""))}
			className={"flex items-center p-2 hover:bg-slate-100 rounded-md"}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28"
				viewBox="0 0 24 24"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-link stroke-slate-700 fill-none"
			>
				<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
				<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
			</svg>
		</Link>
	)
}
