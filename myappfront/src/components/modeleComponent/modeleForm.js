import { Button, TextField,withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import useForm from "./useForm";
import { connect } from 'react-redux';
import * as actions from "../../actions/modele";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    nomModele: "",
    typeModele: "",
    description: "",
    
}
//Styles css
const styles = them => ({
    root: {
        "& .MuiTextField-root": {
            margin: them.spacing(1),
            width: 200,
        },
    },
    form: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    }
})

const ModeleForm = ({ classes, ...props }) => {
    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.modeleList.find(x => x._id === props.currentId)

            })
            setErrors({})
        }
    }, [props.currentId])


    const validate = () => {
        let tmp = { ...errors }
       // console.log(tmp)
        tmp.nomModele= values.nomModele ? "" : "This field is required."
        tmp.typeModele = values.typeModele? "" : "This field is required."
        tmp.description = values.description ? "" : "This field is required."
        
        setErrors({
            ...tmp
        })
        return Object.values(tmp).every(x => x === "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    } = useForm(initialFieldValues, props.setCurrentId);


    const handleSubmit = e => {
         e.preventDefault()
          const onSuccess = () => {
            ButterToast.raise({
                 content: <Cinnamon.Crisp title="Post Box"
                    content="Submitted successFully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
      
        if (validate()) {
            if (props.currentId === 0){
            console.log(values)
                props.createModele(values, onSuccess)}
            else
                props.updateModele(props.currentId , values, onSuccess)
        }
    }


    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="nomModele"
                variant="outlined"
                label="Modele"
                fullWidth
                value={values.nomModele}
                onChange={handleInputChange}
                {...(errors.nomModele&& { error: true, helperText: errors.nomModele })}
            />
            <TextField
                name="typeModele"
                variant="outlined"
                label="Type "
                fullWidth
                value={values.typeModele}
                onChange={handleInputChange}
                {...(errors.typeModele && { error: true, helperText: errors.typeModele
                 })}
            />
            <TextField
                name="description"
                variant="outlined"
                label="Description "
                fullWidth
                value={values.description}
                onChange={handleInputChange}
                {...(errors.description && { error: true, helperText: errors.description
                 })}
            />
           
          
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit">Submit</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    modeleList: state.modele.list
});


const mapActionToProps = {
    createModele: actions.create,
    updateModele: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ModeleForm));