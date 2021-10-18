import React, {useContext, useState} from "react";
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
import {usersApiUrl} from "../../../App";
import {CurrentUserContext} from "../../../index";
import {categoriesApiUrl} from "../../../App";
import {newDataItemContext} from "./BudgetTableFull";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useInput from "../../hooks/useInput";

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
        marginLeft: 22,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 0
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
        backgroundColor: theme.palette.success.main,
        height: 2,

    },
    inputs: {
        margin: theme.spacing(2, 0),
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
    // title: yup
    //     .string()
    //     .min(3, "Tytuł ma zawierać minimum 3 znaki")
    //     .matches(/^[A-Za-z]+$/i, "Tytuł nie może mieć liczb")
    //     .required("Pole nie może być puste"),
    // category: yup
    //     .string()
    //     .matches(/^[A-Za-z]+$/i, "Kategoria nie może mieć liczb")
    //     .required("Pole nie może być puste"),
    // newCategory: yup
    //     .string()
    //     .min(3, "Minimalna długość 6 znaków")
    //     .matches(/^[A-Za-z]+$/i, "Pole nie może mieć liczb")
    //     .notOneOf([yup.ref("category")], "Taka kategoria juz istnieje"),
    // date: yup.string().required("Wybierz date urodzenia"),
    // type: yup.string().required(),
    // sum: yup.number().required()
}).required();

