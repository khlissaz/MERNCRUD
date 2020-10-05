import { Button, TextField,withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import useForm from "./useForm";
import { connect } from 'react-redux';
import * as actions from "../../actions/produit";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    nomProduit: "",
    imei: "",
    numeroSerie: "",
    modele:String,
    user:String
    
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

const ProduitForm = ({ classes, ...props }) => {
    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.produitList.find(x => x._id === props.currentId)

            })
            setErrors({})
        }
    }, [props.currentId])


    const validate = () => {
        let tmp = { ...errors }
       // console.log(tmp)
        tmp.nomProduit= values.nomProduit ? "" : "This field is required."
        tmp.numeroSerie = values.numeroSerie? "" : "This field is required."
       tmp.imei = values.imei? "" : "Number required."
        
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
                props.createProduit(values, onSuccess)}
            else
                props.updateProduit(props.currentId , values, onSuccess)
        }
    }


    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="nomProduit"
                variant="outlined"
                label="Produit"
                fullWidth
                value={values.nomProduit}
                onChange={handleInputChange}
                {...(errors.nomProduit&& { error: true, helperText: errors.nomProduit })}
            />
             <TextField
                name="imei"
                variant="outlined"
                label="IMEI"
                fullWidth
                value={values.imei}
                onChange={handleInputChange}
                {...(errors.imei&& { error: true, helperText: errors.imei })}
            />
            <TextField
                name="numeroSerie"
                variant="outlined"
                label="Numero Serie "
                fullWidth
                value={values.numeroSerie}
                onChange={handleInputChange}
                {...(errors.numeroSerie && { error: true, helperText: errors.numeroSerie
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
    produitList: state.produit.list
});


const mapActionToProps = {
    createProduit: actions.create,
    updateProduit: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProduitForm));