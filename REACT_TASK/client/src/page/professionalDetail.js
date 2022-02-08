import React, { useEffect, useState } from "react" 
import { Controller, useForm } from "react-hook-form"
import { useDispatch , useSelector } from "react-redux"
import ErrorHeandler from "../Widgets/ErrorLable"
import {joiUpdatedMessage} from '../Utils/Apputils'
import "react-datepicker/dist/react-datepicker.css";
import joi, { object } from "joi"
import  DatePicker from "react-datepicker"
import {joiResolver} from '@hookform/resolvers/joi'
import { addProfessionalDetails } from "../action/employeeAction"
import { useNavigate , Link } from "react-router-dom"

const ProfessionalDetails = () => {
    const navigate  = useNavigate()
    const dispatch  = useDispatch()
    const [ pdfURL  , setPdfURL ] = useState()
    const [ pdfFile , setPdfFile ] = useState()
    const [ bank    , setaddedBankDetail ] = useState(false)
    const { addedbankDetail , addedprofessionalDetails } = useSelector((state) => {
        return state.employeeReduser
    })
    const { handleSubmit  , formState , control } = useForm({
        defaultValues : {
            yers   : addedprofessionalDetails?.yers,
            months : addedprofessionalDetails?.months,
            skills : addedprofessionalDetails?.skills
        },
        resolver : joiResolver(
            joi.object({
                yers            : joi.number().required().label("yers").messages(joiUpdatedMessage),
                months          : joi.number().required().label("months").messages(joiUpdatedMessage) ,
                skills          : joi.string().required().label("skills").messages(joiUpdatedMessage)
            })
        )
    })
    const onClickToSubmit = (data) => {
        let NewData;
        if(pdfURL) {
            NewData = {
                ...data,
                pdfURL
            }
        } else {
            NewData = data
        }
        dispatch(addProfessionalDetails(NewData))
        navigate("/currentStatus")
    }
    const onUploadPdf = (e) => {
        if(e.target.files[0]) {
            setPdfFile(e.target.files[0])
        }
    }  
    useEffect(() => {
        if(!addedbankDetail) {
            return
        }
        setaddedBankDetail(true)
    },[addedbankDetail])
    useEffect(() => {
        if(!pdfFile) {
            return
        }
        const url = URL.createObjectURL(pdfFile) 
        setPdfURL(url)
    },[pdfFile])
    return (
        <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <h4>Professional Details</h4>
            {pdfURL && <embed
                src={pdfURL}
                type="application/pdf"
                frameBorder="0"
                scrolling="auto"
                height="100"
                width="100"
            ></embed>
            }<br />
                {bank &&  
                <form onSubmit={handleSubmit(onClickToSubmit)}>
                    <input type="file" onChange={onUploadPdf} />
                    <br />
                    <Controller
                        name="yers"
                        control={control}
                        render = {( {field:{value , onChange}}) => (
                            <>
                                <input
                                type="number"
                                className="form-control"
                                placeholder="Yers"
                                value={value}
                                onChange={e => {
                                    onChange(e)
                                }}
                                />
                                <ErrorHeandler msg={formState.errors.yers && formState.errors.yers.message } />
                            </>
                        )}
                    />
                    <Controller
                    name="months"
                    control={control}
                    render = {( {field:{value , onChange}}) => (
                        <>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="months"
                            value={value}
                            onChange={e => {
                                onChange(e)
                            }}
                            />
                            <ErrorHeandler msg={formState.errors.months && formState.errors.months.message } />
                        </>
                    )}
                    />
                    <Controller
                        name="skills"
                        control={control}
                        render = {( {field:{value , onChange}}) => (
                            <>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="skills"
                                value={value}
                                onChange={e => {
                                    onChange(e)
                                }}
                            />
                            {/* <select name="test[]" size="1" multiple>
                        <option>123
                        <option>456
                        <option>789
                        </select> */}
                            <ErrorHeandler msg={formState.errors.skills && formState.errors.skills.message } />
                            </>
                        )}
                    />
                    
                    <Link to="/bank-detail">
                    <button type="submit" className="btn btn-raised">
                        Back
                    </button>
                    </Link>
                    <button type="submit" className="btn btn-raised">
                        Next
                    </button>
                </form>}
                {
                    !bank && 
                    (
                        <Link to="/bank-detail">
                            <button>Return to fill Bank Detail</button>
                        </Link>
                    )
                }
            </div>
      </div>
    </div>
    )
}

export default ProfessionalDetails