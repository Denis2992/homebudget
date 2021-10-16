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
    },
    agreement: {
        display: "flex",
        alignItems: "center",
        margin: theme.spacing(3, 0)
    },

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


    const onSubmit = async () => {
        console.log("ok");
        try {
            if (firebaseInstance) {
                const user = await firebaseInstance
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value);
                console.log("user", user);
                setCurrentUser(email.value);
                const db = firebaseInstance.firestore();
                const docRef = db.collection(`${email.value}`).doc();

                await docRef.set(
                    {
                        name: name.value,
                        surname: surname.value,
                        email: email.value,
                        birthDate: birthDate.value,
                        gender: gender.value
                    },
                    {merge: true}
                );
                resetName();
                resetSurname();
                resetEmail();
                resetPassword();
                resetConfirmPassword();
                resetBirthDate();
                resetGender();
                history.push("/app");
            }
        } catch (error) {
            console.log("error", error);
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
                    <Box>
                        {errors?.email ? (
                            <Controller
                                name="email"
                                control={control}
                                render={() => (
                                    <TextField
                                        error
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
                        ) : (
                            <Controller
                                name="email"
                                control={control}
                                render={() => (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        label="Email"
                                        className={classes.textField}
                                        {...register("email")}
                                        {...email}
                                    />
                                )}
                            />
                        )}
                    </Box>
                    <Box>
                        {errors?.name ? (
                            <Controller
                                name="name"
                                control={control}
                                render={() => (
                                    <TextField
                                        error
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
                        ) : (
                            <Controller
                                name="name"
                                control={control}
                                render={() => (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        label="Imię"
                                        className={classes.textField}
                                        {...register("name")}
                                        {...name}
                                    />
                                )}
                            />
                        )}
                    </Box>
                    <Box>
                        {errors?.surname ? (
                            <Controller
                                name="surname"
                                control={control}
                                render={() => (
                                    <TextField
                                        error
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
                        ) : (
                            <Controller
                                name="surname"
                                control={control}
                                render={() => (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        label="Nazwisko"
                                        className={classes.textField}
                                        {...register("surname")}
                                        {...surname}
                                    />
                                )}
                            />
                        )}
                    </Box>
                    <Box>
                        {errors?.password ? (
                            <Controller
                                name="password"
                                control={control}
                                render={() => (
                                    <FormControl
                                        className={classes.textField}
                                        variant="outlined"
                                        error
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
                                )}
                            />
                        ) : (
                            <Controller
                                name="password"
                                control={control}
                                render={() => (
                                    <FormControl
                                        className={classes.textField}
                                        variant="outlined"
                                        color="secondary"
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
                                                    style={{height:40, width: 40,}}
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>

                                            }
                                            labelWidth={125}
                                        />
                                    </FormControl>
                                )}
                            />
                        )}
                    </Box>
                    <Box>
                        {errors?.confirmPassword ? (
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={() => (
                                    <FormControl className={classes.textField}
                                                 variant="outlined"
                                                 error
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
                        ) : (
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={() => (
                                    <FormControl className={classes.textField} variant="outlined" color="secondary"  size="small">
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
                                    </FormControl>
                                )}
                            />
                        )}
                    </Box>
                    <Box>
                        {errors?.birthDate ? (
                            <Controller
                                name="birthDate"
                                control={control}
                                render={() => (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        error
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
                        ) : (
                            <Controller
                                name="birthDate"
                                control={control}
                                render={() => (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        color="secondary"

                                        label="Data urodzenia"
                                        type="date"
                                        defaultValue=""
                                        className={classes.textField}
                                        {...register("birthDate")}
                                        {...birthDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                )}
                            />
                        )}
                    </Box>
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
                    <Box className={classes.agreement}>
                        <Typography
                            variant="body2"
                            style={{textAlign: "center"}}
                        >
                            Klikając załóż konto, zgadzasz się z warunkami
                            korzystania aplikacji.
                        </Typography>
                    </Box>
                    <Button variant="contained" color="secondary" type="submit">Zarejestruj się</Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Registration;