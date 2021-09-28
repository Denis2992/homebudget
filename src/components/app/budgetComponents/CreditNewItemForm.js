import React, {useContext, useState} from "react";
import {
    Divider,
    Paper,
    TextField,
    Typography,
    Button,
    makeStyles,
    IconButton, List, ListItem, Grid
} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useHistory} from "react-router-dom";
import {newCreditDataContext} from "./CreditTableFull";
import {usersApiUrl, usersDataContext} from "../../../App";
import isDecimal from "validator/es/lib/isDecimal";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        maxWidth: 380,
        minHeight: 720,
        border: `2px solid ${theme.palette.warning.light}`,
        display: "flex",
        flexDirection: "column",
        zIndex: 2,
        [theme.breakpoints.up('sm')]: {
            position: "absolute",
            left: "25vw",
            top: "12vh",
        },
        [theme.breakpoints.up('md')]: {
            position: "absolute",
            left: "40vw",
            top: "12vh",
        },

    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2)
    },
    headText: {
        textAlign: "center",
        paddingBottom: theme.spacing(2),
        fontWeight: 600
    },
    divider: {
        backgroundColor: theme.palette.warning.light,
        height: 2,

    },
    inputs: {
        margin: theme.spacing(2, 0),
        width: theme.spacing(35),
    },
    formBtn: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(2, 0),
        "&:hover" : {
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.text.primary
        }
    },
    list: {
        width: theme.spacing(35),

    },
    listElement: {
        color: theme.palette.error.main,
        padding: "3px 0"
    }
}));

