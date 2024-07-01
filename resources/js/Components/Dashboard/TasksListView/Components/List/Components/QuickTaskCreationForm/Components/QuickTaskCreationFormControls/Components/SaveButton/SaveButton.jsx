export const SaveButton = ({ saveButtonRef }) => {
	return (
		<button
			ref={saveButtonRef}
			className={
				"flex items-center gap-1 px-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-xs h-6"
			}
		>
			Save
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-corner-down-left"
			>
				<polyline points="9 10 4 15 9 20"></polyline>
				<path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
			</svg>
		</button>
	)
}
