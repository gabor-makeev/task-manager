export const TaskNameInput = (props) => {
	return (
		<>
			<label
				htmlFor="quickTaskCreationFormTaskNameInput"
				className={"hidden"}
			></label>
			<input
				{...props}
				type="text"
				placeholder={"Task Name"}
				className={
					"grow max-w-xl border-0 focus:ring-0 focus:outline-0 text-sm font-medium"
				}
			/>
		</>
	)
}
