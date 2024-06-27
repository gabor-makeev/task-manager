import { useState } from "react"
import { getStatusesByPriority } from "../../../../../../../../helpers/statusFormatters.js"
import Label from "./Components/Label"
import CompleteTaskButton from "./Components/CompleteTaskButton"
import NextTaskStatusButton from "./Components/NextTaskStatusButton"
import StatusButton from "./Components/StatusButton"
import ClickableOverlay from "../../../../../../GlobalComponents/ClickableOverlay"
import StatusesDropdown from "./Components/StatusesDropdown"

export const TaskStatusSelector = ({ task, statuses }) => {
    const [isStatusDropdownActive, setIsStatusDropdownActive] = useState(false)

    const statusesByPriority = getStatusesByPriority(statuses)

    return (
        <div className={"mt-7 flex items-center gap-1 pl-1.5 pb-8 min-h-9"}>
            <Label />
            <div className={`flex max-w-72 py-1.5 pl-1.5 grow rounded-md ${isStatusDropdownActive ? "bg-gray-100" : ""}`}>
                <StatusButton
                    task={task}
                    statuses={statuses}
                    onClickHandler={() => setIsStatusDropdownActive(true)}
                />
                <NextTaskStatusButton task={task} statuses={statuses} />
                {statusesByPriority[task.status_id].type !== "closed" &&
                    <CompleteTaskButton task={task} statuses={statuses} />
                }
                {isStatusDropdownActive &&
                    <>
                        <ClickableOverlay onClick={() => setIsStatusDropdownActive(false)} />
                        <StatusesDropdown
                            task={task}
                            statuses={statuses}
                            setIsStatusDropdownActive={setIsStatusDropdownActive}
                        />
                    </>
                }
            </div>
        </div>
    )
}
