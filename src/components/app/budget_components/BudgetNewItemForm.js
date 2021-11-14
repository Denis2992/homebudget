import React, {useContext, useEffect, useState} from "react";
import {
    Divider,
    FormControl,
    Paper,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    Button,
    makeStyles,
    IconButton,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    Grid
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {lighten} from "@material-ui/core/styles";
import {currentUserContext} from "../../../index";
import {newDataItemContext} from "./BudgetTableFull";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useInput from "../../hooks/useInput";
import getFirebase from "../../firebase/firebase";


const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        maxWidth: 380,
        maxHeight: 850,
        border: `2px solid ${theme.palette.success.main}`,
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
        backgroundColor: theme.palette.success.main,
        height: 2,
    },
    inputs: {
        height: 60,
        marginTop: theme.spacing(2),
        width: theme.spacing(35),

    },
    formBtn: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(2, 0),
        "&:hover" : {
            backgroundColor: theme.palette.success.main,
        }
    },
    selectRoot: {
        "&:focus": {
            backgroundColor: lighten(theme.palette.secondary.light, 0.90),
            borderRadius: 25
        },

    },
    selected: {},
    rootMenuItem: {
        "&$selected": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.secondary.main,
            }
        },
        "&:hover": {
            backgroundColor: lighten(theme.palette.secondary.light, 0.5),
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
        .required("Pole nie może być puste"),
    category: yup
        .string()
        .required("Wybierz lub dodaj kategorię"),
    date: yup
        .string().required("Wybierz date urodzenia"),
    sum: yup.number()
        .typeError("Wpisz sumę")
        .positive("Suma ma byc liczba dodatnią")
        .required()
}).required();

