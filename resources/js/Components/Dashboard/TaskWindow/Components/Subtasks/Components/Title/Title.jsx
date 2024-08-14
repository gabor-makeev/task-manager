export const Title = ({ children }) => {
	return (
		<span
			className={
				"flex justify-center items-center flex-col h-9 px-2 leading-4 font-medium text-gray-900 duration-100 hover:bg-slate-100 rounded-md relative after:absolute after:h-0.5 after:w-full after:-bottom-2 after:bg-indigo-600"
			}
		>
			{children}
		</span>
	)
}
