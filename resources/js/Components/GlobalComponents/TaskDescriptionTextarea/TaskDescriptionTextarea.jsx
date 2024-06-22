import { useEffect, useState } from "react"
import Textarea from "./Components/Textarea"
import AddTextButton from "./Components/AddTextButton"

export const TaskDescriptionTextarea = ({ taskDescription = '', isNewTask = false, value, setValue }) => {
    const [showingDescriptionInput, setShowingDescriptionInput] = useState(false)

    useEffect(() => {
        if (taskDescription && !showingDescriptionInput) {
            setShowingDescriptionInput(true)
        }
    }, []);

    const handleAddDescriptionButtonClick = () => {
        setShowingDescriptionInput(true)
    }

    return (
        <div className={`flex ${!isNewTask && "border rounded p-3"}`}>
            {!showingDescriptionInput &&
                <AddTextButton clickHandler={handleAddDescriptionButtonClick}>Add description</AddTextButton>
            }
            {showingDescriptionInput &&
                <Textarea
                    name="task-description"
                    placeholder={"Write something"}
                    value={value ? value : ''}
                    setValue={setValue}
                    autoFocus={!value}
                    isNewTask={isNewTask}
                />
            }
        </div>
    )
}
