import SavingTaskDataIndicator from "./Components/SavingTaskDataIndicator"
import TaskCreatedAtDate from "./Components/TaskCreatedAtDate"
import CopyTaskIdButton from "./Components/CopyTaskIdButton"
import VerticalSeparator from "./Components/VerticalSeparator"
import DeleteTaskButton from "./Components/DeleteTaskButton"
import CloseTaskButton from "./Components/CloseTaskButton"

export const Header = ({ task, isTaskUpdating }) => {
    return <>
        { isTaskUpdating && <SavingTaskDataIndicator />}
        <div className="border-b w-full h-12 flex justify-end items-center px-2">
            <TaskCreatedAtDate task={task} />
            <CopyTaskIdButton task={task} />
            <VerticalSeparator />
            <div className={"flex"}>
                <DeleteTaskButton task={task} />
                <CloseTaskButton />
            </div>
        </div>
    </>
}
