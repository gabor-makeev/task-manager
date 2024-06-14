import { colors } from "../../../../../../../../../../constants/colors.js"

export const SelectButton = ({ task, statusesByPriority, buttonClickHandler }) => {
    return (
        <button
            onClick={buttonClickHandler}
            className={"self-center hover:bg-gray-200 p-1 duration-150 rounded"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`feather feather-disc stroke-${colors[statusesByPriority[task.status_id].color].main} fill-transparent`}
            >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6" className={`fill-${statusesByPriority[task.status_id].type === "not started" ? "transparent stroke-transparent" : colors[statusesByPriority[task.status_id].color].main}`}></circle>
            </svg>
        </button>
    )
}
