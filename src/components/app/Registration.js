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
    InputAdornment,
    IconButton,
    OutlinedInput,
    Button
}
from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Link, useHistory} from "react-router-dom";
import {usersDataContext} from "../../App";
import validator from "validator/es";
import {usersApiUrl} from "../../App";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '35ch',
        marginTop: theme.spacing(4)
    },
    box: {
        width: "100%"
    },
    paper: {
        maxWidth: theme.spacing(70),
        margin: "56px auto",
        border: `2px solid ${theme.palette.secondary.main}`,
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
    closeBtn: {
        alignSelf: "flex-end"
    },
    iconStyle: {
        color: theme.palette.error.main
    },
    genderContainer: {
        marginTop: theme.spacing(3)
    },
    chooseGender: {
        flexDirection: "row"
    },
    agreement: {
        display: "flex",
        alignItems: "center",
        margin: theme.spacing(3, 0)
    },

}));

const Registration = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        login: "",
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        gender: "",
        showPassword: false,
        showConfirmPassword: false
    });
    const [errorList, setErrorList] = useState([]);
    const history = useHistory();
    const {usersData} = useContext(usersDataContext);


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };




    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const checkIfFormValid = () => {
        const newErrorList = [];
        const {
            login,
            name,
            surname,
            email,
            password,
            confirmPassword,
            birthDate,
            gender,
        } = values;

        if (usersData.some(user => {
            return user.login === login
        }) && login.length !== 0 ) {
            newErrorList.push("Login jest zajęty");
        }

        if (login.length === 0 && login.length < 3) {
            newErrorList.push("Pole login nie może byc puste i musi zawierać minimum 3 znaki")
        }

        if (!validator.isAlpha(name,'pl-PL') || name.length < 3) {
            newErrorList.push("Imie nie może zawierać liczby lub znaki i musi zawierać minimum 3 litery")
        }

        if (!validator.isAlpha(surname, 'pl-PL') || surname.length < 3) {
            newErrorList.push("Nazwisko nie może zawierać liczby lub znaki i musi zawierać 3 litery");
        }

        if (!validator.isEmail(email)) {
            newErrorList.push("Wprowadź poprawny email");
        }

        if (password !== confirmPassword) {
            newErrorList.push("Hasła mają byc takie same");
        }

        if (birthDate === "") {
            newErrorList.push("Wprowadź date urodzenia");
        }

        if (gender === "") {
            newErrorList.push("Wybierz płeć");
        }

        setErrorList(newErrorList);

        return newErrorList.length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (checkIfFormValid()) {
            const dataToSend = {
                login: values.login,
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
                birthDate: values.birthDate,
                gender: values.gender,
                budget: [],
                credits: [],
                savings: [],
            };

            fetch(usersApiUrl, {
                method: "POST",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((resp) => {
                    if (resp.ok) {
                      return resp.json();
                    } else {
                        throw new Error("Błąd sieci!")
                    }
                })
                .then((data) => {
                    localStorage.setItem("userName", data.login);
                    localStorage.setItem("userPassword", data.password);
                    history.push("/app");
                    setValues({
                        login: "",
                        name: "",
                        surname: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        birthDate: "",
                        gender: "",
                    });
                })
                .catch((err) => console.log("Błąd!", err));
        }
    };

    const getErrorToRender = () => {
        let errorToRender;

        if (errorList.length > 0) {
            errorToRender = (
                <Box>
                    <ul>
                        {errorList.map((singleError, index) => (
                            <li key={index}>
                                <Typography variant="body2" style={{color: "red"}}>{singleError}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
            );
        } else {
            errorToRender = null;
        }

        return errorToRender;
    };

    return (
        <Box className={classes.box}>
            <Paper className={classes.paper} elevation={3}>
                <IconButton aria-label="close" className={classes.closeBtn}>
                    <Link to="/app" style={{height: 24}}>
                        <HighlightOffIcon className={classes.iconStyle}/>
                    </Link>
                </IconButton>
                <form className={classes.form} onSubmit={handleFormSubmit}>
                    <Typography variant="h5">Wprowadź swoje dane</Typography>
                    <TextField
                        id="login"
                        variant="outlined"
                        color="secondary"
                        label="Login"
                        className={classes.textField}
                        value={values.login}
                        onChange={handleChange("login")}
                    />
                    <TextField
                        id="name"
                        variant="outlined"
                        color="secondary"
                        label="Imię"
                        className={classes.textField}
                        value={values.name}
                        onChange={handleChange("name")}
                    />
                    <TextField
                        id="surname"
                        variant="outlined"
                        color="secondary"
                        label="Nazwisko"
                        className={classes.textField}
                        value={values.surname}
                        onChange={handleChange("surname")}
                    />
                    <TextField
                        id="email"
                        variant="outlined"
                        color="secondary"
                        label="Email"
                        className={classes.textField}
                        value={values.email}
                        onChange={handleChange("email")}
                    />
                    <FormControl className={classes.textField} variant="outlined" color="secondary">
                        <InputLabel htmlFor="enterPassword">Wprowadź hasło</InputLabel>
                        <OutlinedInput
                            label="Wprowadź hasło"
                            id="enterPassword"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <FormControl className={classes.textField} variant="outlined" color="secondary">
                        <InputLabel htmlFor="confirmPassword">Powtórz hasło</InputLabel>
                        <OutlinedInput
                            label="Powtórz hasło"
                            id="confirmPassword"
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        id="birthDate"
                        name="birthDate"
                        label="Data urodzenia"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        value={values.birthDate}
                        onChange={handleChange("birthDate")}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl component="fieldset" className={classes.genderContainer}>
                        <FormLabel component="legend" color="secondary">Płeć</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            className={classes.chooseGender}
                        >
                            <FormControlLabel
                                name="gender"
                                value="kobieta"
                                control={<Radio />}
                                label="Kobieta"
                                onChange={handleChange("gender")}
                                checked={values.gender === "kobieta"}
                            />
                            <FormControlLabel
                                name="gender"
                                value="mężczyzna"
                                control={<Radio />}
                                label="Mężczyzna"
                                onChange={handleChange("gender")}
                                checked={values.gender === "mężczyzna"}
                            />
                        </RadioGroup>
                    </FormControl>
                    {getErrorToRender()}
                    <Box className={classes.agreement}>
                        <Typography variant="body2">Klikając zarejestruj się, zgadzasz się z warunkami
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