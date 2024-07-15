import { Link } from "@inertiajs/react"
import PaginationControl from "./Components/PaginationControl"

export const Pagination = ({
	currentPage,
	firstPageUrl,
	lastPage,
	lastPageUrl,
	nextPageUrl,
	prevPageUrl,
}) => {
	const urlParams = window.location.href.split("?")[1]
	const UrlParamsWithoutPagination = urlParams
		? urlParams.replace(/&?page=[0-9]*/g, "")
		: ""

	return (
		<ul className={"flex gap-4 mt-8"}>
			<li>
				<PaginationControl
					url={firstPageUrl + "&" + UrlParamsWithoutPagination}
					disabled={currentPage === 1}
				>
					First page
				</PaginationControl>
			</li>
			<li>
				<PaginationControl
					url={prevPageUrl + "&" + UrlParamsWithoutPagination}
					disabled={currentPage === 1}
				>
					Previous page
				</PaginationControl>
			</li>
			<li>
				<Link as={"button"} disabled>
					{currentPage}
				</Link>
			</li>
			<li>
				<PaginationControl
					url={nextPageUrl + "&" + UrlParamsWithoutPagination}
					disabled={currentPage === lastPage}
				>
					Next page
				</PaginationControl>
			</li>
			<li>
				<PaginationControl
					url={lastPageUrl + "&" + UrlParamsWithoutPagination}
					disabled={currentPage === lastPage}
				>
					Last page
				</PaginationControl>
			</li>
		</ul>
	)
}
