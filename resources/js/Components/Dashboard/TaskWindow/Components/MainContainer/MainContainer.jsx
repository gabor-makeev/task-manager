export const MainContainer = ({ children }) => {
	return (
		<div className="grow">
			<div className="max-w-2xl mx-auto mt-6 flex flex-col">
				{children}
			</div>
		</div>
	)
}
