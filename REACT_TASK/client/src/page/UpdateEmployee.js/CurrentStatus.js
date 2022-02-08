import React, { useEffect, useState } from "react" 
import { Controller, useForm } from "react-hook-form"
import { useDispatch , useSelector } from "react-redux"
import ErrorHeandler from "../../Widgets/ErrorLable"
import {joiUpdatedMessage} from '../../Utils/Apputils'
import "react-datepicker/dist/react-datepicker.css";
import joi from "joi"
import  DatePicker from "react-datepicker"
import {joiResolver} from '@hookform/resolvers/joi'
import { addCurrentStatus } from "../../action/employeeAction"
import { useNavigate , Link } from "react-router-dom"

const UpdateCurrentStatus = () => {
    const navigate = useNavigate()
    const dispatch  = useDispatch()
    const [ professional , setProfessional ] = useState(false)
    const { DetailOfAllEmployee , selectedEmployee } = useSelector((state) => {
        return state.AddedEmployeeReduser
    })
    const { handleSubmit  , formState , control } = useForm({
        defaultValues : {
            company             : selectedEmployee?.CurrentStatusDetail?.company,
            designation         : selectedEmployee?.CurrentStatusDetail?.designation,
            department          : selectedEmployee?.CurrentStatusDetail?.department ,
            ctc                 : selectedEmployee?.CurrentStatusDetail?.ctc ,
            workingfrom         : selectedEmployee?.CurrentStatusDetail?.workingfrom
        },
        resolver : joiResolver(
            joi.object({
                company     : joi.string().required().label("company").messages(joiUpdatedMessage),
                designation         : joi.string().required().label("designation").messages(joiUpdatedMessage) ,
                department          : joi.string().required().label("department").messages(joiUpdatedMessage), 
                ctc                 : joi.number().required().label("ctc").messages(joiUpdatedMessage),
                workingfrom         : joi.date().required().label("workingfrom").messages(joiUpdatedMessage),
        })
        )
    })
    useEffect(() => {
        if(!selectedEmployee) {
            return
        }
        setProfessional(true)
    },[selectedEmployee])
    const onClickToSubmit = (data) => {
            DetailOfAllEmployee[selectedEmployee.id - 1].CurrentStatusDetail = data 
            // dispatch(addCurrentStatus(data))
            navigate("/update-experienceDetails")
    }
    return (
        <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <h4>Update Current Status</h4>
                {professional &&  <form onSubmit={handleSubmit(onClickToSubmit)}>
                    <Controller
                        name="company"
                        control={control}
                        render = {( {field:{value , onChange}}) => (
                            <>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="company"
                                value={value}
                                onChange={e => {
                                    onChange(e)
                                }}
                                />
                                <ErrorHeandler msg={formState.errors.company && formState.errors.company.message } />
                            </>
                        )}
                    />
                    <Controller
                    name="designation"
                    control={control}
                    render = {( {field:{value , onChange}}) => (
                        <>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="designation"
                            value={value}
                            onChange={e => {
                                onChange(e)
                            }}
                            />
                            <ErrorHeandler msg={formState.errors.designation && formState.errors.designation.message } />
                        </>
                    )}
                    />
                    <Controller
                        name="department"
                        control={control}
                        render = {( {field:{value , onChange}}) => (
                            <>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="department"
                                value={value}
                                onChange={e => {
                                    onChange(e)
                                }}
                            />
                            <ErrorHeandler msg={formState.errors.department && formState.errors.department.message } />
                            </>
                        )}
                    />
                    <Controller
                        name="ctc"
                        control={control}
                        render = {( {field:{value , onChange}}) => (
                            <>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="CTC"
                                value={value}
                                onChange={e => {
                                    onChange(e)
                                }}
                            />
                            <ErrorHeandler msg={formState.errors.ctc && formState.errors.ctc.message } />
                            </>
                        )}
                    />
                    <Controller
                        name="workingfrom"
                        control={control}
                        render = {( {field:{value , onChange}}) => (
                            <>
                                <DatePicker
                                    className="form-control"
                                    selected={value}
                                    onChange={onChange}
                                />
                                <ErrorHeandler msg={formState.errors.workingfrom && formState.errors.workingfrom.message } />
                            </>
                        )}
                    />
                    <Link to="/update-ProfessionalDetails">
                    <button type="button" className="btn btn-raised">
                        Back
                    </button>
                    </Link>
                    <button type="submit" className="btn btn-raised">
                        Next
                    </button>
                </form>}
                {
                    !professional && 
                    (
                        <Link to="/professional-details">
                            <button>Return to fill professional Detail</button>
                        </Link>
                    )
                }
            </div>
      </div>
    </div>
    )
}

export default UpdateCurrentStatus