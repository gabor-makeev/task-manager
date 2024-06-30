export const TaskNameInput = (props) => {
	return (
		<input
			{...props}
			type="text"
			required
			autoFocus
			name={"name"}
			className={
				"border-0 placeholder-slate-500 focus:ring-0 focus:outline-0 text-lg font-medium px-0 pt-0 pb-3 w-full"
			}
		/>
	)
}
