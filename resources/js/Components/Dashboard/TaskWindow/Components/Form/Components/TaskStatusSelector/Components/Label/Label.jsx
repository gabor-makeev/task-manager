export const Label = () => {
	return (
		<label
			htmlFor="status"
			className={
				"flex items-center w-32 gap-2 cursor-pointer text-sm text-slate-500"
			}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-disc stroke-gray-600 fill-white"
			>
				<circle cx="12" cy="12" r="9"></circle>
				<circle cx="12" cy="12" r="4"></circle>
			</svg>
			Status
		</label>
	)
}
