import React from "react";
import {Box, Button, Divider, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: theme.spacing(120),
        width: "100%",
        margin: "56px auto",
        display: "flex",
        justifyContent: "space-around",
        border: `2px solid ${theme.palette.info.main}`,
    },
    paperBox: {
        padding: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    paperBoxText: {
        padding: theme.spacing(3, 0),
    },
}));

export default function AppWelcome() {
    const classes = useStyles();

    return(
        <Paper className={classes.paper} elevation={3}>
            <Box className={classes.paperBox}>
                <Typography variant="h6">Witamy w aplikacji Budget Domowy! &#128578;</Typography>
                <Typography variant="h6" className={classes.paperBoxText}>Zanim zaczniesz, zaloguj się</Typography>
                <Button variant="contained" color="primary" >Logowanie</Button>
            </Box>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Box className={classes.paperBox}>
                <Typography variant="h6">Nie masz konta? Żaden problem!</Typography>
                <Typography variant="h6" className={classes.paperBoxText}>
                    Naciśnij załóż konto i w pare minut<br/>
                    będziesz mieć dostęp do aplikacji
                </Typography>
                <Button variant="contained" color="secondary">Załóż konto</Button>
            </Box>
        </Paper>
    )
}