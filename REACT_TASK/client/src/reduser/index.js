import { combineReducers } from "redux"
import employeeReduser  from "./employeeReduser"
import AddedEmployeeReduser  from "./AddedEmployee"
export default combineReducers({
    employeeReduser,
    AddedEmployeeReduser
})