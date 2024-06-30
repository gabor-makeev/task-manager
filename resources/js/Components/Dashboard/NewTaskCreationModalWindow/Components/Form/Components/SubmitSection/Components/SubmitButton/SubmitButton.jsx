export const SubmitButton = (props) => {
	return (
		<input
			{...props}
			type="submit"
			className={
				"bg-indigo-500 text-white px-3 rounded-md h-8 cursor-pointer hover:bg-indigo-600"
			}
		/>
	)
}
