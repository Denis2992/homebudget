import React from "react";
import {
    Divider,
    Paper,
    TextField,
    Typography,
    Button,
    makeStyles,
    IconButton
} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(0, 4),
        width: "100%",
        maxWidth: 380,
        maxHeight: 550,
        border: `2px solid ${theme.palette.info.main}`,
        display: "flex",
        flexDirection: "column",

    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2)
    },
    headText: {
        textAlign: "center",
        paddingBottom: theme.spacing(2),
        fontWeight: 600
    },
    divider: {
        backgroundColor: theme.palette.info.main,
        height: 2,

    },
    inputs: {
        margin: theme.spacing(2, 0),
        width: theme.spacing(35),
    },
    formBtn: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(2, 0),
        "&:hover" : {
            backgroundColor: theme.palette.info.main,
        }
    }
}));

export default function SavingsNewItemForm () {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <IconButton style={{width: 48, alignSelf: "self-end"}}>
                <Link to="/app/budget/dataSavings/" style={{height: 24}}>
                    <HighlightOffIcon color="error" />
                </Link>
            </IconButton><Typography className={classes.headText} variant="h6">Nowy wpis</Typography>
            <Divider className={classes.divider} variant="middle"/>
            <form className={classes.form}>
                <TextField
                    label="Aktualny stan"
                    type="number"
                    variant="outlined"
                    color="primary"
                    className={classes.inputs}
                />
                <TextField
                    label="Cel"
                    type="number"
                    variant="outlined"
                    color="primary"
                    className={classes.inputs}
                />
                <TextField
                    label="Zostało"
                    type="number"
                    variant="outlined"
                    color="primary"
                    className={classes.inputs}
                />
                <TextField
                    label="Na co"
                    variant="outlined"
                    className={classes.inputs}
                    color="primary"
                />
                <Button className={classes.formBtn}>Zapisz i zamknij</Button>
            </form>
        </Paper>
    )
}