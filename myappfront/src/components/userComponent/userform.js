import { Button, TextField,withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import useForm from "./useForm";
import { connect } from 'react-redux';
import * as actions from "../../actions/user";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    userName: "",
    numeroTelephone: "",
    email: "",
    password: ""
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

const UserForm = ({ classes, ...props }) => {
    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.userList.find(x => x._id === props.currentId)

            })
            setErrors({})
        }
    }, [props.currentId])


    const validate = () => {
        let tmp = { ...errors }
       // console.log(tmp)
        tmp.userName = values.userName ? "" : "This field is required."
        tmp.numeroTelephone = values.numeroTelephone ? "" : "This field is required."
        tmp.email = values.email ? "" : "This field is required."
        tmp.password = values.password ? "" : "This field is required."
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
       // console.log(values.userName)
       // console.log(values.numeroTelephone)
       // console.log(validate())
        if (validate()) {
            if (props.currentId === 0){
            console.log(values)
                props.createUser(values, onSuccess)}
            else
                props.updateUser(props.currentId , values, onSuccess)
        }
    }


    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="userName"
                variant="outlined"
                label="User Name"
                fullWidth
                value={values.userName}
                onChange={handleInputChange}
                {...(errors.userName && { error: true, helperText: errors.userName })}
            />
            <TextField
                name="numeroTelephone"
                variant="outlined"
                label="numero télephone "
                fullWidth
                value={values.numeroTelephone}
                onChange={handleInputChange}
                {...(errors.numeroTelephone && { error: true, helperText: errors.numeroTelephone
                 })}
            />
            <TextField
                name="email"
                variant="outlined"
                label="Email "
                fullWidth
                value={values.email}
                onChange={handleInputChange}
                {...(errors.email && { error: true, helperText: errors.email
                 })}
            />
            <TextField
                name="password"
                variant="outlined"
                label="Mot de passe"
                fullWidth
                value={values.password}
                onChange={handleInputChange}
                {...(errors.password && { error: true, helperText: errors.password
                 })}
            />
            <br/>
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit">Submit</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    userList: state.user.list
});


const mapActionToProps = {
    createUser: actions.create,
    updateUser: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserForm));