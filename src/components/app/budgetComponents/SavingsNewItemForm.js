import React, {useContext, useState} from "react";
import {
    Divider,
    Paper,
    TextField,
    Typography,
    Button,
    makeStyles,
    IconButton,
    List,
    ListItem,
    Grid
} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Link, useHistory} from "react-router-dom";
import {newSavingDataContext} from "./SavingsTable";
import {usersApiUrl, usersDataContext} from "../../../App";
import isDecimal from "validator/es/lib/isDecimal";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        maxWidth: 380,
        minHeight: 550,
        maxHeight: 1000,
        border: `2px solid ${theme.palette.info.main}`,
        display: "flex",
        flexDirection: "column",
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
        backgroundColor: theme.palette.info.main,
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
            backgroundColor: theme.palette.info.main,
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

export default function SavingsNewItemForm () {
    const classes = useStyles();
    const {
        newSavingData,
        setNewSavingData,
        editMode,
        setEditMode,
        setSelected
    } = useContext(newSavingDataContext);
    const {currentUserData, setUsersData, setCurrentUserData} = useContext(usersDataContext);
    const [errorList, setErrorList] = useState([]);
    const history = useHistory();

    const handleValueChange = (event) => {
        const {name, value} = event.target;
        setNewSavingData(prevState => ({...prevState, [name]: value}));
    };

    // inputs validation
    const checkIfFormValid = () => {
        const newErrorList = [];
        const {name, currentState, goal, leftSum} = newSavingData;

        if (!currentState || !goal || !leftSum) {
            newErrorList.push("Wszystkie pola maja byc wypełnione");
        }

        if (!isDecimal(currentState)) {
            newErrorList.push("Aktualny stan ma byc liczbą");
        }

        if (!isDecimal(goal)) {
            newErrorList.push("Cel ma byc liczbą");
        }

        if (!isDecimal(leftSum)) {
            newErrorList.push('Pole "Zostało" ma byc liczbą');
        }


        if (name.length < 3) {
            newErrorList.push('Nazwa musi zawierać minimum 3 litery');
        }

        if (!editMode) {
            if (currentUserData.savings.some(el => el.name === name)) {
                newErrorList.push("Taka nazwa juz istnieje");
            }
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
        const ids = currentUserData.savings.map(el => el.id);

        const dataToSend = {
            savings: [
                ...currentUserData.savings,
                {
                    id: currentUserData.savings.length === 0 ? 1 : (Math.max(...ids) + 1),
                    name: newSavingData.name,
                    currentState: newSavingData.currentState,
                    goal: newSavingData.goal,
                    leftSum: newSavingData.leftSum
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

            setNewSavingData({
                id: "",
                name: "",
                currentState: "",
                goal: "",
                leftSum: ""
            });

            history.push("/app/budget/dataSavings");

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
            savings: [
                ...currentUserData.savings.filter(item => item.id !== newSavingData.id),
                {
                    id: newSavingData.id,
                    name: newSavingData.name,
                    currentState: newSavingData.currentState,
                    goal: newSavingData.goal,
                    leftSum: newSavingData.leftSum
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

            setCurrentUserData({
                id: "",
                name: "",
                currentState: "",
                goal: "",
                leftSum: ""
            });

            setEditMode(false);
            setSelected([]);
            history.push("/app/budget/dataSavings");

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


    return (
        <Grid container spacing={3} style={{justifyContent: "center", marginLeft: 54}}>
            <Grid item xs={9} sm={10} md={12}>
                <Paper className={classes.paper} elevation={3}>
                    <IconButton style={{width: 48, alignSelf: "self-end"}}>
                        <Link to="/app/budget/dataSavings/" style={{height: 24}}>
                            <HighlightOffIcon color="error" />
                        </Link>
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
                            name="name"
                            value={newSavingData.name}
                            variant="outlined"
                            className={classes.inputs}
                            onChange={handleValueChange}
                            color="primary"
                        />
                        <TextField
                            label="Aktualny stan"
                            name="currentState"
                            value={newSavingData.currentState}
                            variant="outlined"
                            color="primary"
                            className={classes.inputs}
                            onChange={handleValueChange}
                        />
                        <TextField
                            label="Cel"
                            name="goal"
                            value={newSavingData.goal}
                            variant="outlined"
                            color="primary"
                            className={classes.inputs}
                            onChange={handleValueChange}
                        />
                        <TextField
                            label="Zostało"
                            name="leftSum"
                            value={newSavingData.leftSum}
                            variant="outlined"
                            color="primary"
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