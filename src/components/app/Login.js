import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Paper, Button, Box, IconButton, TextField} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Link} from "react-router-dom";
import Header from "./Header";
import {usersDataContext} from "./StartWindow";

const useStyles = makeStyles((theme) => ({
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
        marginTop: theme.spacing(2)
    },
    closeBtn: {
        color: theme.palette.error.main,
        alignSelf: "flex-end"
    },
    iconStyle: {
        color: theme.palette.error.main
    },
    errorMsg: {
        color: theme.palette.error.main,
        paddingTop: theme.spacing(2)
    }
}));

const Login = () => {
    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const {usersData} = useContext(usersDataContext);



    const checkInputs = (e) => {
        e.preventDefault();
       if (usersData.some(user => {
           return user.login === userLogin && user.password === password
       })) {
           setIsLoggedIn(true);
           localStorage.clear();
           let userInfo = {
               login: userLogin,
               password: password
           };
           // or  sessionStorage
           localStorage.setItem("userName", userInfo.login);
           localStorage.setItem("userPassword", userInfo.password);
       } else {
           setError("Niepoprawny login lub hasło")
       }
    };


    const classes = useStyles();

    if (!isLoggedIn) {
        return (
            <Box className={classes.box}>
                <Paper className={classes.paper} elevation={3}>
                    <IconButton aria-label="close" className={classes.closeBtn}>
                        <Link to="/app">
                            <HighlightOffIcon className={classes.iconStyle}/>
                        </Link>
                    </IconButton>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={checkInputs}>
                        <Typography variant="h5">Wprowadź login i hasło</Typography>
                        <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="Login"
                            variant="outlined"
                            onChange={e => setUserLogin(e.target.value)}
                        />
                        <TextField
                            className={classes.textField}
                            id="standard-password-input"
                            label="Hasło"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Typography className={classes.errorMsg} variant="body2">{error}</Typography>
                        <Button
                            className={classes.loginBtn}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Zaloguj się
                        </Button>
                    </form>
                </Paper>
            </Box>
        )
    } else {
        return <Header />
    }
};

export default Login;