import {router} from "@inertiajs/react";

export default function TaskWindow({ task }) {
    const handleOverlayClick = (e) => {
        if (e.target.id === "task-window__overlay") {
            router.get('/')
        }
    }

    return (
        <div id={"task-window__overlay"} onClick={(e) => handleOverlayClick(e)} className={"absolute inset-0 bg-violet-950/10 flex justify-center items-start"}>
            { task.name }
        </div>
    )
}
