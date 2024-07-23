export const AddSubtaskButton = (props) => {
	return (
		<button
			{...props}
			className={"h-9 flex items-center w-full pl-7 hover:bg-gray-100"}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-plus stroke-slate-500"
			>
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
			<span className={"ml-2 text-xs text-slate-500"}>Add subtask</span>
		</button>
	)
}
