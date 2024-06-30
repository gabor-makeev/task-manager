import { colors } from "../../../../../../../../../../constants/colors.js"

export const StatusCircle = ({ statusColor }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={`feather feather-disc stroke-${colors[statusColor].main} fill-transparent`}
		>
			<circle cx="12" cy="12" r="10"></circle>
			<circle
				cx="12"
				cy="12"
				r="6"
				className={"fill-transparent stroke-transparent"}
			></circle>
		</svg>
	)
}
