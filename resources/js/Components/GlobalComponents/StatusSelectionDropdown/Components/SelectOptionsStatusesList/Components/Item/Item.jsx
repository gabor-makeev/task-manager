import FilledStatusCircle from "./Components/FilledStatusCircle"
import SemifilledStatusCircle from "./Components/SemifilledStatusCircle"
import StatusCircle from "./Components/StatusCircle"
import StatusTitle from "./Components/StatusTitle"
import SelectedOptionCheckmark from "../../../../../SelectedOptionCheckmark"

export const Item = ({ task, status, statusType, itemClickHandler }) => {
	return (
		<li>
			<button
				type={"button"}
				onClick={() => itemClickHandler(status.id)}
				className={`flex gap-2 w-full rounded-md hover:bg-gray-100 uppercase
                    ${status.type !== "closed" ? "items-center px-2 h-7" : "pt-2 pr-8 pb-2.5 pl-4"}
                    ${status.id === task.status_id ? "font-bold text-slate-800" : "text-slate-700 font-medium"}`}
			>
				{statusType.name === "not started" && (
					<StatusCircle statusColor={status.color} />
				)}
				{statusType.name === "active" && (
					<SemifilledStatusCircle statusColor={status.color} />
				)}
				{statusType.name === "closed" && (
					<FilledStatusCircle statusColor={status.color} />
				)}
				<StatusTitle>{status.name}</StatusTitle>
				{status.id === task.status_id && <SelectedOptionCheckmark />}
			</button>
		</li>
	)
}
