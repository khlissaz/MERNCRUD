import {useState} from "react";


const useForm= (initialFieldValues)=> {
    const [values,setValues]=useState(initialFieldValues)
    const [errors,setErrors]=useState({})
   
    const handleInputChange= e=>{
        const {name,value} = e.target
       
       console.log(e.target.name)
        setValues({
            ...values,
            [name]:value
        })
    }

    const resetForm =() =>{
        setValues(initialFieldValues)
        setErrors({})
      //  setCurrentId(0)
    }

    return{
        
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };
}

export default useForm;
    