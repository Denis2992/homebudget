import React from "react";
import {Box, Button, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    box: {
        width: "100%",
        margin: "56px auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    paperBox: {
        padding: theme.spacing(3),
        margin: theme.spacing(0,2,4,2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: `2px solid ${theme.palette.info.main}`,
        maxWidth: 370,
        width: "100%"
    },
    head: {
        textAlign: "center"
    },
    paperBoxText: {
        padding: theme.spacing(2, 0),
        textAlign: "center",
        maxWidth: 240
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.contrastText
    }
}));


export default function Welcome() {
    const classes = useStyles();

    return(
        <Box className={classes.box} elevation={3}>
            <Paper className={classes.paperBox}>
                <Typography variant="h6" className={classes.head}>Witamy w aplikacji Budget Domowy! &#128578;</Typography>
                <Typography variant="body2" className={classes.paperBoxText}>Zanim zaczniesz, zaloguj się</Typography>
                <Button variant="contained" color="primary">
                    <Link to="/app/login" className={classes.link}>Logowanie</Link>
                </Button>
            </Paper>

            <Paper className={classes.paperBox}>
                <Typography variant="h6" className={classes.head}>Nie masz konta? Żaden problem!</Typography>
                <Typography variant="body2" className={classes.paperBoxText}>
                    Naciśnij załóż konto i w pare minut
                    będziesz mieć dostęp do aplikacji
                </Typography>
                <Button variant="contained" color="secondary">
                    <Link to="/app/registration" className={classes.link}>Załóż konto</Link>
                </Button>
            </Paper>
        </Box>
    )
}