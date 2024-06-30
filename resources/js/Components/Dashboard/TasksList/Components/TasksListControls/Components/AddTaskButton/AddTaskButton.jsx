export const AddTaskButton = ({ addTaskButtonClickHandler }) => {
	return (
		<button
			onClick={addTaskButtonClickHandler}
			className={
				"flex items-center text-xs text-slate-500 hover:bg-gray-100 hover:rounded-md h-6 p-2"
			}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-plus mr-1"
			>
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
			Add Task
		</button>
	)
}
