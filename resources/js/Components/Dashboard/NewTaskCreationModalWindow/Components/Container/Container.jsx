export const Container = ({ children }) => {
	return (
		<div
			className={
				"flex flex-col bg-white rounded-xl shadow-sm max-w-2xl flex-grow mt-36 z-10"
			}
		>
			{children}
		</div>
	)
}
