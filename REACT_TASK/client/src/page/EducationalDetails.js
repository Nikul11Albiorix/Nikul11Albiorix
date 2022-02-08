import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import joi from "joi"
import { joiResolver} from '@hookform/resolvers/joi'
import { joiUpdatedMessage} from '../Utils/Apputils'
import ErrorHandler from "../Widgets/ErrorLable";
import DatePicker from "react-datepicker"
import { useDispatch , useSelector } from "react-redux"
import { addEducationalDetails } from "../action/employeeAction";
import { allDataOfEmoloyee } from "../action/AddedEmployee";
import { Link, useNavigate } from "react-router-dom";
    
const EducationalDetails = () => {
    const [ Experience , setExperience ] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {   addedExperienceDetails 
            , addedEducationalDetails
            , addedCurrentStatusDetail
            , addedprofessionalDetails
            , addedbankDetail
            , addedemployeeDetail } = useSelector((state) => {
        return state.employeeReduser
    })
    const { DetailOfAllEmployee } = useSelector((state) => {
        return state.AddedEmployeeReduser
    })
    const  { control , handleSubmit , formState } = useForm({
    defaultValues : {
        input : addedEducationalDetails?.input // [{company : "nikul" , designation : "nik" , department : "sdfsdfsdf" , ctc : 100 } ]
    },
    // resolver : joiResolver(
    //     joi.array().items(joi.object().keys({  
    //             company              : joi.string().required().label("company").messages(joiUpdatedMessage),
    //             designation          : joi.string().required().label("designation").messages(joiUpdatedMessage) ,
    //             department           : joi.string().required().label("department").messages(joiUpdatedMessage),
    //             ctc                  : joi.number().required().label("ctc").messages(joiUpdatedMessage)
    //     }))
    // ),
    //  mode: 'onChange',
});
    const {fields, append, remove } = useFieldArray({
      control,
      name : "input"
    })
    const onHandelSubmit = (data) => {
        dispatch(addEducationalDetails(data))
        let AllDetail = {
            EducationalDetails  : data.input ,
            ExperienceDetails   : addedExperienceDetails ,
            CurrentStatusDetail : addedCurrentStatusDetail ,
            professionalDetails : addedprofessionalDetails ,
            BankDetail          : addedbankDetail ,
            EmployeeDetail      : addedemployeeDetail
        }
        dispatch(allDataOfEmoloyee(AllDetail))
        navigate("/")
    }
    useEffect(() => {
        if(!addedExperienceDetails) {
            return
        }
        setExperience(true)
    },[addedExperienceDetails])

    useEffect(() => {
        if(!DetailOfAllEmployee) {
            return
        }
    },[DetailOfAllEmployee])
        return (
        <div>
        <h2>Educational_Details</h2>
        {Experience &&
                <form onSubmit={handleSubmit(onHandelSubmit)}>
                <ul>
                {/* Here we loop thru fields array and render each field as item, and we get the index as a second parameter */}
              {fields.map((item, index) => (
                // Make sure you set the key to something unqiue
                <li key={item.id}>
                        <Controller
                             name={`input.${index}.course`}
                            control={control}
                            // defaultValue={addedExperienceDetails?.input ? addedExperienceDetails.input.company : ""}
                            render={( {field:{value , onChange}}) => (
                                <>
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="course"
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
                             name={`input.${index}.university
                             `}
                            control={control}
                            render={( {field:{value , onChange}}) => (
                                <>
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="university"
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
                             name={`input.${index}.grade`}
                            control={control}
                            render={( {field:{value , onChange}}) => (
                                <>
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Grade"
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
                            name={`input.${index}.passedOn`}
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
            <button type="submit">Submmit</button>
            <Link to="/experienceDetails" ><button type="button">Back</button></Link>
          </form>
        } {!Experience &&
            <Link to="/experienceDetails" >
                <button>Back to fill Exproence detil</button>
            </Link>
        }
        <Link to="/" >
                <button>HOME</button>
        </Link>
    </div>
  );
};

export default EducationalDetails