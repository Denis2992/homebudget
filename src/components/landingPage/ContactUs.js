import React, {useState} from "react";
import {
    Box,
    Container,
    Paper,
    Typography,
    makeStyles,
    TextField,
    Checkbox,
    Button
} from "@material-ui/core";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CallIcon from '@material-ui/icons/Call';
import {theme} from "../../index";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useInput from "../hooks/useInput";
import getFirebase from "../firebase/firebase";
import ReCAPTCHA from "react-google-recaptcha";

const useStyles = makeStyles((theme) => ({
    containerData: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        maxWidth: theme.spacing(187.5),
        width: "100%",
    },
    paperContact: {
        minWidth: 250,
        maxWidth: 400,
        width: "100%",
        background:
            `linear-gradient(60deg,
             ${theme.palette.primary.main} 20%,
             ${theme.palette.primary.contrastText} 80%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(4),
        margin: theme.spacing(2,0),
        [theme.breakpoints.down('sm')]: {
            maxWidth: 535
        },
    },
    paperContactHead: {
      fontWeight: 600,
        lineHeight: theme.spacing(0.25),
        paddingBottom: theme.spacing(2),
    },
    paperContactBoxInfo: {
        display: "flex",
    },
    paperForm: {
        minWidth: 300,
        maxWidth: 600,
        width: "100%",
        background:
            `linear-gradient(60deg,
             ${theme.palette.primary.contrastText} 50%,
             ${theme.palette.primary.main} 90%)`,
        margin: theme.spacing(2,0),
    },
    form: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2, 3)
    },
    textField: {
        minWidth: theme.spacing(32),
        marginTop: theme.spacing(1.5),
        height: 75,
        [theme.breakpoints.down('sm')]: {
            width: "100%",
        },
    },
    messageInput: {
        width: "100%",
        marginTop: theme.spacing(1.5),
        height:115
    },
    agreementBox: {
        marginTop: theme.spacing(1.5),
        display: "flex",

    },
    agreementParagraph: {
        fontSize: 10,
        maxWidth: 400
    },
    agreementBtn: {
        marginTop: theme.spacing(1.5)
    }
}));

const schema = yup.object({
    name: yup
        .string()
        .min(3, "Imię ma zawierać minimum 3 znaki")
        .matches(/^[A-Za-z]+$/i, "Imię nie może mieć liczb")
        .required("Pole nie może być puste"),
    email: yup
        .string()
        .email("Wprowadź poprawny email")
        .max(50, "Maksymalna długość 50 znaków")
        .required("Pole nie może być puste"),
    message: yup
        .string()
        .max(120, "Maksymalna długość 120 znaków")
        .required("Pole nie może być puste"),
    checkbox: yup
        .mixed()
        .notOneOf([false], "Zaznacz zgodę")
        .required()
}).required();

const ContactUs = () => {
    const classes = useStyles();
    const [name, resetName] = useInput("");
    const [email, resetEmail] = useInput("");
    const [message, resetMessage] = useInput("");
    const [checked, setChecked] = useState(false);
    const [captchaChecked, setCaptchaChecked] = useState(false);
    const [captchaErr, setCaptchaErr] = useState(false);
    const [messageStatus, setMessageStatus] =useState(false);
    const firebase = getFirebase();

    const {  control, register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const captchaOnChange = () => setCaptchaChecked(true);

    const sendForm = async () => {
        if (captchaChecked) {
            if (firebase) {
                try {
                    const db = firebase.firestore();
                    const docRef = db.collection("messages").doc();

                    await docRef.set(
                        {
                            name: name.value,
                            email: email.value,
                            message: message.value
                        },
                        {merge: true}
                    );
                    setMessageStatus(true);
                    setTimeout(() => {
                        setMessageStatus(false)
                    }, 2000);
                    setCaptchaChecked(false);
                    setCaptchaErr(false)
                    resetName();
                    resetEmail();
                    resetMessage();
                }catch (error) {
                    console.log("error", error);
                }
            }
        } else {
            setCaptchaErr(true);
        }
    };

    const handleChangeValue = () => {
        setChecked(checked ? false : true);
        console.log(checked);
    };

    return (
        <Container className={classes.containerData} name="contact">
            <Paper className={classes.paperContact}  elevation={3}>
                <Typography
                    variant="h5"
                    className={classes.paperContactHead}
                >
                    Masz jakieś pytania?<br/>Skontaktuj sie z nami!
                </Typography>
                <Box
                    className={classes.paperContactBoxInfo}
                    style={{padding: theme.spacing(2,0)}}>
                    <MailOutlineIcon />
                    <Typography>homebudget@gmail.com</Typography>
                </Box>
                <Box className={classes.paperContactBoxInfo}>
                    <CallIcon />
                    <Typography>+44 12 645 48 45</Typography>
                </Box>
            </Paper>

            <Paper className={classes.paperForm}  elevation={3}>
                <form className={classes.form} onSubmit={handleSubmit(sendForm)}>
                    <Box>
                        {messageStatus ? (
                            <Typography
                                variant="h5"
                                className={classes.paperContactHead}
                            >
                                Wiadomość wysłana!
                            </Typography>
                        ) : (
                            <Typography
                                variant="h5"
                                className={classes.paperContactHead}
                            >
                                Wyślij do nas wiadomość
                            </Typography>
                        )}
                    </Box>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        width: "100%"
                    }}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={() => (
                                <TextField
                                    error={errors?.name ? true : false}
                                    color={errors?.name ? "error" : "secondary"}
                                    label="Imię"
                                    placeholder="Wpisz swoje imię"
                                    variant="outlined"
                                    helperText={errors?.name?.message}
                                    className={classes.textField}
                                    {...register("name")}
                                    {...name}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={() => (
                                <TextField
                                    error={errors?.email ? true : false}
                                    color={errors?.email ? "error" : "secondary"}
                                    label="Email"
                                    placeholder="Wpisz swój email"
                                    variant="outlined"
                                    helperText={errors?.email?.message}
                                    className={classes.textField}
                                    {...register("email")}
                                    {...email}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="message"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.message ? true : false}
                                color={errors?.message ? "error" : "secondary"}
                                label="Wiadomość"
                                variant="outlined"
                                multiline
                                rows={3}
                                helperText={errors?.message?.message}
                                className={classes.messageInput}
                                {...register("message")}
                                {...message}
                            />
                        )}
                    />
                    <Box className={classes.agreementBox}>
                        <Controller
                            name="checkbox"
                            control={control}
                            render={() => (
                                <Checkbox
                                    value={checked}
                                    {...register("checkbox")}
                                    onChange={handleChangeValue}
                                />
                            )}
                        />
                        <Typography className={classes.agreementParagraph}>
                            Wyrażam zgodę na przetwarzanie moich danych
                            osobowych podanych w powyższym formularzu w celach
                            handlowych i marketingowych przez Sp z o.o. BudgetDomowy
                            oraz przez podmioty trzecie.
                        </Typography>
                    </Box>
                    <Box style={{height: 18}}>
                        <Typography
                            variant="caption"
                            color="error"
                        >
                            {errors?.checkbox?.message}
                        </Typography>
                    </Box>
                    <ReCAPTCHA
                        onChange={captchaOnChange}
                        sitekey="6LcR5OUcAAAAAJ8An3RXPIXpDOW6RFAzcfM-mRiG"
                        style={{marginTop: 12}}
                    />
                    <Box style={{height: 18}}>
                        {captchaErr ? (
                            <Typography
                                variant="caption"
                                color="error"
                            >
                                Potwierdź że nie jesteś robotem
                            </Typography>
                        ) : null}
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.agreementBtn}
                        type="submit"
                    >
                        Wyślij
                    </Button>


                </form>
            </Paper>
        </Container>
    )
};

export default ContactUs;