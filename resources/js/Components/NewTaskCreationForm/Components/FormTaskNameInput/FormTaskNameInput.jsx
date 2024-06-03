export const FormTaskNameInput = ({ placeholder, value, setValue }) => {
    return (
        <input
            type="text"
            value={value}
            required
            autoFocus
            name={"task-name"}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            className={"border-0 placeholder-slate-500 focus:ring-0 focus:outline-0 text-lg font-medium px-0 pt-0 pb-3 w-full"}
        />
    )
}
