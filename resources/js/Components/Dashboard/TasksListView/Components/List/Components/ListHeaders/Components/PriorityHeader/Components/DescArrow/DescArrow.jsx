export const DescArrow = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			strokeWidth="0.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={
				"feather feather-arrow-down-circle duration-150 stroke-indigo-500 fill-indigo-100 hover:fill-indigo-200"
			}
		>
			<circle cx="12" cy="12" r="10"></circle>
			<polyline strokeWidth={"1.5"} points="8 12 12 16 16 12"></polyline>
			<line strokeWidth={"1.5"} x1="12" y1="8" x2="12" y2="16"></line>
		</svg>
	)
}
