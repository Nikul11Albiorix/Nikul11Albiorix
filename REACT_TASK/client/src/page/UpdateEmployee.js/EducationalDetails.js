import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import joi from "joi"
import { joiResolver} from '@hookform/resolvers/joi'
import { joiUpdatedMessage} from '../../Utils/Apputils'
import ErrorHandler from "../../Widgets/ErrorLable";
import DatePicker from "react-datepicker"
import { useDispatch , useSelector } from "react-redux"
import { addEducationalDetails } from "../../action/employeeAction";
import { allDataOfEmoloyee } from "../../action/AddedEmployee";
import { Link, Navigate, useNavigate } from "react-router-dom";
    
const UpdateEducationalDetails = () => {
    const [ Experience , setExperience ] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { DetailOfAllEmployee , selectedEmployee } = useSelector((state) => {
        return state.AddedEmployeeReduser
    })
    const  { control , handleSubmit , formState } = useForm({
    defaultValues : {
        input : selectedEmployee?.EducationalDetails // [{company : "nikul" , designation : "nik" , department : "sdfsdfsdf" , ctc : 100 } ]
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
        DetailOfAllEmployee[selectedEmployee.id - 1].EducationalDetails = data.input
        navigate("/")
    }
    useEffect(() => {
        if(!selectedEmployee) {
            return
        }
        setExperience(true)
    },[selectedEmployee])

        return (
        <div>
        <h2>Update_Educational_Details</h2>
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
            <Link to="/update-experienceDetails" ><button type="button">Back</button></Link>
          </form>
        } {!Experience &&
            <Link to="/update-experienceDetails" >
                <button>Back to fill Exproence detil</button>
            </Link>
        }
        <Link to="/" >
                <button>HOME</button>
        </Link>
    </div>
  );
};

export default UpdateEducationalDetails