import React, { useEffect, useState } from "react" 
import { Controller, useForm } from "react-hook-form"
import { useDispatch , useSelector } from "react-redux"
import ErrorHeandler from "../Widgets/ErrorLable"
import {joiUpdatedMessage} from '../Utils/Apputils'
import "react-datepicker/dist/react-datepicker.css";
import joi, { object } from "joi"
import  DatePicker from "react-datepicker"
import {joiResolver} from '@hookform/resolvers/joi'
import { addBankDetail } from "../action/employeeAction"

const BankDetail = () => {
    const dispatch = useDispatch()
    const [ employee , setEmployee ] = useState(false)
    const { employeeDetail } = useSelector((state) => {
        return state.employeeReduser
    })
    const { handleSubmit  , formState , control } = useForm({
        resolver : joiResolver(
            joi.object({
                adharCard     : joi.number().required().label("adharCard").messages(joiUpdatedMessage),
                panCard       : joi.number().required().label("panCard").messages(joiUpdatedMessage) ,
                ifsc          : joi.number().required().label("ifsc").messages(joiUpdatedMessage), 
                accountNumber  : joi.number().required().label("accountNumber").messages(joiUpdatedMessage),
        })
        )
    })
    useEffect(() => {
        if(!employeeDetail) {
            return
        }
        setEmployee(true)
    },[employeeDetail])
    const onClickToSubmit = (data) => {
        console.log(data);
        dispatch(addBankDetail(data))
    }
    return (
        <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <h4>Bank Detail</h4>
                {employee &&  <form onSubmit={handleSubmit(onClickToSubmit)}>
                    <Controller
                        name="adharCard"
                        control={control}
                        render = {( {field:{value , onChange}}) => (
                            <>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Adhar Card"
                                value={value}
                                onChange={e => {
                                    onChange(e)
                                }}
                                />
                                <ErrorHeandler msg={formState.errors.adharCard && formState.errors.adharCard.message } />
                            </>
                        )}
                    />
                    <Controller
                    name="panCard"
                    control={control}
                    render = {( {field:{value , onChange}}) => (
                        <>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="panCard"
                            value={value}
                            onChange={e => {
                                onChange(e)
                            }}
                            />
                            <ErrorHeandler msg={formState.errors.panCard && formState.errors.panCard.message } />
                        </>
                    )}
                    />
                    <Controller
                        name="ifsc"
                        control={control}
                        render = {( {field:{value , onChange}}) => (
                            <>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ifsc"
                                value={value}
                                onChange={e => {
                                    onChange(e)
                                }}
                            />
                            <ErrorHeandler msg={formState.errors.ifsc && formState.errors.ifsc.message } />
                            </>
                        )}
                  />
                    <Controller
                    name="accountNumber"
                    control={control}
                    render = {( {field:{value , onChange}}) => (
                        <>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Account Number"
                                value={value}
                                onChange={e => {
                                    onChange(e)
                                }}
                            />
                            <ErrorHeandler msg={formState.errors.accountNumber && formState.errors.accountNumber.message } />
                        </>
                    )}
                    />
                   
                    <button type="submit" className="btn btn-raised">
                        Next
                    </button>
                </form>}
                {!employee && 
                    (
                        <button>Return to fill Emplowee Detail</button>
                    )
                }

                }
            </div>
      </div>
    </div>
    )
}

export default BankDetail