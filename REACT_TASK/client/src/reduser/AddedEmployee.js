let inisticalizeState = {
    DetailOfAllEmployee : []
}
// import produce from "immer"
export default function ( state = inisticalizeState , action ) {
    switch (action.type) {
        case "ALL_DATA_OF_EMPLOYEE" : {
            const { EducationalDetails ,
                ExperienceDetails   ,
                CurrentStatusDetail ,
                professionalDetails ,
                BankDetail     ,
                EmployeeDetail } = action.payload
            let id;
            if(state.DetailOfAllEmployee.length >= 1) {
                id = state.DetailOfAllEmployee.length + 1
            } else {
                id = 1
            }
            return {
                ...state,
                DetailOfAllEmployee : [
                    ...state.DetailOfAllEmployee,
                    {
                        EducationalDetails ,
                        ExperienceDetails   ,
                        CurrentStatusDetail ,
                        professionalDetails ,
                        BankDetail     ,
                        EmployeeDetail , 
                        id 
                    }
                ]
            }
        }
        case "SELECTED_EMPLOYEE" : {
            return {
                ...state,
                selectedEmployee : action.payload
            }
        }
        default : return state
    }
}