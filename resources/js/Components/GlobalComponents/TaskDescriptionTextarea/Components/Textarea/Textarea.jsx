export const Textarea = ({
	name,
	placeholder,
	value,
	handleChange,
	autoFocus,
	isNewTask = false,
}) => {
	return (
		<textarea
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			autoFocus={autoFocus}
			rows="10"
			className={`flex border-0 focus:ring-0 resize-none ${!isNewTask ? "pl-5" : "p-0"} w-full`}
		></textarea>
	)
}
