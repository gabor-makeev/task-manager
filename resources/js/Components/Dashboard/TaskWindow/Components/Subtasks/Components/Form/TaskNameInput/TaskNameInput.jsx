export const TaskNameInput = (props) => {
	return (
		<input
			{...props}
			type="text"
			name={"name"}
			autoFocus
			required
			placeholder={"New subtask"}
			className={
				"border-0 grow p-0 h-8 focus:ring-0 text-sm leading-4 font-medium"
			}
		/>
	)
}