export default function CreditNewItemForm () {
    const {
        currentUserData,
        setCurrentUserData,
        setUsersData
    } = useContext(usersDataContext);
    const {
        newCreditData,
        setNewCreditData,
        setSelected,
        editMode,
        setEditMode
    } = useContext(newCreditDataContext);
    const [errorList, setErrorList] = useState([]);
    const history = useHistory();

    const handleValueChange = (event) => {
        const {name, value} = event.target;
        setNewCreditData(prevState => ({...prevState, [name]: value}));
    };

    // inputs validation
    const checkIfFormValid = () => {
        const newErrorList = [];
        const {creditTitle, creditSumm, paidSumm, leftSumm, monthlyPayment, leftPayments} = newCreditData;

        if (creditTitle.length < 3) {
            newErrorList.push("Nazwa musi zawierać minimum 3 litery");
        }

        if (!editMode) {
            if (currentUserData.credits.some(el => el.creditTitle === creditTitle)) {
                newErrorList.push("Taka nazwa juz istnieje")
            }
        }

        if (!creditSumm || !paidSumm || !leftSumm || !monthlyPayment || !leftPayments) {
            newErrorList.push("Wszystkie pola maja byc wypełnione")
        }

        if (!isDecimal(creditSumm)) {
              newErrorList.push("Całkowita suma ma byc liczbą i może byc liczba dziesiętną");
        }

        if (!isDecimal(paidSumm)) {
              newErrorList.push("Pole spłacono ma byc liczbą i może byc liczba dziesiętną");
        }

        if (!isDecimal(leftSumm)) {
            newErrorList.push("Pole spłacono ma byc liczbą i może byc liczba dziesiętną");
        }

        if (!isDecimal(monthlyPayment)) {
            newErrorList.push("Miesięczna rata ma byc liczbą i może byc liczba dziesiętną");
        }

        if (!isDecimal(leftPayments)) {
              newErrorList.push("Pole zostało rat ma byc liczbą i może byc liczba dziesiętną");
        }

        setErrorList(newErrorList);

        return newErrorList.length === 0;
    };

    const getErrorsToRender = () => {
        let errorsToRender

        if (errorList.length > 0) {
            errorsToRender = (
                <List className={classes.list}>
                    {errorList.map((err, i) => (
                        <ListItem
                            key={i}
                            className={classes.listElement}
                            variant="body2"
                        >
                            {err}
                        </ListItem>
                    ))}
                </List>
            );
        } else {
            errorsToRender = null;
        }

        return errorsToRender;
    };

    const handleAddNewItem = () => {
        const ids = currentUserData.credits.map(el => el.id);

        const dataToSend = {
            credits : [
                ...currentUserData.credits,
                {
                    id: currentUserData.credits.length === 0 ? 1 : (Math.max(...ids) + 1),
                    creditTitle: newCreditData.creditTitle,
                    creditSumm: newCreditData.creditSumm,
                    paidSumm: newCreditData.paidSumm,
                    leftSumm: newCreditData.leftSumm,
                    monthlyPayment: newCreditData.monthlyPayment,
                    leftPayments: newCreditData.leftPayments
                }
            ]
        };

        if (checkIfFormValid()) {
            fetch(`${usersApiUrl}/${currentUserData.id}`, {
                method: "PATCH",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => {
                    if (resp.ok) {
                        return resp.json();
                    } else {
                        throw new Error("Błąd")
                    }
                })
                .then(data => {
                    setCurrentUserData(data);

                })
                .catch((err) => console.log("Błąd", err));

            setNewCreditData({
                id: "",
                creditTitle: "",
                creditSumm: "",
                paidSumm: "",
                leftSumm: "",
                monthlyPayment: "",
                leftPayments: ""
            });

            history.push("/app/budget/dataCredit");

            fetch(usersApiUrl)
                .then((resp) => {
                    if (resp.ok) {
                        return resp.json();
                    } else {
                        throw new Error("Błąd sieci!");
                    }
                })
                .then((data) => {
                    setUsersData(data);
                })
                .catch(err => console.log("Błąd!", err));
        }
    };

    const handleSaveEditItem = () => {
        const dataToSend = {
            credits: [
                ...currentUserData.credits.filter(item => item.id !== newCreditData.id),
                {
                    id: newCreditData.id,
                    creditTitle: newCreditData.creditTitle,
                    creditSumm: newCreditData.creditSumm,
                    paidSumm: newCreditData.paidSumm,
                    leftSumm: newCreditData.leftSumm,
                    monthlyPayment: newCreditData.monthlyPayment,
                    leftPayments: newCreditData.leftPayments
                }
            ]
        };

        if (checkIfFormValid()) {
            fetch(`${usersApiUrl}/${currentUserData.id}`, {
                method: "PATCH",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => {
                    if (resp.ok) {
                        return resp.json();
                    } else {
                        throw new Error("Błąd")
                    }
                })
                .then(data => {
                    setCurrentUserData(data);

                })
                .catch((err) => console.log("Błąd", err));

            setNewCreditData({
                id: "",
                creditTitle: "",
                creditSumm: "",
                paidSumm: "",
                leftSumm: "",
                monthlyPayment: "",
                leftPayments: ""
            });

            setEditMode(false);
            setSelected([]);
            history.push("/app/budget/dataCredit");

            fetch(usersApiUrl)
                .then((resp) => {
                    if (resp.ok) {
                        return resp.json();
                    } else {
                        throw new Error("Błąd sieci!");
                    }
                })
                .then((data) => {
                    setUsersData(data);
                })
                .catch(err => console.log("Błąd!", err));
        }
    };

    const handleSendForm = (e) => {
        e.preventDefault();
        if (editMode) {
            return handleSaveEditItem();
        } else {
            return handleAddNewItem();
        }
    };

    const handleCloseForm = () => {
        setNewCreditData({
            id: "",
            creditTitle: "",
            creditSumm: "",
            paidSumm: "",
            leftSumm: "",
            monthlyPayment: "",
            leftPayments: ""
        });
        setEditMode(false);
        history.push("/app/budget/dataCredit");
    }

    const classes = useStyles();

    return (
        <Grid container spacing={3} style={{justifyContent: "center", marginLeft: 54}}>
            <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>
                <IconButton style={{width: 48, alignSelf: "self-end"}} onClick={handleCloseForm}>
                    <HighlightOffIcon color="error" />
                </IconButton>
                {editMode ? (
                    <Typography className={classes.headText} variant="h6">Edytuj</Typography>
                ) : (
                    <Typography className={classes.headText} variant="h6">Nowy wpis</Typography>
                )}
                <Divider className={classes.divider} variant="middle"/>
                <form className={classes.form} onSubmit={handleSendForm}>
                    <TextField
                        label="Nazwa"
                        name="creditTitle"
                        value={newCreditData.creditTitle}
                        variant="outlined"
                        className={classes.inputs}
                        color="secondary"
                        onChange={handleValueChange}
                    />
                    <TextField
                        label="Całkowita suma"
                        name="creditSumm"
                        value={newCreditData.creditSumm}
                        variant="outlined"
                        color="secondary"
                        className={classes.inputs}
                        onChange={handleValueChange}
                    />
                    <TextField
                        label="Spłacono"
                        name="paidSumm"
                        value={newCreditData.paidSumm}
                        variant="outlined"
                        color="secondary"
                        className={classes.inputs}
                        onChange={handleValueChange}
                    />
                    <TextField
                        label="Zostało"
                        name="leftSumm"
                        value={newCreditData.leftSumm}
                        variant="outlined"
                        color="secondary"
                        className={classes.inputs}
                        onChange={handleValueChange}
                    />
                    <TextField
                        label="Miesięczna rata"
                        name="monthlyPayment"
                        value={newCreditData.monthlyPayment}
                        variant="outlined"
                        color="secondary"
                        className={classes.inputs}
                        onChange={handleValueChange}
                    />
                    <TextField
                        label="Zostało rat"
                        name="leftPayments"
                        value={newCreditData.leftPayments}
                        variant="outlined"
                        color="secondary"
                        className={classes.inputs}
                        onChange={handleValueChange}
                    />
                    {getErrorsToRender()}
                    <Button className={classes.formBtn} type="submit">Zapisz i zamknij</Button>
                </form>
            </Paper>
            </Grid>
        </Grid>
    )
}