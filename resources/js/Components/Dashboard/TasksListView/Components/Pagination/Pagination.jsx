import { Link } from "@inertiajs/react"

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
				<Link
					href={firstPageUrl + "&" + UrlParamsWithoutPagination}
					as={"button"}
					disabled={currentPage === 1}
				>
					First page
				</Link>
			</li>
			<li>
				<Link
					href={prevPageUrl + "&" + UrlParamsWithoutPagination}
					as={"button"}
					disabled={currentPage === 1}
				>
					Previous page
				</Link>
			</li>
			<li>
				<Link as={"button"} disabled>
					{currentPage}
				</Link>
			</li>
			<li>
				<Link
					href={nextPageUrl + "&" + UrlParamsWithoutPagination}
					as={"button"}
					disabled={currentPage === lastPage}
				>
					Next page
				</Link>
			</li>
			<li>
				<Link
					href={lastPageUrl + "&" + UrlParamsWithoutPagination}
					as={"button"}
					disabled={currentPage === lastPage}
				>
					Last page
				</Link>
			</li>
		</ul>
	)
}
