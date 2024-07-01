import NameHeader from "./Components/NameHeader"
import PriorityHeader from "./Components/PriorityHeader"

export const ListHeaders = () => {
	return (
		<div
			className={
				"text-xs text-slate-500 h-8 border-b border-b-slate-200 flex items-center justify-between"
			}
		>
			<NameHeader />
			<PriorityHeader />
		</div>
	)
}
