let inisticalizeState = []
export default function ( state = inisticalizeState , action) {
    switch (action.type) {
        case "ADD_EMPLOYEE" : {
            return {
                ...state,
                employeeDetail : action.payload
            }
        }
        case "ADD_BANK_DETAIL" : {
            return {
                ...state,
                bankDetail : action.payload
            }
        }
        default : return state
    }
}