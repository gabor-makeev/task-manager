export const TaskCreatedAtDate = ({ task }) => {
    const taskCreatedAtDate = new Date(task.created_at)
    const formattedTaskCreatedAtMonth = taskCreatedAtDate.toLocaleString('default', { month: 'short' })
    const formattedTaskCreatedAtDay = taskCreatedAtDate.getDate()
    const formattedTaskCreatedAtDate = `${formattedTaskCreatedAtMonth} ${formattedTaskCreatedAtDay}`

    return <span className={"text-xs text-slate-600 mr-2"}>Created on { formattedTaskCreatedAtDate }</span>
}
