import SelectOptionsStatusTypeTitle from "./Components/SelectOptionsStatusTypeTitle"
import SelectOptionsStatusesList from "./Components/SelectOptionsStatusesList"

export const StatusSelectionDropdown = ({ task, statusesByType, statusOptionClickHandler }) => {
    const statusTypes = Object.keys(statusesByType)

    return (
        <div className="min-w-44 absolute -ml-1.5 mt-11 bg-white rounded-md shadow-2xl text-xs">
            {statusTypes.map((statusTypeName, idx) => (
                <div key={idx} className={`${statusTypeName !== "closed" ? "border-b pt-4 px-2 pb-2.5" : ""}`}>
                    {statusTypeName !== "closed" && <SelectOptionsStatusTypeTitle>{ statusTypeName }</SelectOptionsStatusTypeTitle>}
                    <SelectOptionsStatusesList
                        task={task}
                        statuses={statusesByType[statusTypeName]}
                        statusOptionClickHandler={statusOptionClickHandler}
                        isStatusTypeClosed={statusTypeName === "closed"}
                    />
                </div>
            ))}
        </div>
    )
}
