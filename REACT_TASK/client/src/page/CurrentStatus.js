import React, { useEffect, useState } from "react" 
import { Controller, useForm } from "react-hook-form"
import { useDispatch , useSelector } from "react-redux"
import ErrorHeandler from "../Widgets/ErrorLable"
import {joiUpdatedMessage} from '../Utils/Apputils'
import "react-datepicker/dist/react-datepicker.css";
import joi from "joi"
import  DatePicker from "react-datepicker"
import {joiResolver} from '@hookform/resolvers/joi'
import { addCurrentStatus } from "../action/employeeAction"
import { useNavigate , Link } from "react-router-dom"

const CurrentStatus = () => {
    const navigate  = useNavigate()
    const dispatch  = useDispatch()
    const [ professional , setProfessional ] = useState(false)
    const { addedCurrentStatusDetail , addedprofessionalDetails } = useSelector((state) => {
        return state.employeeReduser
    })
    const { handleSubmit  , formState , control } = useForm({
        defaultValues : {
            company             : addedCurrentStatusDetail?.company,
            designation         : addedCurrentStatusDetail?.designation,
            department          : addedCurrentStatusDetail?.department ,
            ctc                 : addedCurrentStatusDetail?.ctc ,
            workingfrom         : addedCurrentStatusDetail?.workingfrom
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
        if(!addedprofessionalDetails) {
            return
        }
        setProfessional(true)
    },[addedprofessionalDetails])
    const onClickToSubmit = (data) => {
        dispatch(addCurrentStatus(data))
        navigate("/experienceDetails")
    }
    return (
        <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <h4>Current Status</h4>
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
                    <Link to="/professional-details">
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

export default CurrentStatus