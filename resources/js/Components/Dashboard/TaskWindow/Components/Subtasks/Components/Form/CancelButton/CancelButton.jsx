export const CancelButton = ({ handleClick, cancelButtonRef }) => {
	return (
		<button
			onClick={handleClick}
			ref={cancelButtonRef}
			type={"button"}
			className={
				"border rounded-md px-2 text-xs text-slate-500 font-medium h-6 mr-1 leading-4 hover:bg-slate-50"
			}
		>
			Cancel
		</button>
	)
}
