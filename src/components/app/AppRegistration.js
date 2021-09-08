import React from "react";
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
    Checkbox,
    OutlinedInput,
    Button
}
from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
        maxWidth: theme.spacing(187.5),
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
        color: theme.palette.error.main,
        alignSelf: "flex-end"
    },
    sexContainer: {
        marginTop: theme.spacing(3)
    },
    chooseSex: {
        flexDirection: "row"
    },
    agreement: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(3)
    },

}));

const AppRegistration = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box className={classes.box}>
            <Paper className={classes.paper} elevation={3}>
                <IconButton aria-label="close" className={classes.closeBtn}>
                    <HighlightOffIcon />
                </IconButton>
                <form className={classes.form}>
                    <Typography variant="h5">Wprowadź swoje dane</Typography>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        color="secondary"
                        label="Login"
                        className={classes.textField}
                    />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        color="secondary"
                        label="Imię"
                        className={classes.textField}
                    />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        color="secondary"
                        label="Nazwisko"
                        className={classes.textField}
                    />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        color="secondary"
                        label="Email"
                        className={classes.textField}
                    />
                    <FormControl className={classes.textField} variant="outlined" color="secondary">
                        <InputLabel htmlFor="outlined-adornment-password">Wprowadź hasło</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
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
                        <InputLabel htmlFor="outlined-adornment-password">Powtórz hasło</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
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
                    <TextField
                        variant="outlined"
                        color="secondary"
                        id="date"
                        label="Data urodzenia"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl component="fieldset" className={classes.sexContainer}>
                        <FormLabel component="legend" color="secondary">Płeć</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" className={classes.chooseSex}>
                            <FormControlLabel value="female" control={<Radio />} label="Kobieta" />
                            <FormControlLabel value="male" control={<Radio />} label="Mężczyzna" />
                        </RadioGroup>
                    </FormControl>
                    <Box className={classes.agreement}>
                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                        <Typography variant="body2">Zaznaczając pole, zgadzasz się z warunkami
                            korzystania aplikacji.
                        </Typography>
                    </Box>
                    <Button variant="contained" color="secondary">Zarejestruj się</Button>
                </form>
            </Paper>
        </Box>
    )
};

export default AppRegistration;