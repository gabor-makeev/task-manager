export const TaskNameField = (props) => {
	return (
		<input
			{...props}
			type="text"
			name={"name"}
			className={
				"w-full mt-6 text-3xl font-bold text-gray-900 border-0 focus:ring-0"
			}
		/>
	)
}
