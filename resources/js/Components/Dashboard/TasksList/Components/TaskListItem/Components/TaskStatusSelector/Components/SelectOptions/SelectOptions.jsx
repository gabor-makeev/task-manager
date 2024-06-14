import { colors } from "../../../../../../../../../../constants/colors.js"

export const SelectOptions = ({ task, statusesByType, statusOptionClickHandler }) => {
    return (
        <div className="min-w-44 absolute -ml-1.5 mt-11 bg-white rounded-md shadow-2xl text-xs">
            {statusesByType['not started'] && statusesByType['not started'].length &&
                /* TODO: move this to a separate component */
                <div className={"border-b pt-4 px-2 pb-2.5"}>
                    {/* TODO: The title of the status type should be a separate component as well */}
                    <span className={"px-2 pb-1.5 text-slate-500 font-medium uppercase"}>not started</span>
                    {/* TODO: The list of specific statuses should also be a separate component */}
                    <ul className={"mt-1.5"}>
                        {statusesByType['not started'].map(notStartedStatus => (
                            <li key={notStartedStatus.id}><button onClick={() => statusOptionClickHandler(notStartedStatus.id)} className={`flex items-center gap-2 w-full rounded-md hover:bg-gray-100 px-2 h-7 uppercase ${notStartedStatus.id === task.status_id ? "font-bold text-slate-800" : "text-slate-700 font-medium"}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-disc stroke-${colors[notStartedStatus.color].main} fill-transparent`}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6" className={"fill-transparent stroke-transparent"}></circle></svg><span className={"mr-auto"}>{notStartedStatus.name}</span>{notStartedStatus.id === task.status_id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="transparent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-check stroke-purple-900"}><polyline points="20 6 9 17 4 12"></polyline></svg>}</button></li>
                        ))}
                    </ul>
                </div>
            }
            { statusesByType['active'] && statusesByType['active'].length &&
                <div className={"border-b pt-4 px-2 pb-2.5"}>
                    <span className={"px-2 pb-1.5 text-slate-500 font-medium uppercase"}>active</span>
                    <ul className={"mt-1.5"}>
                        {statusesByType['active'].map(activeStatus => (
                            <li key={activeStatus.id}><button onClick={() => statusOptionClickHandler(activeStatus.id)} className={`flex items-center gap-2 w-full rounded-md hover:bg-gray-100 px-2 h-7 uppercase ${activeStatus.id === task.status_id ? "font-bold text-slate-800" : "text-slate-700 font-medium"}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-disc stroke-${colors[activeStatus.color].main} fill-transparent`}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6" className={`fill-${colors[activeStatus.color].main}`}></circle></svg><span className={"mr-auto"}>{activeStatus.name}</span>{activeStatus.id === task.status_id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="transparent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-check stroke-purple-900"}><polyline points="20 6 9 17 4 12"></polyline></svg>}</button></li>
                        ))}
                    </ul>
                </div>
            }
            { statusesByType['closed'] && statusesByType['closed'].length &&
                <div>
                    <ul>
                        {statusesByType['closed'].map(closedStatus => (
                            <li key={closedStatus.id}><button onClick={() => statusOptionClickHandler(closedStatus.id)} className={`flex gap-2 w-full rounded-md hover:bg-gray-100 uppercase pt-2 pr-8 pb-2.5 pl-4 ${closedStatus.id === task.status_id ? "font-bold text-slate-800" : "text-slate-700 font-medium"}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-disc stroke-${colors[closedStatus.color].main} fill-${colors[closedStatus.color].main}`}><circle cx="12" cy="12" r="10"></circle></svg><span className={"mr-auto"}>{closedStatus.name}</span>{closedStatus.id === task.status_id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="transparent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={"feather feather-check stroke-purple-900"}><polyline points="20 6 9 17 4 12"></polyline></svg>}</button></li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}
