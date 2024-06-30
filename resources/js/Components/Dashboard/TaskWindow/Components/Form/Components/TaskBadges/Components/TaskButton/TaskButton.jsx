export const TaskButton = () => {
	return (
		<button
			disabled
			className={
				"border border-gray-300 rounded-l-md pt-1 pr-2 pb-1 pl-1 flex gap-1"
			}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-disc stroke-white fill-gray-600"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<circle cx="12" cy="12" r="6"></circle>
			</svg>
			Task
		</button>
	)
}
