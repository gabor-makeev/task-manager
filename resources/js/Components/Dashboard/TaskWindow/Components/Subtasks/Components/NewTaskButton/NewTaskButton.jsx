export const NewTaskButton = (props) => {
	return (
		<button
			{...props}
			className={
				"w-full h-10 flex items-center pl-4 pr-2 hover:bg-slate-50"
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
				className="feather feather-plus mr-3 stroke-slate-500"
			>
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
			<span
				className={"text-slate-500 font-medium text-sm leading-[14px]"}
			>
				New Task
			</span>
		</button>
	)
}
