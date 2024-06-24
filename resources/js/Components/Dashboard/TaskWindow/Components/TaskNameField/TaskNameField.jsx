export const TaskNameField = ({ value, setValue }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={"mt-6 text-3xl font-bold text-gray-900 border-0 focus:ring-0"}
        />
    )
}
