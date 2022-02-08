export function allDataOfEmoloyee (data) {
    return {
        type : "ALL_DATA_OF_EMPLOYEE",
        payload : data
    }
}

export function selectedEmployee (data) {
    return {
        type : "SELECTED_EMPLOYEE",
        payload : data
    }
}