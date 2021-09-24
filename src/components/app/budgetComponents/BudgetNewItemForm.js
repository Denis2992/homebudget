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
    List,
    ListItem,
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {lighten} from "@material-ui/core/styles";
import {usersApiUrl, usersDataContext} from "../../../App";
import validator from "validator/es";
import {categoriesApiUrl} from "../../../App";
import isDecimal from "validator/es/lib/isDecimal";
import {newDataItemContext} from "./BudgetTableFull";


const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        maxWidth: 380,
        maxHeight: 850,
        border: `2px solid ${theme.palette.success.main}`,
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(0, 4),
        position: "absolute",
        left: "15vw",
        top: "12vh"
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

export default function BudgetNewItemForm () {
    const {
        newItemData,
        setNewItemData,
        editMode,
        setEditMode,
        setSelected
    } = useContext(newDataItemContext);
    const [newCategory, setNewCategory] = useState("");
    const [newCategoryErrors, setNewCategoryErrors] =useState([]);
    const [errorList, setErrorList] = useState([]);
    const {
        currentUserData,
        setCurrentUserData,
        categoriesList,
        setCategoriesList,
        setUsersData
    } = useContext(usersDataContext);

    const history = useHistory();

    const handleValueChange = (event) => {
        const {name, value} = event.target;
        setNewItemData(prevState => ({...prevState, [name]: value}));
    };

    // inputs validation
    const checkIfFormValid = () => {
        const newErrorList = [];
        const {title, category, date, summ} = newItemData;

        if (title.length < 3) {
            newErrorList.push("Tytuł musi zawierać minimum 3 litery");
        }

        if (!editMode) {
            if (currentUserData.budget.some(el => el.title === title)) {
                newErrorList.push("Taki tytuł juz istnieje")
            }
        }

        if (category === "") {
            newErrorList.push("Kategoria ma byc wybrana");
        }

        if (date === "") {
            newErrorList.push("Data ma byc wybrana");
        }

        if (!isDecimal(summ)) {
            newErrorList.push("Suma ma byc liczbą i może byc liczba dziesiętną");
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
        const ids = currentUserData.budget.map(el => el.id);

        const dataToSend = {
            budget: [
                ...currentUserData.budget,
                {
                    id: currentUserData.budget.length === 0 ? 1 : (Math.max(...ids) + 1),
                    title: newItemData.title,
                    category: newItemData.category,
                    summ: newItemData.summ,
                    date: newItemData.date
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

            setNewItemData({
                id: "",
                title: "",
                category: "",
                date: "",
                summ: "",
            });

            history.push("/app/budget/dataBudget");

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
            budget: [
                ...currentUserData.budget.filter(item => item.id !== newItemData.id),
                {
                    id: newItemData.id,
                    title: newItemData.title,
                    category: newItemData.category,
                    summ: newItemData.summ,
                    date: newItemData.date
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

            setNewItemData({
                id: "",
                title: "",
                category: "",
                date: "",
                summ: "",
            });

            setEditMode(false);
            setSelected([]);
            history.push("/app/budget/dataBudget");

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

    //new category input
    const checkNewCategoryInput = () => {
        const errors = [];
        if (!validator.isAlpha(newCategory, "pl-PL")) {
            errors.push("Pole nie może mieć liczb i znaków");
        }

        if (newCategory === "") {
            errors.push("Pole nie może byc puste");
        }

        if (categoriesList.some(category => category.categoryName === newCategory)) {
            errors.push("Taka kategoria juz istnieje");
        }

        if (newCategory.length < 3) {
            errors.push("pole musi zawierać minimum 3 litery")
        }

        setNewCategoryErrors(errors);

        return errors.length === 0;

    };

    const newCategoryErrorsToRender = () => {

        if (newCategoryErrors.length > 0) {
            return (
                <>
                    <List className={classes.list}>
                        {newCategoryErrors.map((error, index) => (
                            <ListItem key={index} className={classes.listElement}>{error}</ListItem>
                        ))}
                    </List>
                </>
            )
        } else {
            return null;
        }
    }

    const handleAddNewCategory = () => {

        if(checkNewCategoryInput()) {
            const ids = categoriesList.map(el => el.id);

            fetch(categoriesApiUrl, {
                method: "POST",
                body: JSON.stringify({
                    id: ids?.length && (Math.max(...ids) + 1),
                    categoryName: newCategory

                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Błąd")
                    }
                })
                .then((data) => {
                    setNewItemData(prevState => ({...prevState, category: data.categoryName}));
                    setCategoriesList( prevState => [...prevState, data]);
                })
                .catch((err) => console.log("Błąd", err));

            setNewCategory("");
        }
    };

    const handleCloseForm = () => {
        setNewItemData({
            id: "",
            title: "",
            category: "",
            date: "",
            summ: "",
        });
        setEditMode(false);
        history.push("/app/budget/dataBudget");
    }

    const classes = useStyles();

    return (
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
            <form className={classes.form} onSubmit={handleSendForm}>
                <FormControl>
                    <TextField
                        name="title"
                        label="Tytuł"
                        variant="outlined"
                        className={classes.inputs}
                        color="secondary"
                        defaultValue={newItemData.title}
                        onChange={handleValueChange}

                    />
                </FormControl>
                <FormControl variant="outlined" className={classes.inputs}>
                    <InputLabel id="category" color="secondary">Kategoria</InputLabel>
                    <Select
                        name="category"
                        id="category"
                        label="Kategoria"
                        color="secondary"
                        classes={{root: classes.selectRoot}}
                        value={newItemData.category}
                        onChange={handleValueChange}
                        >
                        <MenuItem value="" disabled>Wybierz</MenuItem>
                        {categoriesList.map(category => (
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
                            className={classes.inputs}
                            style={{marginBottom: 8}}
                            color="secondary"
                            onChange={e => setNewCategory(e.target.value)}
                        />
                        {newCategoryErrorsToRender()}
                        <Button
                            onClick={handleAddNewCategory}
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
                    variant="outlined"
                    color="secondary"
                    value={newItemData.date}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.inputs}
                    onChange={handleValueChange}
                />
                <TextField
                    label="Suma"
                    name="summ"
                    variant="outlined"
                    color="secondary"
                    value={newItemData.summ}
                    className={classes.inputs}
                    style={{marginBottom: 8}}
                    onChange={handleValueChange}
                />
                {getErrorsToRender()}
                <Button className={classes.formBtn} type="submit">Zapisz i zamknij</Button>
            </form>
        </Paper>
    )
}