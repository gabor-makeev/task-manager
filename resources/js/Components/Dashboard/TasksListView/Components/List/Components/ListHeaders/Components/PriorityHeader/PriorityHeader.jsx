import { Link } from "@inertiajs/react"
import { getNextSortingOption } from "../../../../../../../../../../helpers/nextSortingAndFilteringOptionGetters.js"
import AscArrow from "./Components/AscArrow"
import DescArrow from "./Components/DescArrow"

export const PriorityHeader = () => {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const prioritySorting = urlParams.get("priority-sorting")
	const nextSortingOption = getNextSortingOption(prioritySorting)

	return (
		<Link
			href={`/?${nextSortingOption}`}
			className={
				"max-w-40 grow mr-[80px] hover:bg-gray-100 h-full pl-2.5 pr-3 flex items-center gap-1"
			}
		>
			Priority
			{prioritySorting === "desc" && <DescArrow />}
			{prioritySorting === "asc" && <AscArrow />}
		</Link>
	)
}
