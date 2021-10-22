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
import {newCreditDataContext} from "./CreditTableFull";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {currentUserContext} from "../../../index";
import getFirebase from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        maxWidth: 380,
        maxHeight: 720,
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
        backgroundColor: theme.palette.warning.light,
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

const schema = yup.object({
    title: yup
        .string()
        .min(3, "Tytuł ma zawierać minimum 3 znaki")
        .matches(/^[A-Za-z]+$/i, "Tytuł nie może mieć liczb")
        .required("Pole nie może być puste"),
    creditSum: yup
        .number()
        .typeError("Wpisz sumę")
        .required("Pole nie może być puste"),
    paidSum: yup
        .number()
        .typeError("Wpisz sumę")
        .required("Pole nie może być puste"),
    leftSum: yup
        .number()
        .typeError("Wpisz sumę")
        .required("Pole nie może być puste"),
    monthlyPayment: yup
        .number()
        .typeError("Wpisz sumę")
        .required("Pole nie może być puste"),
    leftPayments: yup
        .number()
        .typeError("Wpisz sumę")
        .integer("Liczba ma byc liczba całą")
        .required("Pole nie może być puste")
}).required();

export default function CreditNewItemForm () {
    const {currentUser} = useContext(currentUserContext);
    const {
        credits, setCredits,
        newCreditData,
        setNewCreditData,
        setSelected,
        editMode,
        setEditMode
    } = useContext(newCreditDataContext);
    const history = useHistory();
    const firebase = getFirebase();

    const {  control, register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const handleValueChange = (event) => {
        const {name, value} = event.target;
        setNewCreditData(prevState => ({...prevState, [name]: value}));
    };


    const handleAddNewItem = () => {
        const ids = credits?.map(el => el.id);

        const dataToSend = {
            id: credits?.length === 0 ? 1 : (Math.max(...ids) + 1),
            title: newCreditData.title,
            creditSum: newCreditData.creditSum,
            paidSum: newCreditData.paidSum,
            leftSum: newCreditData.leftSum,
            monthlyPayment: newCreditData.monthlyPayment,
            leftPayments: newCreditData.leftPayments
        };

        if (firebase) {
            try {
                const db = firebase.firestore()
                const creditsRef = db.collection(`${currentUser}`)
                    .doc("userData")
                    .collection("credits");

                creditsRef.doc().set(dataToSend)
                    .then(function () {
                        console.log('Document Added');
                        setCredits(prevState => [...prevState, dataToSend]);
                    })
                    .catch(function (error) {
                        console.error('Error adding document: ', error);
                    });
            } catch (error) {
                console.log("error", error);
            }
        }

        setNewCreditData({
            title: "",
            creditSum: "",
            paidSum: "",
            leftSum: "",
            monthlyPayment: "",
            leftPayments: ""
        });
        history.push("/app/budget/dataCredit");
    };

    const handleSaveEditItem = () => {
        const dataToSend = {
            id: newCreditData.id,
            title: newCreditData.title,
            creditSum: newCreditData.creditSum,
            paidSum: newCreditData.paidSum,
            leftSum: newCreditData.leftSum,
            monthlyPayment: newCreditData.monthlyPayment,
            leftPayments: newCreditData.leftPayments
        };

        const db = firebase.firestore();
        const budgetRef = db.collection(`${currentUser}`)
            .doc("userData").collection("credits");

        budgetRef.where("id", "==", newCreditData.id)
            .get()
            .then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    doc.ref.update(dataToSend).then(() => {
                        console.log("Document successfully edited!");
                        setCredits([...credits?.filter(item => item.id !== newCreditData.id), dataToSend]);
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
        setNewCreditData({
            id: "",
            title: "",
            creditSum: "",
            paidSum: "",
            leftSum: "",
            monthlyPayment: "",
            leftPayments: ""
        });
        history.push("/app/budget/dataCredit")
    };

    const handleSendForm = () => {
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
        <Grid container spacing={3} className={classes.gridBox}>
            <Grid item xs={5}>
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
                <form className={classes.form} onSubmit={handleSubmit(handleSendForm)}>
                    <Controller
                        name="title"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.title ? true : false}
                                label="Nazwa"
                                value={newCreditData.title}
                                helperText={errors?.title?.message}
                                size="small"
                                variant="outlined"
                                className={classes.inputs}
                                {...register("title")}
                                onChange={handleValueChange}
                            />
                        )}
                    />
                    <Controller
                        name="creditSum"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.title ? true : false}
                                label="Całkowita suma"
                                value={newCreditData.creditSum}
                                helperText={errors?.creditSum?.message}
                                size="small"
                                variant="outlined"
                                className={classes.inputs}
                                {...register("creditSum")}
                                onChange={handleValueChange}
                            />
                        )}
                    />
                    <Controller
                        name="paidSum"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.paidSum ? true : false}

                                label="Spłacono"
                                value={newCreditData.paidSum}
                                helperText={errors?.paidSum?.message}
                                size="small"
                                variant="outlined"
                                className={classes.inputs}
                                {...register("paidSum")}
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
                                label="Zostało do spłaty"
                                value={newCreditData.leftSum}
                                helperText={errors?.leftSum?.message}
                                size="small"
                                variant="outlined"
                                className={classes.inputs}
                                {...register("leftSum")}
                                onChange={handleValueChange}
                            />
                        )}
                    />

                    <Controller
                        name="monthlyPayment"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.monthlyPayment ? true : false}
                                label="Miesięczna rata"
                                value={newCreditData.monthlyPayment}
                                helperText={errors?.monthlyPayment?.message}
                                size="small"
                                variant="outlined"
                                className={classes.inputs}
                                {...register("monthlyPayment")}
                                onChange={handleValueChange}
                            />
                        )}
                    />
                    <Controller
                        name="leftPayments"
                        control={control}
                        render={() => (
                            <TextField
                                error={errors?.leftPayments ? true : false}
                                label="Zostało rat"
                                value={newCreditData.leftPayments}
                                helperText={errors?.leftPayments?.message}
                                size="small"
                                variant="outlined"
                                className={classes.inputs}
                                {...register("leftPayments")}
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