export default function BudgetNewItemForm () {
    const classes = useStyles();
    const history = useHistory();
    const {
        newItemData,
        setNewItemData,
        editMode,
        setEditMode,
        setSelected
    } = useContext(newDataItemContext);
    const {currentUser} = useContext(CurrentUserContext);
    const [categoriesList, setCategoriesList] = useState([]);
    const [title, resetTitle] = useInput("");
    const [category, resetCategory] = useInput("");
    const [newCategory, setNewCategory] = useState("");
    const [date, resetDate] = useInput("");
    const [type, resetType] = useInput("");
    const [sum, resetSum] = useInput("");


    const handleValueChange = (event) => {
        const {name, value} = event.target;
        setNewItemData(prevState => ({...prevState, [name]: value}));
    };

    const {  control, register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const handleAddNewItem = () => {
        // const ids = currentUserData.budget.map(el => el.id);
        // const dataToSend = {
        //     budget: [
        //         ...currentUserData.budget,
        //         {
        //             id: currentUserData.budget.length === 0 ? 1 : (Math.max(...ids) + 1),
        //             title: newItemData.title,
        //             category: newItemData.category,
        //             date: newItemData.date,
        //             type: newItemData.type,
        //             summ: newItemData.summ
        //         }
        //     ]
        // };
        console.log("ok");
        console.log(title.value);
        console.log(category.value);
        console.log(newCategory);
        console.log(date.value);
        console.log(type.value);
        console.log(sum.value);
    };

    // const handleSaveEditItem = () => {
    //     const dataToSend = {
    //         budget: [
    //             ...currentUserData.budget.filter(item => item.id !== newItemData.id),
    //             {
    //                 id: newItemData.id,
    //                 title: newItemData.title,
    //                 category: newItemData.category,
    //                 date: newItemData.date,
    //                 type: newItemData.type,
    //                 summ: newItemData.summ
    //             }
    //         ]
    //     };
    //
    //         fetch(`${usersApiUrl}/${currentUserData.id}`, {
    //             method: "PATCH",
    //             body: JSON.stringify(dataToSend),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //             .then((resp) => {
    //                 if (resp.ok) {
    //                     return resp.json();
    //                 } else {
    //                     throw new Error("Błąd")
    //                 }
    //             })
    //             .then(data => {
    //                 setCurrentUserData(data);
    //
    //             })
    //             .catch((err) => console.log("Błąd", err));
    //
    //         setNewItemData({
    //             id: "",
    //             title: "",
    //             category: "",
    //             date: "",
    //             type: "",
    //             summ: "",
    //         });
    //
    //         setEditMode(false);
    //         setSelected([]);
    //         history.push("/app/budget/dataBudget");
    //
    //         fetch(usersApiUrl)
    //             .then((resp) => {
    //                 if (resp.ok) {
    //                     return resp.json();
    //                 } else {
    //                     throw new Error("Błąd sieci!");
    //                 }
    //             })
    //             .then((data) => {
    //                 setUsersData(data);
    //             })
    //             .catch(err => console.log("Błąd!", err));
    //
    // };

    // const handleSendForm = (e) => {
    //     e.preventDefault();
    //     if (editMode) {
    //         return handleSaveEditItem();
    //     } else {
    //         return handleAddNewItem();
    //     }
    // };

    // const handleAddNewCategory = () => {
    //
    //         const ids = categoriesList.map(el => el.id);
    //
    //         fetch(categoriesApiUrl, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 id: ids?.length && (Math.max(...ids) + 1),
    //                 categoryName: newCategory
    //
    //             }),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     return response.json();
    //                 } else {
    //                     throw new Error("Błąd")
    //                 }
    //             })
    //             .then((data) => {
    //                 setNewItemData(prevState => ({...prevState, category: data.categoryName}));
    //                 setCategoriesList( prevState => [...prevState, data]);
    //             })
    //             .catch((err) => console.log("Błąd", err));
    //
    //         setNewCategory("");
    //
    // };

    const handleCloseForm = () => {
        setNewItemData({
            id: "",
            title: "",
            category: "",
            date: "",
            type: "",
            summ: ""
        });
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
            <form className={classes.form} onSubmit={handleSubmit(handleAddNewItem)}>
                <TextField
                    name="title"
                    label="Tytuł"
                    size="small"
                    variant="outlined"
                    className={classes.inputs}
                    color="secondary"
                    {...title}
                />
                <FormControl variant="outlined" size="small" className={classes.inputs}>
                    <InputLabel id="category" color="secondary">Kategoria</InputLabel>
                    <Select
                        name="category"
                        id="category"
                        label="Kategoria"
                        color="secondary"
                        classes={{root: classes.selectRoot}}
                        value={newItemData.category}
                        {...category}
                        >
                        <MenuItem value="" disabled>Wybierz</MenuItem>
                   n     {categoriesList.map(category => (
                            <MenuItem
                                key={category.id}
                                value={category.categoryName}
                                classes={{ selected: classes.selected, root: classes.rootMenuItem}}
                            >
                                {category.categoryName}
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
                </FormControl>

                {newItemData.category === "addNew" ? (
                    <>
                        <TextField
                            label="Nowa kategoria"
                            variant="outlined"
                            size="small"
                            className={classes.inputs}
                            style={{marginBottom: 8}}
                            color="secondary"
                            onChange={e => setNewCategory(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                        >
                            Dodaj
                        </Button>
                    </>
                ) : null
                }
                <TextField
                    name="date"
                    label="Data"
                    type="date"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    value={newItemData.date}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.inputs}
                    onChange={handleValueChange}
                />
                <FormControl component="fieldset">
                    <FormLabel
                        component="legend"
                        color="secondary"
                        style={{textAlign: "center"}}
                    >
                        Rodzaj
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-label="type"
                        name="type"
                        value={newItemData.type}
                        onChange={handleValueChange}
                        style={{justifyContent: "center"}}>
                        <FormControlLabel value="income" control={<Radio />} label="Przychód" />
                        <FormControlLabel value="expenses" control={<Radio />} label="Wydatek" />
                        <FormControlLabel value="saving" control={<Radio />} label="Oszczędzanie" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    label="Suma"
                    name="summ"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    value={newItemData.summ}
                    className={classes.inputs}
                    style={{marginBottom: 8}}
                    onChange={handleValueChange}
                />
                <Button className={classes.formBtn} type="submit">Zapisz i zamknij</Button>
            </form>
        </Paper>
        </Grid>
        </Grid>
    )
}