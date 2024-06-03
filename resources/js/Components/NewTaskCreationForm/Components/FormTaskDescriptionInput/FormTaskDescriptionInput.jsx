import {useState} from "react";

export const FormTaskDescriptionInput = ({ emptyTextareaText, value, setValue }) => {
    const [showingDescriptionInput, setShowingDescriptionInput] = useState(false)
    const handleAddDescriptionButtonClick = () => {
        setShowingDescriptionInput(true)
    }

    return (
        <>
            {!showingDescriptionInput &&
                <button
                    onClick={handleAddDescriptionButtonClick}
                    type={"button"}
                    className={"group flex gap-2.5 text-slate-500 text-sm py-1.5 px-2 -mx-1.5 flex-grow hover:bg-gray-100 hover:text-slate-700 hover:rounded-md"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-file stroke-slate-400 group-hover:stroke-slate-500"
                    >
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    { emptyTextareaText }
                </button>
            }
            {showingDescriptionInput &&
                <textarea
                    name="task-description"
                    rows="10"
                    placeholder={emptyTextareaText}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                    className={"border-0 focus:ring-0 resize-none px-0 w-full"}
                ></textarea>
            }
        </>
    )
}
