import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Paper, Button, Box, IconButton, TextField} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    box: {
        maxWidth: theme.spacing(187.5),
    },
    paper: {
        maxWidth: theme.spacing(70),
        margin: "56px auto",
        border: `2px solid ${theme.palette.primary.main}`,
        display: "flex",
        flexDirection: "column"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(3),
        paddingTop: 0

    },
    textField: {
        marginTop: theme.spacing(4),
        width: "35ch"
    },
    loginBtn: {
        marginTop: theme.spacing(4)
    },
    closeBtn: {
        color: theme.palette.error.main,
        alignSelf: "flex-end"
    }
}));

const AppLogin = () => {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Paper className={classes.paper} elevation={3}>
                <IconButton aria-label="close" className={classes.closeBtn}>
                    <HighlightOffIcon />
                </IconButton>
                <form className={classes.form} noValidate autoComplete="off">
                    <Typography variant="h5">Wprowadź login i hasło</Typography>
                    <TextField
                        className={classes.textField}
                        id="outlined-basic"
                        label="Login"
                        variant="outlined"
                    />
                    <TextField
                        className={classes.textField}
                        id="standard-password-input"
                        label="Hasło"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                    />
                    <Button
                        className={classes.loginBtn}
                        variant="contained"
                        color="primary"
                    >
                        Zaloguj się
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AppLogin;