let inisticalizeState = []
export default function ( state = inisticalizeState , action) {
    switch (action.type) {
        case "ADD_EMPLOYEE" : {
            return {
                ...state,
                addedemployeeDetail : action.payload
            }
        }
        case "ADD_BANK_DETAIL" : {
            return {
                ...state,
                addedbankDetail : action.payload
            }
        }
        case "Professional_Details" : {
            return {
                ...state,
                addedprofessionalDetails : action.payload
            }
        }
        case "Current_Status" : {
            return {
                ...state,
                addedCurrentStatusDetail : action.payload
            }
        }
        case "Experience_Details" : {
            return {
                ...state,
                addedExperienceDetails : action.payload
            }
        }
        case "Educational_Details" : {
            return {
                ...state,
                addedEducationalDetails : action.payload
            }
        }
        default : return state
    }
}