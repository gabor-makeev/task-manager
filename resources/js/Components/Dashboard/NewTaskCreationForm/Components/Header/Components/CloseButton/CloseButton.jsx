import { router } from "@inertiajs/react"

export const CloseButton = () => {
    const closeForm = () => {
        router.get(`/?${new URLSearchParams(window.location.search).toString()}`)
    }

    return (
        <button type={"button"} className={"p-1.5 self-end hover:bg-gray-100 duration-150 rounded-lg"} onClick={closeForm}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x stroke-slate-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
    )
}
