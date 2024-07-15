import { Link } from "@inertiajs/react"

export const PaginationControl = ({ children, url, disabled }) => {
	return (
		<Link
			href={url}
			as={"button"}
			disabled={disabled}
			className={
				"disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-300 rounded-lg p-2 hover:text-indigo-400 duration-150 border border-gray-200 hover:bg-gray-100"
			}
		>
			{children}
		</Link>
	)
}
