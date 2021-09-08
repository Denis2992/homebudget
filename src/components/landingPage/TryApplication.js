import React from "react";
import {Button, Container, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    dataContainer: {
        maxWidth: theme.spacing(187.5),
        width: "100%",
    },
    dataBox: {
        maxWidth: 1500,
        margin: "0 auto",
        background: `linear-gradient(45deg, ${theme.palette.secondary.main} 20%, ${theme.palette.primary.main} 90%)`,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },
    dataBoxText: {
        color: theme.palette.primary.contrastText,
        fontWeight: 600,
        padding: theme.spacing(2, 1)
    },
    dataBoxBtn: {
        backgroundColor: theme.palette.info.main,

    },
    BtnLink: {
        textDecoration: "none",
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(0,1)
    }
}))

const TryApplication = () => {
    const classes = useStyles();

    return (
        <Container className={classes.dataContainer}>
            <Paper elevation={3} className={classes.dataBox}>
                <Typography variant="h6" className={classes.dataBoxText}>Przetestuj naszą aplikacje!</Typography>
                <Button variant="contained" className={classes.dataBoxBtn}>
                    <a href="https://www.google.pl/" target="blank" className={classes.BtnLink}>Przejdź</a>
                </Button>
            </Paper>
        </Container>

    )
};

export default TryApplication;
