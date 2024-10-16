import Item from "./Components/Item"

export const SelectOptionsStatusesList = ({
	task,
	statuses,
	statusOptionClickHandler,
	statusType,
}) => {
	const isStatusTypeClosed = statusType.name === "closed"

	return (
		<ul className={`${!isStatusTypeClosed ? "mt-1.5" : ""}`}>
			{statuses.map((status) => (
				<Item
					key={status.id}
					task={task}
					status={status}
					statusType={statusType}
					itemClickHandler={statusOptionClickHandler}
				/>
			))}
		</ul>
	)
}
