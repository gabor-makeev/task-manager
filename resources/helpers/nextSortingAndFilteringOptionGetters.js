export const getNextSortingOption = (currentPrioritySortingOption) => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    urlParams.delete('priority-sorting')

    if (currentPrioritySortingOption === null) {
        urlParams.set('priority-sorting', 'desc')
    } else if (currentPrioritySortingOption === 'desc') {
        urlParams.set('priority-sorting', 'asc')
    }

    return urlParams.toString()
}

export const getNextFilteringOption = (currentClosedTasksFilteringOption) => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    urlParams.delete('show-closed-filtering')

    if (currentClosedTasksFilteringOption !== '') {
        urlParams.set('show-closed-filtering', '')
    }

    return urlParams.toString()
}
