import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/modele";
import ModeleForm from "./modeleForm";
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Divider, Button, Avatar, ListItemAvatar } from "@material-ui/core"
import { butterToast, Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    smMargin:{
        margin: theme.spacing(1),
    },
    actionDiv:{
       textAlign:"center"
    }
})


//props.classes.paper

const Modeles = ({ classes, ...props }) => {
    //const {classes, ...props} = props
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {

        props.fetchAllModeles()
    }, [])//DidMount


    const onDelete = id => {
        const onSuccess = () => {
            butterToast.rais({
                content: <Cinnamon.Crisp title="Post Box"
                    content="Deleted successFully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })
        }


        if (window.confirm("Are you sure to delete this model?"))
            props.deleteModele(id, onSuccess)
    }

    return (
        <Grid container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <ModeleForm {...{ currentId, setCurrentId }} />
                </Paper>

            </Grid>

            <Grid item xs={7}>

                <Paper className={classes.paper}>
                    <div>Liste des modeles</div>
                </Paper>

                <Paper className={classes.paper}>
                    <List>
                        {
                            props.modeleList.map((record, index) => {
                                return (
                                    <Fragment key={index}  >
                                        <ListItem alignItems="flex-start" className={styles.root}>
                                           
                                            <ListItemText>
                                                <Typography variant="h5">
                                                    {record.nomModele}
                                                </Typography>
                                                <div>
                                                    {record.typeModele}
                                                </div>
                                                <div>
                                                    {record.description}
                                                </div>
                                                <div className={classes.actionDiv}>
                                                    <Button variant="contained" color="primary" size="small"
                                                        onClick={() => setCurrentId(record._id)}
                                                        className={classes.smMargin}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="contained" color="secondary" size="small"
                                                        onClick={() => onDelete(record._id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li" />
                                    </Fragment>
                                )
                            })
                        }
                    </List>
                </Paper>
            </Grid>



        </Grid >
    );
}



const mapStateToProps = state => ({
    modeleList: state.modele.list
});


const mapActionToProps = {
    fetchAllModeles: actions.fetchAll,
    deleteModele: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Modeles));