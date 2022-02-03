import React, { useEffect, useState } from "react" 
import { Controller, useForm } from "react-hook-form"
import { useDispatch , useSelector } from "react-redux"
import ErrorHeandler from "../Widgets/ErrorLable"
import {joiUpdatedMessage} from '../Utils/Apputils'
import "react-datepicker/dist/react-datepicker.css";
import joi, { object } from "joi"
import  DatePicker from "react-datepicker"
import {joiResolver} from '@hookform/resolvers/joi'
import { addEmployeeAction } from "../action/employeeAction"

const EmployeeForm = () => {
    const dispatch = useDispatch()
    const { handleSubmit  , formState , control } = useForm({
        resolver : joiResolver(
            joi.object({
                firstName : joi.string().required().label("firstName").messages(joiUpdatedMessage),
                lastName  : joi.string().required().label("lastName").messages(joiUpdatedMessage) ,
                dob       : joi.date().required().messages(joiUpdatedMessage), 
                email     : joi.string()
                        .email({ tlds: {allow: false} })
                        .required()
                        .label("Email")
                        .messages(joiUpdatedMessage),
                phone     : joi.number().required().label("phone").messages(joiUpdatedMessage),
            })
        )
    })
    const [ imageUrl , setImgUrl ] = useState("")
    const [preview, setPreview] = useState()
    useEffect(() => {
        if(!imageUrl) {
            return
        }
        const ObjectUrl = URL.createObjectURL(imageUrl)
        setPreview(ObjectUrl)
    },[imageUrl])
    const onClickToSubmit = (data) => {
        console.log(data);
        dispatch(addEmployeeAction(data))
    }
    const selectedImage = (e) => {
        if(e.target.files[0]) {
            setImgUrl(e.target.files[0])
        }
    }
    return (
        <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <h4>Add Employee</h4>
                {preview && <img src={preview} width="50" height="50" />}
                <input type="file" onChange={selectedImage} />

                <form onSubmit={handleSubmit(onClickToSubmit)}>
                    <Controller
                        name="firstName"
                        control={control}
                        render = {( {field:{value , onChange}}) => (
                            <>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="firstName"
                                value={value}
                                onChange={e => {
                                    onChange(e)
                                }}
                                />
                                <ErrorHeandler msg={formState.errors.firstName && formState.errors.firstName.message } />
                            </>
                        )}
                    />
                    <Controller
                    name="lastName"
                    control={control}
                    render = {( {field:{value , onChange}}) => (
                        <>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="lastName"
                            value={value}
                            onChange={e => {
                                onChange(e)
                            }}
                            />
                            <ErrorHeandler msg={formState.errors.lastName && formState.errors.lastName.message } />
                        </>
                    )}
                    />
                    <Controller
                    name="email"
                    control={control}
                    render = {( {field:{value , onChange}}) => (
                        <>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={value}
                            onChange={e => {
                                onChange(e)
                            }}
                            />
                            <ErrorHeandler msg={formState.errors.email && formState.errors.email.message } />
                        </>
                    )}
                    />
                    <Controller
                        name="dob"
                        control={control}
                        render = {( {field:{value , onChange}}) => (
                            <>
                                <DatePicker
                                    className="form-control"
                                    selected={value}
                                    onChange={onChange}
                                />
                            <ErrorHeandler msg={formState.errors.dob && formState.errors.dob.message } />
                            </>
                        )}
                  />
                    <Controller
                    name="phone"
                    control={control}
                    render = {( {field:{value , onChange}}) => (
                        <>
                            <input
                            type="tel"
                            className="form-control"
                            placeholder="phone"
                            value={value}
                            onChange={e => {
                                onChange(e)
                            }}
                            />
                            <ErrorHeandler msg={formState.errors.phone && formState.errors.phone.message } />
                        </>
                    )}
                    />
                   
                    <button type="submit" className="btn btn-raised">
                        Next
                    </button>
                </form>
            </div>
      </div>
    </div>
    )
}

 export default EmployeeForm