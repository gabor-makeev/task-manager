import SelectedPriorityCheckmark from "./Components/SelectedPriorityCheckmark"
import PriorityTitle from "./Components/PriorityTitle"
import PriorityFlag from "./Components/PriorityFlag"

export const SetPriorityButton = ({ task, priority, priorityColor, handlePriorityChangeButtonClick }) => {
    return (
        <li className={"px-2"}>
            <button onClick={() => handlePriorityChangeButtonClick(priority.id)} className={`flex items-center gap-2 w-full rounded-md hover:bg-gray-100 px-2 h-7 capitalize ${priority.id === task.priority_id ? "font-bold text-slate-800" : "text-slate-700"}`}>
                <PriorityFlag color={priorityColor} />
                <PriorityTitle>{ priority.name }</PriorityTitle>
                {task.priority_id && priority.id === task.priority_id && <SelectedPriorityCheckmark />}
            </button>
        </li>
    )
}
