import React from "react";
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
import { Element } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
    containerData: {
        display: "flex",
        justifyContent: "space-around",
        maxWidth: theme.spacing(187.5),
        width: "100%",
    },
    paperContact: {
        minWidth: 250,
        maxWidth: 400,
        width: "100%",
        background: `linear-gradient(60deg, ${theme.palette.primary.main} 20%, ${theme.palette.primary.contrastText} 80%)`,
        // color: theme.palette.primary.contrastText,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(4)
    },
    paperContactHead: {
      fontWeight: 600,
        lineHeight: theme.spacing(0.25),
        paddingBottom: theme.spacing(2)
    },
    paperContactBoxInfo: {
        display: "flex",
    },
    paperForm: {
        minWidth: 300,
        maxWidth: 600,
        width: "100%",
        background: `linear-gradient(60deg, ${theme.palette.primary.contrastText} 50%, ${theme.palette.primary.main} 90%)`,
    },
    form: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '40ch',
        margin: theme.spacing(1.5, 0)
    },
    agreementBox: {
        display: "flex",

    },
    agreementParagraph: {
        fontSize: 10,
        width: 300
    },
    agreementBtn: {
        marginTop: theme.spacing(3)
    }
}));

const ContactUs = () => {
    const classes = useStyles();

    return (
        <Element name="contact">
            <Container className={classes.containerData} >
                <Paper className={classes.paperContact}  elevation={3}>
                    <Typography variant="h5" className={classes.paperContactHead}>Masz jakieś pytania?<br/>Skontaktuj sie z nami!</Typography>
                    <Box className={classes.paperContactBoxInfo} style={{padding: theme.spacing(2,0)}}>
                        <MailOutlineIcon />
                        <Typography>homebudget@gmail.com</Typography>
                    </Box>
                    <Box className={classes.paperContactBoxInfo}>
                        <CallIcon />
                        <Typography>+44 12 645 48 45</Typography>
                    </Box>
                </Paper>

                <Paper className={classes.paperForm}  elevation={3}>
                    <form className={classes.form} noValidate autoComplete="off">
                        <Typography variant="h5" className={classes.paperContactHead}>Wyślij do nas wiadomość</Typography>
                        <TextField
                            label="Imię"
                            placeholder="Wpisz swoje imię"
                            variant="outlined"
                            id="outlined-basic"
                            className={classes.textField}
                            color="secondary"
                        />
                        <TextField
                            label="Email"
                            placeholder="Wpisz swój email"
                            variant="outlined"
                            id="outlined-basic"
                            className={classes.textField}
                            color="secondary"
                        />
                        <Box className={classes.agreementBox}>
                            <Checkbox />
                            <Typography className={classes.agreementParagraph}>
                                Wyrażam zgodę na przetwarzanie moich danych
                                osobowych podanych w powyższym formularzu w celach
                                handlowych i marketingowych przez Sp z o.o. BudgetDomowy
                                oraz przez podmioty trzecie.
                            </Typography>
                        </Box>
                        <Button variant="contained" color="secondary" className={classes.agreementBtn}>Wyślij</Button>
                    </form>
                </Paper>
            </Container>
        </Element>
    )
};

export default ContactUs;