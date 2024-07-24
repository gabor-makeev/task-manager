import SaveButton from "../../../../../../../../GlobalComponents/SaveButton"

export const QuickTaskCreationFormControls = ({ saveButtonRef }) => {
	return (
		<div className={"flex items-center"}>
			<SaveButton saveButtonRef={saveButtonRef} />
		</div>
	)
}
