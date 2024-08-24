import { Link } from "@inertiajs/react"

export const ParentTaskLink = ({ task }) => {
	const urlParams = window.location.href.split("?")[1]

	return (
		<div className={"flex justify-start"}>
			<Link
				href={route(
					"tasks.show",
					task.id + (urlParams ? `?${urlParams}` : ""),
				)}
				className={
					"flex items-center font-medium text-xs leading-4 text-slate-700 mb-4 px-2 h-6 hover:bg-slate-100 rounded"
				}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-corner-left-up stroke-black fill-none mr-1"
				>
					<polyline points="14 9 9 4 4 9"></polyline>
					<path d="M20 20h-7a4 4 0 0 1-4-4V4"></path>
				</svg>
				{task.name}
			</Link>
		</div>
	)
}
