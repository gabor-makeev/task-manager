import SelectOptionsStatusTypeTitle from "./Components/SelectOptionsStatusTypeTitle"
import SelectOptionsStatusesList from "./Components/SelectOptionsStatusesList"

export const StatusSelectionDropdown = ({
	task,
	statusesData,
	statusOptionClickHandler,
}) => {
	const sortedStatuses = [...statusesData.statuses].sort(
		(a, b) => a.position - b.position,
	)

	const sortedStatusTypes = [...statusesData.statusTypes].sort(
		(a, b) => a.position - b.position,
	)

	return (
		<div className="min-w-44 absolute -ml-1.5 mt-11 bg-white rounded-md shadow-2xl text-xs">
			{sortedStatusTypes.map((statusType) => (
				<div
					key={statusType.id}
					className={`${statusType.name !== "closed" ? "border-b pt-4 px-2 pb-2.5" : ""}`}
				>
					{statusType.name !== "closed" && (
						<SelectOptionsStatusTypeTitle>
							{statusType.name}
						</SelectOptionsStatusTypeTitle>
					)}
					<SelectOptionsStatusesList
						task={task}
						statuses={sortedStatuses.filter(
							(status) => status.status_type_id === statusType.id,
						)}
						statusOptionClickHandler={statusOptionClickHandler}
						statusType={statusType}
					/>
				</div>
			))}
		</div>
	)
}
