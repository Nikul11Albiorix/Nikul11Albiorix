import React, { useEffect, useState } from "react" 
import { useDispatch , useSelector } from "react-redux"
import { Link , useNavigate } from "react-router-dom"
import { selectedEmployee } from "../../action/AddedEmployee"

const AllEmployee = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { DetailOfAllEmployee } = useSelector((state) => {
        return state.AddedEmployeeReduser
    })
    const [ allEmployee , setAllEmployee ] = useState([])
    const [ changeData , setChangeData ] = useState(false)
    useEffect(() => {
        if(!DetailOfAllEmployee) {
            return
        }
        setAllEmployee(DetailOfAllEmployee)
        setChangeData(false)
    },[DetailOfAllEmployee, changeData])
    const updateEmployee = (data) => {
        dispatch(selectedEmployee(data))
        navigate("/update-EmployeeForm")
    }
    const deleteEmployee = (data) => {
        DetailOfAllEmployee.splice(data.id - 1 , 1)
        setChangeData(true)
    }
    return (
            <>
                 <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                {allEmployee.map((item) => {
                       return (
                        <tr>
                            <td>{item?.EmployeeDetail?.firstName}</td>
                            <td>{item?.CurrentStatusDetail?.designation}</td>
                            <td>{item?.CurrentStatusDetail?.department}</td>
                            <td><button onClick={() => {updateEmployee(item)}}>Update</button></td>
                            <td><button onClick={() => {deleteEmployee(item)}}>Delete</button></td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>  
            <Link to="/employee-form" ><button>ADD NEW Emplowee</button></Link>
            </>
    )
}

export default AllEmployee