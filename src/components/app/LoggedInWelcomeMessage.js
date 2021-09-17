import React from "react";
import {Button, Paper, Typography, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 400,
        position: "absolute",
        top: "20vh",
        left: "50vw",
        transform: "translate(-50%, 0)",
        textAlign: "center",
        padding: theme.spacing(2),
        border: `2px solid ${theme.palette.primary.main}`
    },
}));

export default function LoggedInWelcomeMessage () {
    const classes = useStyles()

    return (
        <Paper className={classes.paper} elevation={3}>
            <Typography variant="h5" style={{padding: 16}}>Dzień dobry!</Typography>
            <Typography style={{padding: 8}}>Kliknij na ikonkę w menu po lewej stronie i zaczynamy!</Typography>
            <Typography variant="subtitle2" style={{padding: 8}}>Chcesz sie dowiedzieć trochę o kartach menu? Najedz myszka na ikonkę i dostaniesz ogólną informacje</Typography>
            <Button
                style={{margin: 16}}
                color="secondary"
                variant="contained"
            >
                <Link to="/app">
                    Zamknij
                </Link>
            </Button>
        </Paper>
    )
}