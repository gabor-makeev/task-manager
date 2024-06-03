export const FormSubmit = ({ value }) => {
    return (
        <input
            type="submit"
            value={value}
            className={
                "bg-indigo-500 text-white px-3 rounded-md h-8 cursor-pointer hover:bg-indigo-600"
            }
        />
    )
}
