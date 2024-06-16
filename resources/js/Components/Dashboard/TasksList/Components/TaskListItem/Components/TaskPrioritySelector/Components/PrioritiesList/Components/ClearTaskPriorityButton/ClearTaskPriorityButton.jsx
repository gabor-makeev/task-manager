export const ClearTaskPriorityButton = ({ clearTaskPriority }) => {
    return (
        <li className={"px-2 pt-2 border-t border-t-slate-200 mt-2"}>
            <button onClick={clearTaskPriority} className={"flex items-center gap-2 w-full rounded-md hover:bg-gray-100 px-2 h-7 capitalize text-slate-700 font-medium"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-slash stroke-gray-500"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                <span className={"mr-auto"}>clear</span>
            </button>
        </li>
    )
}
