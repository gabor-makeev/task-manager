import TaskNameField from "./Components/TaskNameField"
import TaskDescriptionTextarea from "../../../../GlobalComponents/TaskDescriptionTextarea"
import TaskBadges from "./Components/TaskBadges"
import TaskStatusSelector from "./Components/TaskStatusSelector"

export const Form = ({ task, statuses, taskNameInputValue, setTaskNameInputValue, taskDescriptionInputValue, setTaskDescriptionInputValue }) => {
    return (
        <div className="grow">
            <div className="max-w-2xl mx-auto mt-6 flex flex-col">
                <TaskBadges task={task} />
                <TaskNameField value={taskNameInputValue} setValue={setTaskNameInputValue} />
                <TaskStatusSelector task={task} statuses={statuses} />
                <TaskDescriptionTextarea
                    taskDescription={task.description}
                    bordered
                    value={taskDescriptionInputValue}
                    setValue={setTaskDescriptionInputValue}
                />
            </div>
        </div>
    )
}
