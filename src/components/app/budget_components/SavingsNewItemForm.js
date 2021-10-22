import React, {useContext} from "react";
import {
    Divider,
    Paper,
    TextField,
    Typography,
    Button,
    makeStyles,
    IconButton,
    Grid
} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useHistory} from "react-router-dom";
import {newSavingDataContext} from "./SavingsTable";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import getFirebase from "../../firebase/firebase";
import {currentUserContext} from "../../../index";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        maxWidth: 380,
        maxHeight: 550,
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
    gridBox: {
        justifyContent: "center",
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
        marginTop: theme.spacing(2),
        width: theme.spacing(35),
        height: 60
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

const schema = yup.object({
    name: yup
        .string()
        .min(3, "Tytuł ma zawierać minimum 3 znaki")
        .matches(/^[A-Za-z]+$/i, "Tytuł nie może mieć liczb")
        .required("Pole nie może być puste"),
    currentState: yup
        .number()
        .typeError("Wpisz poprawną sumę")
        .required(),
    goal: yup
        .number()
        .typeError("Wpisz poprawną sumę")
        .required(),
    leftSum: yup
        .number()
        .typeError("Wpisz poprawną sumę")
        .required()
}).required();

export default function SavingsNewItemForm () {
    const classes = useStyles();
    const {
        savings, setSavings,
        newSavingData,
        setNewSavingData,
        editMode,
        setEditMode,
        setSelected
    } = useContext(newSavingDataContext);
    const history = useHistory();
    const firebase = getFirebase();
    const {currentUser} = useContext(currentUserContext);

    const {  control, register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const handleValueChange = (event) => {
        const {name, value} = event.target;
        setNewSavingData(prevState => ({...prevState, [name]: value}));
    };

    const handleAddNewItem = () => {
        const ids = savings.map(el => el.id);

        const dataToSend = {
            id: savings.length === 0 ? 1 : (Math.max(...ids) + 1),
            name: newSavingData.name,
            currentState: newSavingData.currentState,
            goal: newSavingData.goal,
            leftSum: newSavingData.leftSum
        };

        if (firebase) {
            try {
                const db = firebase.firestore()
                const budgetRef = db.collection(`${currentUser}`)
                    .doc("userData")
                    .collection("savings");

                budgetRef.doc().set(dataToSend)
                    .then(function () {
                        console.log('Document Added');
                        setSavings(prevState => [...prevState, dataToSend]);
                    })
                    .catch(function (error) {
                        console.error('Error adding document: ', error);
                    });
            } catch (error) {
                console.log("error", error);
            }
        }

        setNewSavingData({
            name: "",
            currentState: "",
            goal: "",
            leftSum: ""
        });
        history.push("/app/budget/dataSavings")
    };

    const handleSaveEditItem = () => {
        const dataToSend = {
            id: newSavingData.id,
            name: newSavingData.name,
            currentState: newSavingData.currentState,
            goal: newSavingData.goal,
            leftSum: newSavingData.leftSum
        };

        const db = firebase.firestore();
        const budgetRef = db.collection(`${currentUser}`)
            .doc("userData").collection("savings");

        budgetRef.where("id", "==", newSavingData.id)
            .get()
            .then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    doc.ref.update(dataToSend).then(() => {
                        console.log("Document successfully edited!");
                        setSavings([...savings?.filter(item => item.id !== newSavingData.id), dataToSend]);
                    }).catch(error => {
                        console.log("Error removing document: ", error);
                    });
                });
            })
            .catch(error => {
                console.log("Error getting documents: ", error);
            })

        setEditMode(false);
        setSelected([]);
        setNewSavingData({
            id: "",
            name: "",
            currentState: "",
            goal: "",
            leftSum: ""
        });
        history.push("/app/budget/dataSavings")
    };

    const handleSendForm = () => {
        if (editMode) {
            return handleSaveEditItem();
        } else {
            return handleAddNewItem();
        }
    };

    const handleCloseForm = () => {
        setNewSavingData({
            id: "",
            name: "",
            currentState: "",
            goal: "",
            leftSum: ""
        });
        setEditMode(false);
        history.push("/app/budget/dataSavings");
    }

    return (
        <Grid container spacing={3} className={classes.gridBox}>
            <Grid item xs={9} sm={10} md={12}>
                <Paper className={classes.paper} elevation={3}>
                    <IconButton style={{width: 48, alignSelf: "self-end"}}>
                            <HighlightOffIcon color="error" onClick={handleCloseForm}/>
                    </IconButton>
                    {editMode ? (
                        <Typography className={classes.headText} variant="h6">Edytuj</Typography>
                    ) : (
                        <Typography className={classes.headText} variant="h6">Nowy wpis</Typography>
                    )}
                    <Divider className={classes.divider} variant="middle"/>
                    <form className={classes.form} onSubmit={handleSubmit(handleSendForm)}>
                        <Controller
                            name="name"
                            control={control}
                            render={() => (
                                <TextField
                                    error={errors?.name ? true : false}
                                    label="Nazwa"
                                    value={newSavingData.name}
                                    size="small"
                                    variant="outlined"
                                    helperText={errors?.name?.message}
                                    className={classes.inputs}
                                    {...register("name")}
                                    onChange={handleValueChange}
                                />
                            )}
                        />
                        <Controller
                            name="currentState"
                            control={control}
                            render={() => (
                                <TextField
                                    error={errors?.currentState ? true : false}
                                    label="Aktualny stan"
                                    value={newSavingData.currentState}
                                    size="small"
                                    variant="outlined"
                                    helperText={errors?.currentState?.message}
                                    className={classes.inputs}
                                    {...register("currentState")}
                                    onChange={handleValueChange}
                                />
                            )}
                        />
                        <Controller
                            name="goal"
                            control={control}
                            render={() => (
                                <TextField
                                    error={errors?.goal ? true : false}
                                    label="Cel"
                                    name="goal"
                                    value={newSavingData.goal}
                                    size="small"
                                    variant="outlined"
                                    helperText={errors?.goal?.message}
                                    className={classes.inputs}
                                    {...register("goal")}
                                    onChange={handleValueChange}
                                />
                            )}
                        />

                        <Controller
                            name="leftSum"
                            control={control}
                            render={() => (
                                <TextField
                                    error={errors?.leftSum ? true : false}
                                    label="Zostało"

                                    value={newSavingData.leftSum}
                                    size="small"
                                    variant="outlined"
                                    helperText={errors?.leftSum?.message}

                                    className={classes.inputs}
                                    {...register("leftSum")}
                                    onChange={handleValueChange}
                                />
                            )}
                        />
                        <Button className={classes.formBtn} type="submit">Zapisz i zamknij</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}