export const ClosedAtDate = ({ task }) => {
	const getTaskClosedAtDate = () => {
		if (!task.closed_at) {
			return "ERR: CLOSED AT DATE NOT SET"
		}

		const taskClosedAtDate = new Date(task.closed_at)
		const formattedTaskClosedAtMonth = taskClosedAtDate.toLocaleString(
			"default",
			{ month: "short" },
		)
		const formattedTaskClosedAtDay = taskClosedAtDate.getDate()
		return `${formattedTaskClosedAtMonth} ${formattedTaskClosedAtDay}`
	}

	return (
		<span className={"text-xs text-slate-600 mx-2"}>
			Closed on {getTaskClosedAtDate()}
		</span>
	)
}
