export const getStatusesByPriority = (statuses) => {
    return statuses
        .sort((a, b) => {
            const statusTypePriority = {
                'not started': 0,
                'active': 1,
                'closed': 2
            }

            if (statusTypePriority[a.type] > statusTypePriority[b.type]) {
                return 1
            } else if (statusTypePriority[a.type] < statusTypePriority[b.type]) {
                return -1
            }

            return 0
        })
        .reduce((a, v) => ({...a, [v.id]: v}), {})
}

export const getStatusesByType = (statuses) => {
    return statuses.reduce((a, v) => {
        if (v.type in a) {
            return {...a, [v.type]: [...a[v.type], v]}
        }

        return {...a, [v.type]: [v] }
    }, {})
}
