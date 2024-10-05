export const IconedLabel = ({ htmlFor, svgIcon, labelText }) => {
	return (
		<label
			htmlFor={htmlFor}
			className={
				"flex items-center w-32 gap-2 cursor-pointer text-sm text-slate-500"
			}
		>
			{svgIcon}
			{labelText}
		</label>
	)
}
