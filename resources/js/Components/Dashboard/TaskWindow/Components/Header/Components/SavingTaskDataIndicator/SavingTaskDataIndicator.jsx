export const SavingTaskDataIndicator = () => {
    return (
        <div className={"flex absolute mt-2 ml-2 gap-1 items-center"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-save stroke-slate-500"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            <span className={"text-slate-500 text-sm font-medium"}>Saving</span>
        </div>
    )
}
