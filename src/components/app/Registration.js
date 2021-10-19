import React, {useState, useContext} from "react";
import {
    Box,
    Paper,
    TextField,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    makeStyles,
    InputLabel,
    IconButton,
    OutlinedInput,
    Button
}
    from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Link, useHistory} from "react-router-dom";
import {CurrentUserContext} from "../../index";
import useInput from "../hooks/useInput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import getFirebase from "../firebase/firebase";
// import ReCAPTCHA from "react-google-recaptcha";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '35ch',
        height: 60,
        marginTop: theme.spacing(2)
    },
    box: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    paper: {
        maxWidth: theme.spacing(55),
        margin: "56px 16px",
        border: `2px solid ${theme.palette.secondary.main}`,
        display: "flex",
        flexDirection: "column",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        paddingTop: 0,
    },
    closeBtn: {
        alignSelf: "flex-end"
    },
    iconStyle: {
        color: theme.palette.error.main
    },
    genderContainer: {
        marginTop: theme.spacing(2),
    },
    chooseGender: {
        flexDirection: "row",
    }
}));

const schema = yup.object({
    email: yup
        .string()
        .email("Wprowadź poprawny email")
        .max(50, "Maksymalna długość 50 znaków")
        .required("Pole nie może być puste"),
    name: yup
        .string()
        .min(3, "Imię ma zawierać minimum 3 znaki")
        .matches(/^[A-Za-z]+$/i, "Imię nie może mieć liczb")
        .required("Pole nie może być puste"),
    surname: yup
        .string()
        .min(3, "Imię ma zawierać minimum 3 znaki")
        .matches(/^[A-Za-z]+$/i, "Imię nie może mieć liczb")
        .required("Pole nie może być puste"),
    password: yup
        .string()
        .min(6, "Minimalna długość 6 znaków")
        .required("Wprowadź hasło"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Hasła maja byc jednakowe")
        .required("Powtórz hasło"),
    birthDate: yup.string().required("Wybierz date urodzenia"),
}).required();


const Registration = () => {
    const classes = useStyles();
    const [email, resetEmail] = useInput("");
    const [name, resetName] = useInput("");
    const [surname, resetSurname] = useInput("");
    const [password, resetPassword] = useInput("");
    const [confirmPassword, resetConfirmPassword] = useInput("");
    const [birthDate, resetBirthDate] = useInput("");
    const [gender, resetGender] = useInput("");
    const [values, setValues] = useState({
        showPassword: false,
        showConfirmPassword: false
    });
    // const [captcha, setCaptcha] = useState(false);
    const [sendErr, setSendErr] = useState(false);
    const history = useHistory();
    const {setCurrentUser} = useContext(CurrentUserContext);
    const firebaseInstance = getFirebase();


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

    const {  control, register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    // const captchaOnChange = () => {
    //     setCaptcha(true)
    // }

    const onSubmit = async () => {
        try {
            if (firebaseInstance) {
                const user = await firebaseInstance
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value);
                console.log("user", user);
                setCurrentUser(email.value);
                const db = firebaseInstance.firestore();
                const docUserData = db.collection(`${email.value}`)
                    .doc("userData");


                await docUserData.set(
                    {
                        name: name.value,
                        surname: surname.value,
                        email: email.value,
                        birthDate: birthDate.value,
                        gender: gender.value
                    },
                    {merge: true}
                );

                const categoriesRef =
                    db.collection(`${email.value}`)
                        .doc("userData")
                        .collection('category');

                categoriesRef
                    .doc()
                    .set({
                        id: 1,
                        name: "Pensja"
                    })
                    .then(function () {
                        console.log('Document Added');
                    })
                    .catch(function (error) {
                        console.error('Error adding document: ', error);
                    });

                categoriesRef
                    .doc()
                    .set({
                        id: 2,
                        name: "Zakupy"
                    })
                    .then(function () {
                        console.log('Document Added');
                    })
                    .catch(function (error) {
                        console.error('Error adding document: ', error);
                    });

                categoriesRef
                    .doc()
                    .set({
                        id: 3,
                        name: "Auto"
                    })
                    .then(function () {
                        console.log('Document Added');
                    })
                    .catch(function (error) {
                        console.error('Error adding document: ', error);
                    });

                resetName();
                resetSurname();
                resetEmail();
                resetPassword();
                resetConfirmPassword();
                resetBirthDate();
                resetGender();
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
                        <HighlightOffIcon className={classes.iconStyle}/>
                    </Link>
                </IconButton>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h5" style={{marginBottom: 16}}>Wprowadź swoje dane</Typography>
                    <Controller
                        name="email"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.email ? true : false}
                                color={errors?.email ? "error" : "secondary"}
                                variant="outlined"
                                size="small"
                                label="Email"
                                helperText={errors?.email?.message}
                                className={classes.textField}
                                {...register("email")}
                                {...email}
                            />
                        )}
                    />
                    <Controller
                        name="name"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.name ? true : false}
                                color={errors?.name ? "error" : "secondary"}
                                variant="outlined"
                                size="small"
                                label="Imię"
                                helperText={errors?.name?.message}
                                className={classes.textField}
                                {...register("name")}
                                {...name}
                            />
                        )}
                    />
                    <Controller
                        name="surname"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.surname ? true : false}
                                color={errors?.surname ? "error" : "secondary"}
                                variant="outlined"
                                size="small"
                                label="Nazwisko"
                                helperText={errors?.surname?.message}
                                className={classes.textField}
                                {...register("surname")}
                                {...surname}
                            />
                        )}
                    />
                    <Controller name="password" control={control} render={() => (
                        <FormControl
                            className={classes.textField}
                            variant="outlined"
                            error={errors?.password ? true : false}
                            color={errors?.password ? "error" : "secondary"}
                            size="small"
                        >
                            <InputLabel htmlFor="enterPassword">Wprowadź hasło</InputLabel>
                            <OutlinedInput
                                id="enterPassword"
                                type={values.showPassword ? 'text' : 'password'}
                                {...register("password")}
                                {...password}
                                endAdornment={
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={e => e.preventDefault()}
                                        edge="end"
                                        style={{height:40, width: 40}}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>

                                }
                                labelWidth={125}
                            />
                            <Typography
                                variant="caption"
                                color="error"
                                style={{padding: "4px 14px 0 14px"}}
                            >
                                {errors?.password?.message}
                            </Typography>
                        </FormControl>
                    )}/>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={() => (
                            <FormControl className={classes.textField}
                                         variant="outlined"
                                         error={errors?.confirmPassword ? true : false}
                                         color={errors?.confirmPassword ? "error" : "secondary"}
                                         size="small"
                            >
                                <InputLabel htmlFor="confPassword">Powtórz hasło</InputLabel>
                                <OutlinedInput
                                    id="confPassword"
                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                    {...register("confirmPassword")}
                                    {...confirmPassword}
                                    endAdornment={
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={e => e.preventDefault()}
                                            edge="end"
                                            style={{height: 40, width: 40}}
                                        >
                                            {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    }
                                    labelWidth={105}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    color="error"
                                    style={{padding: "4px 14px 0 14px"}}
                                >
                                    {errors?.confirmPassword?.message}
                                </Typography>
                            </FormControl>
                        )}
                    />

                            <Controller
                                name="birthDate"
                                control={control}
                                render={() => (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        error={errors?.birthDate ? true : false}
                                        color={errors?.birthDate ? "error" : "secondary"}
                                        label="Data urodzenia"
                                        type="date"
                                        defaultValue=""
                                        helperText={errors?.birthDate?.message}
                                        className={classes.textField}
                                        {...register("birthDate")}
                                        {...birthDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                )}
                            />
                    <FormControl component="fieldset" className={classes.genderContainer}>
                        <FormLabel color="secondary" style={{width:30}}>Płeć</FormLabel>
                                <RadioGroup
                                    name="gender"
                                    className={classes.chooseGender}
                                    {...gender}
                                >
                                    <FormControlLabel
                                        value="mężczyzna"
                                        control={<Radio />}
                                        label="Mężczyzna"

                                    />
                                    <FormControlLabel
                                        value="kobieta"
                                        control={<Radio />}
                                        label="Kobieta"
                                    />
                                </RadioGroup>
                    </FormControl>
                    <Typography
                        variant="body2"
                        style={{textAlign: "center", marginTop: 24}}
                    >
                        Klikając załóż konto, zgadzasz się z warunkami
                        korzystania aplikacji.
                    </Typography>
                    {/*<ReCAPTCHA*/}
                    {/*    sitekey="Your client site key"*/}
                    {/*    onChange={captchaOnChange}*/}
                    {/*    style={{marginBottom: 24}}*/}
                    {/*/>*/}
                    <Box style={{height:20, margin: "8px 0"}}>
                        {sendErr ? (
                            <Typography variant="caption" color="error">Rejestracja się nie powiodła</Typography>
                        ) : null}
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        style={{marginBottom: 8}}
                    >
                        Zarejestruj się
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Registration;