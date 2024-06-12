import {Link} from "@inertiajs/react";

export const ShowClosedLink = ({ link, isActive }) => {
    return (
        <Link
            href={link}
            className={`flex items-center gap-0.5 py-1 px-2 rounded-xl text-xs font-medium border duration-200 ${isActive ? "border-indigo-500 hover:bg-indigo-100 bg-indigo-50 text-indigo-500" : "border-slate-200 hover:bg-slate-100 text-slate-600"}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>Show closed
        </Link>
    )
}