export default function BudgetNewItemForm () {
    const classes = useStyles();
    const history = useHistory();
    const {
        id, setId,
        title, setTitle,
        category, setCategory,
        date, setDate,
        type, setType,
        sum, setSum,
        editMode,
        setEditMode,
        budget, setBudget,
        setSelected
    } = useContext(newDataItemContext);
    const {currentUser} = useContext(currentUserContext);
    const [categoriesList, setCategoriesList] = useState([]);
    const [newCategory, resetNewCategory] = useInput("");
    const [newCategoryErrors, setNewCategoryErrors] = useState([]);
    const [newCategoryErrActive, setNewCategoryErrActive] =useState(false);
    const firebase = getFirebase();

    useEffect(() => {
        const fetch = async () => {
            try {
                if (!firebase) return;
                const db = firebase.firestore();
                const ref = db.collection(`${currentUser}`);
                await ref.get()
                    .then(querySnapshot => {
                        return querySnapshot.docs[0].ref.collection("category").get();
                    })
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            setCategoriesList(prevState => [...prevState, doc.data()])
                        });

                    })
            } catch (error) {
                console.log("error", error);
            }
        };
        fetch();
    }, [currentUser, firebase]);

    const {  control, register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });



    const newCategoryValid = () => {
        const tab = [];
        if (/\d/.test(newCategory.value)) {
            tab.push("Pole nie może zawierać liczb");
        }
        if (newCategory.value === "") {
            tab.push("Pole nie może byc puste");
        }
        if (newCategory.value.length < 3) {
            tab.push("Minimalna długość - 3 litery")
        }
        if (categoriesList?.filter(el => el.name === newCategory.value).length > 0) {
            tab.push("Taka kategoria juz istnieje")
        }
        setNewCategoryErrors(tab);
        return tab.length === 0;
    }

    const handleAddNewCategory = () => {
        newCategoryValid();

        if (newCategoryValid()) {
            setNewCategoryErrActive(false);
            const ids = categoriesList.map(el => el.id);
            const dataToSend = {
                id: (Math.max(...ids) + 1),
                name: newCategory.value
            };

            if (firebase) {
                try {
                    const db = firebase.firestore();
                    const categoriesRef = db.collection(`${currentUser}`)
                        .doc("userData")
                        .collection('category');

                    categoriesRef.doc().set(dataToSend)
                        .then(function () {
                            console.log('Document Added');
                        })
                        .catch(function (error) {
                            console.error('Error adding document: ', error);
                        });
                } catch (error) {
                    console.log("error", error);
                }
            }

            setCategoriesList(prevState => [...prevState, dataToSend])
            setCategory(newCategory.value);
            resetNewCategory();
        } else {
            setNewCategoryErrActive(true);
        }
    };

    const handleAddNewItem = async () => {
        const ids = budget?.map(el => el.id);

        const dataToSend = {
                    id: budget.length === 0 ? 1 : (Math.max(...ids) + 1),
                    title: title,
                    category: category,
                    date: date,
                    type: type,
                    sum: sum
        };
        if (category !== "addNew") {
            if (firebase) {
                try {
                    const db = firebase.firestore()
                    const budgetRef = db.collection(`${currentUser}`)
                        .doc("userData")
                        .collection("budget");

                    budgetRef.doc().set(dataToSend)
                        .then(function () {
                            console.log('Document Added');
                            setBudget(prevState => [...prevState, dataToSend]);
                        })
                        .catch(function (error) {
                            console.error('Error adding document: ', error);
                        });
                } catch (error) {
                    console.log("error", error);
                }
            }


            setTitle("");
            setCategory("");
            setDate("");
            setType("expenses");
            setSum("");
            history.push("/app/budget/dataBudget");
        } else {
            setNewCategoryErrActive(true);
            setNewCategoryErrors(prevState => [...prevState, "Dodaj lub wybierz kategorie"])
        }
    };

    const handleSaveEditItem = () => {

        const dataToSend = {
            id: id,
            title: title,
            category: category,
            date: date,
            type: type,
            sum: sum
        };

        const db = firebase.firestore();
        const budgetRef = db.collection(`${currentUser}`)
            .doc("userData").collection("budget");

        budgetRef.where("id", "==", id)
            .get()
            .then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    doc.ref.update(dataToSend).then(() => {
                        console.log("Document successfully edited!");
                        setBudget([...budget?.filter(item => item.id !== id), dataToSend]);
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
        setId("");
        setTitle("");
        setCategory("");
        setDate("");
        setType("expenses");
        setSum("");
        history.push("/app/budget/dataBudget");
    };

    const handleSendForm = () => {
        if (editMode) {
            return handleSaveEditItem();
        } else {
            return handleAddNewItem();
        }
    };



    const handleCloseForm = () => {
        setId("");
        setTitle("");
        setCategory("");
        setDate("");
        setType("expenses");
        setSum("");
        setEditMode(false);
        history.push("/app/budget/dataBudget");
    }



    return (
        <Grid container spacing={3} className={classes.gridBox}>
        <Grid item xs={7}>
        <Paper className={classes.paper} elevation={3}>
            <IconButton style={{ alignSelf: "self-end"}} onClick={handleCloseForm}>
                    <HighlightOffIcon color="error" />
            </IconButton>
            {editMode ? (
                <Typography className={classes.headText} variant="h6">Edytuj</Typography>
            ) :(
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
                            color={errors?.title ? "error" : "secondary"}
                            label="Tytuł"
                            size="small"
                            variant="outlined"
                            className={classes.inputs}
                            helperText={errors?.title?.message}
                            {...register("title")}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    )}
                />
                    <Controller
                        name="category"
                        control={control}
                        value={category}
                        render={() => (
                            <FormControl
                                variant="outlined"
                                size="small"
                                error={errors?.category ? true : false}
                                color={errors?.category ? "error" : "secondary"}
                                className={classes.inputs}
                            >
                                <InputLabel id="category" color="secondary">Kategoria</InputLabel>
                            <Select
                                label="Kategoria"
                                classes={{root: classes.selectRoot}}
                                {...register("category")}
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >
                                {categoriesList.map(category => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.name}
                                        classes={{ selected: classes.selected, root: classes.rootMenuItem}}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                                <MenuItem
                                    classes={{
                                        selected: classes.selected,
                                        root: classes.rootMenuItem
                                    }}
                                    value="addNew"
                                >
                                    Dodaj kategorię
                                </MenuItem>
                            </Select>
                                <Typography
                                    variant="caption"
                                    color="error"
                                    style={{height:20, margin: "4px 14px 0 14px"}}
                                >
                                    {errors?.category?.message}
                                </Typography>
                            </FormControl>
                        )}
                    />
                {category === "addNew" ? (
                    <>
                        <Controller
                            name="newCategory"
                            control={control}
                            render={() => (
                                <TextField
                                    error={newCategoryErrActive ? true : false}
                                    color={newCategoryErrActive ? "error" : "secondary"}
                                    label="Nowa kategoria"
                                    variant="outlined"
                                    size="small"
                                    helperText={newCategoryErrors[0]}
                                    className={classes.inputs}
                                    {...newCategory}
                                />
                            )}
                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleAddNewCategory}
                            className={classes.formBtn}
                            style={{margin: "5px 0 0 0"}}
                        >
                            Dodaj
                        </Button>
                    </>
                ) : null}
                <Controller
                    name="date"
                    control={control}
                    render={() => (
                        <TextField
                            error={errors?.date ? true : false}
                            color={errors?.date ? "error" : "secondary"}
                            name="date"
                            label="Data"
                            type="date"
                            size="small"
                            variant="outlined"
                            helperText={errors?.date?.message}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.inputs}
                            {...register("date")}
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    )}
                />
                <FormControl component="fieldset" style={{marginTop: 5}}>
                    <FormLabel
                        component="legend"
                        color="secondary"
                        style={{textAlign: "center"}}
                    >
                        Typ
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-label="type"

                        {...register("type")}
                        value={type}
                        onChange={e => setType(e.target.value)}
                        style={{justifyContent: "center"}}>
                        <FormControlLabel value="income" control={<Radio />} label="Przychód" />
                        <FormControlLabel value="expenses" control={<Radio />} label="Wydatek" />
                        <FormControlLabel value="saving" control={<Radio />} label="Oszczędzanie" />
                    </RadioGroup>
                </FormControl>
                <Controller
                    name="sum"
                    control={control}
                    render={() => (
                        <TextField
                            error={errors?.sum ? true : false}
                            color={errors?.sum ? "error" : "secondary"}
                            label="Suma"
                            size="small"
                            variant="outlined"
                            helperText={errors?.sum?.message}
                            className={classes.inputs}
                            style={{marginBottom: 8}}
                            {...register("sum")}
                            value={sum}
                            onChange={e => setSum(e.target.value)}
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