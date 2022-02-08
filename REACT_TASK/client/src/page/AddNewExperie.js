import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import joi from "joi"
import { joiResolver} from '@hookform/resolvers/joi'
import { joiUpdatedMessage} from '../Utils/Apputils'
import ErrorHandler from "../Widgets/ErrorLable";
import DatePicker from "react-datepicker"
import { useDispatch , useSelector } from "react-redux"
import { addExperienceDetails } from "../action/employeeAction";
import { Link, useNavigate } from "react-router-dom";
    
const ExperienceDetails = () => {
    const navigate = useNavigate()  
    const dispatch = useDispatch()
    const { addedExperienceDetails , addedCurrentStatusDetail } = useSelector((state) => {
        return state.employeeReduser
    })
    const [ currentstatus , setCurrentStatus ] = useState(false)
    const  { control , handleSubmit , formState } = useForm({
    defaultValues : {
        input : addedExperienceDetails // [{company : "nikul" , designation : "nik" , department : "sdfsdfsdf" , ctc : 100 } ]
    },
    // resolver : joiResolver(
    //     joi.array().items(joi.object().keys({  
    //             company              : joi.string().required().label("company").messages(joiUpdatedMessage),
    //             designation          : joi.string().required().label("designation").messages(joiUpdatedMessage) ,
    //             department           : joi.string().required().label("department").messages(joiUpdatedMessage),
    //             ctc                  : joi.number().required().label("ctc").messages(joiUpdatedMessage)
    //     }))
    // ),
     mode: 'onChange',
});
    const {fields, append, remove } = useFieldArray({
      control,
      name : "input"
    })
    const onHandelSubmit = (data) => {
        dispatch(addExperienceDetails(data.input))
        navigate("/educationaldetails")
    }
    useEffect(() => {
        if(!addedCurrentStatusDetail) {
            return
        }
        setCurrentStatus(true)
    },[addedCurrentStatusDetail])
        return (
        <div>
        <h2>ExperienceDetails</h2>
        {currentstatus && 
                <form onSubmit={handleSubmit(onHandelSubmit)}>
                <ul>
                {/* Here we loop thru fields array and render each field as item, and we get the index as a second parameter */}
              {fields.map((item, index) => (
                // Make sure you set the key to something unqiue
                <li key={item.id}>
                        <Controller
                             name={`input.${index}.company`}
                            control={control}
                            // defaultValue={addedExperienceDetails?.input ? addedExperienceDetails.input.company : ""}
                            render={( {field:{value , onChange}}) => (
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
                                    {/* <ErrorHandler msg={formState.errors.input?.[index]?.company && formState.errors.input?.[index]?.company.message } /> */}
                                </>
                            )}
                        />
                        <br />
                        <Controller
                             name={`input.${index}.designation`}
                            control={control}
                            render={( {field:{value , onChange}}) => (
                                <>
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Designation"
                                    value={value}
                                    onChange={e => {
                                        onChange(e)
                                    }}
                                    />
                                    {/* <ErrorHeandler msg={formState.errors.company && formState.errors.company.message } /> */}
                                </>
                            )}
                        />
                        <br />
                        <Controller
                             name={`input.${index}.department`}
                            control={control}
                            render={( {field:{value , onChange}}) => (
                                <>
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Department"
                                    value={value}
                                    onChange={e => {
                                        onChange(e)
                                    }}
                                    />
                                    {/* <ErrorHeandler msg={formState.errors.company && formState.errors.company.message } /> */}
                                </>
                            )}
                        />
                        <br />
                        <Controller
                             name={`input.${index}.ctc`}
                            control={control}
                            render={( {field:{value , onChange}}) => (
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
                                    {/* <ErrorHeandler msg={formState.errors.company && formState.errors.company.message } /> */}
                                </>
                            )}
                        />
                        <Controller
                            name={`input.${index}.from`}
                            control={control}
                            render = {( {field:{value , onChange}}) => (
                                <>
                                    <DatePicker
                                        className="form-control"
                                        selected={value}
                                        onChange={onChange}
                                    />
                                {/* <ErrorHeandler msg={formState.errors.dob && formState.errors.dob.message } /> */}
                                </>
                            )}
                      />
                      <Controller
                            name={`input.${index}.to`}
                            control={control}
                            render = {( {field:{value , onChange}}) => (
                                <>
                                    <DatePicker
                                        className="form-control"
                                        selected={value}
                                        onChange={onChange}
                                    />
                                {/* <ErrorHeandler msg={formState.errors.dob && formState.errors.dob.message } /> */}
                                </>
                            )}
                      />
                  <button onClick={() => remove(index)}>Delete</button>
                </li>
               ))}
            </ul>
            <button type="button" onClick={() => append({ input: "" })}>
              Add New 
            </button>
            <button type="submit">Next</button>
            <Link to="/currentStatus" ><button type="button">Back</button></Link>
          </form>
        } {!currentstatus &&
            <Link to="/currentStatus"> 
                <button>Back TO Fill CurrentStatus</button>
            </Link>
        }
    </div>
  );
};

export default ExperienceDetails