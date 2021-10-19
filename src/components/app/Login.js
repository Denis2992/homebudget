import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Paper, Button, IconButton, TextField, Box} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Link, useHistory} from "react-router-dom";
import {CurrentUserContext} from "../../index";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useInput from "../hooks/useInput";
import getFirebase from "../firebase/firebase";

const useStyles = makeStyles((theme) => ({
    box: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    paper: {
        maxWidth: theme.spacing(55),
        width: "100%",
        margin: "56px 18px",
        border: `2px solid ${theme.palette.primary.main}`,
        display: "flex",
        flexDirection: "column",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(3),
        paddingTop: 0
    },
    textField: {
        marginTop: theme.spacing(2),
        width: "35ch",
        height: 60
    },
    loginBtn: {
        marginTop: theme.spacing(1)
    },
    closeBtn: {
        color: theme.palette.error.main,
        alignSelf: "flex-end",

    },
    iconStyle: {
        color: theme.palette.error.main,
        height: 24
    }
}));

const schema = yup.object({
    email: yup
        .string()
        .email("Wprowadź poprawny email")
        .max(50, "Maksymalna długość 50 znaków")
        .required("Wprowadź email"),
    password: yup
        .string()
        .required("Wprowadź hasło")
}).required()

const Login = () => {
    const [email, resetEmail] = useInput("");
    const [password, resetPassword] = useInput("");
    const history = useHistory();
    const {setCurrentUser} = useContext(CurrentUserContext);
    const classes = useStyles();
    const firebaseInstance = getFirebase();
    const [sendErr, setSendErr] = useState(false);

    const {control, register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const signIn = async () => {

        try {
            if (firebaseInstance) {
                const user = await firebaseInstance
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                console.log("user", user);
                setCurrentUser(email.value);
                resetEmail();
                resetPassword();
                setSendErr(false);
                history.push("/app");
            }
        } catch (error) {
            console.log("error", error);
            setSendErr(true);
        }
    };

    return (
        <Box className={classes.box}>
            <Paper className={classes.paper} elevation={3}>
                <IconButton aria-label="close" className={classes.closeBtn}>
                    <Link to="/app" style={{height: 24}}>
                        <HighlightOffIcon className={classes.iconStyle} />
                    </Link>
                </IconButton>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit(signIn)}>
                    <Typography variant="h5" style={{marginBottom: 16}}>Wprowadź login i hasło</Typography>
                    <Controller
                        name="email"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.email ? true : false}
                                className={classes.textField}
                                label="Email"
                                size="small"
                                helperText={errors?.email?.message}
                                variant="outlined"
                                {...register("email")}
                                {...email}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.password ? true : false}
                                className={classes.textField}
                                label="Hasło"
                                type="password"
                                size="small"
                                variant="outlined"
                                helperText={errors?.password?.message}
                                {...register("password")}
                                {...password}
                            />
                        )}
                    />
                    <Box style={{height:20, marginTop: 8}}>
                        {sendErr ? (
                            <Typography variant="caption" color="error">Dane zostały niepoprawnie wprowadzone</Typography>
                        ) : null}
                    </Box>
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
};

export default Login;