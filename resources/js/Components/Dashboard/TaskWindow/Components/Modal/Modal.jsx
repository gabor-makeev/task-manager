export const Modal = ({ children }) => {
	return (
		<div
			className={
				"flex flex-col grow bg-white h-full max-w-screen-2xl rounded-xl"
			}
		>
			{children}
		</div>
	)
}
