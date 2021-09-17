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
        width: "100%",
        maxWidth: 380,
        maxHeight: 750,
        border: `2px solid ${theme.palette.warning.light}`,
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(0, 4),
        position: "absolute",
        left: "20%",
        top: "10%",
        zIndex: 2

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
        backgroundColor: theme.palette.warning.light,
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
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.text.primary
        }
    }
}));

export default function CreditNewItemForm () {
    const classes = useStyles();

    return (
            <Paper className={classes.paper} elevation={3}>
                <IconButton style={{width: 48, alignSelf: "self-end"}}>
                    <Link to="/app/budget/dataCredit/" style={{height: 24}}>
                        <HighlightOffIcon color="error" />
                    </Link>
                </IconButton><Typography className={classes.headText} variant="h6">Nowy wpis</Typography>
                <Divider className={classes.divider} variant="middle"/>
                <form className={classes.form}>
                    <TextField
                        label="Nazwa"
                        variant="outlined"
                        className={classes.inputs}
                        color="secondary"
                    />
                    <TextField
                        label="Całkowita suma"
                        type="number"
                        variant="outlined"
                        color="secondary"
                        className={classes.inputs}
                    />
                    <TextField
                        label="Spłacono"
                        type="number"
                        variant="outlined"
                        color="secondary"
                        className={classes.inputs}
                    />
                    <TextField
                        label="Zostało"
                        type="number"
                        variant="outlined"
                        color="secondary"
                        className={classes.inputs}
                    />
                    <TextField
                        label="Miesięczna rata"
                        type="number"
                        variant="outlined"
                        color="secondary"
                        className={classes.inputs}
                    />
                    <TextField
                        label="Zostało rat"
                        type="number"
                        variant="outlined"
                        color="secondary"
                        className={classes.inputs}
                    />
                    <Button className={classes.formBtn}>Zapisz i zamknij</Button>
                </form>
            </Paper>
    )
}