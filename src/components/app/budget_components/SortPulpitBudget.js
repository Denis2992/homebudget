import React, {useState} from "react";
import {
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    makeStyles, List, ListItem,
} from "@material-ui/core";
import {lighten} from "@material-ui/core/styles";
import months from "./date_data/monthData";
import years from "./date_data/yearData";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        border:`2px solid ${theme.palette.warning.dark}`,
        minHeight: theme.spacing(15),
    },
    form: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        margin: theme.spacing(2, 1, 0, 1),
        width: theme.spacing(19.5),
    },
    selectRoot: {
        "&:focus": {
            backgroundColor: lighten(theme.palette.secondary.light, 0.90),
            borderRadius: 25
        },

    },
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
    sortBtn: {
        width: theme.spacing(12),
        margin: theme.spacing(2, 2, 0, 2),
        "&:hover": {
            backgroundColor: theme.palette.warning.dark
        }
    },
    list: {
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
        width: 220
    },
    listElement: {
        color: theme.palette.error.main,
        padding: "3px 0",
    }
}));

export default function SortPulpitBudget () {
    const [errorList, setErrorList] = useState([]);
    const [dateParams, setDateParams] = useState({
        month: "",
        year: "",
    })
    const classes = useStyles();

    const validSelectInputs = () => {
        const newErrorList = [];

        if (dateParams.year === "") {
            newErrorList.push("Wybierz rok");
        }

        if (dateParams.month === "") {
            newErrorList.push("Wybierz miesiąc");
        }

        setErrorList(newErrorList);

        return newErrorList.length === 0;
    };

    const errorsToRender = () => {
        if (errorList.length > 0) {
            return (
                <List className={classes.list}>
                    {errorList.map((el, i) => (
                        <ListItem key={i} className={classes.listElement}>{el}</ListItem>
                    ))}
                </List>
            )
        }
    }

    const handleFilterData = (e) => {
        e.preventDefault();
        if (validSelectInputs()) {
            setDateParams({
                month: "",
                year: "",
            })
        }
    };

    return (
        <Paper className={classes.paper}>
            <Typography align="center">Zobacz dane za inny miesiąc</Typography>
            <form className={classes.form} onSubmit={handleFilterData}>
                <FormControl fullWidth variant="outlined" className={classes.input}>
                    <InputLabel id="month" color="secondary">Miesiąc</InputLabel>
                    <Select
                        labelId="month"
                        id="month"
                        value={dateParams.month}
                        label="Miesiąc"
                        classes={{root: classes.selectRoot}}
                        color="secondary"
                        onChange={e => setDateParams(prevState => ({...prevState, month: e.target.value}))}
                        over
                    >
                        {months.map(month => {
                            return (
                                <MenuItem key={month.name}
                                          classes={{
                                              root: classes.rootMenuItem
                                          }}
                                          value={month.monthNumber}
                                >
                                    {month.name}
                                </MenuItem>
                            )
                        })}


                    </Select>
                </FormControl>
                <FormControl fullWidth className={classes.input} variant="outlined">
                    <InputLabel id="year" color="secondary">Rok</InputLabel>
                    <Select
                        labelId="year"
                        id="year"
                        value={dateParams.year}
                        label="Rok"
                        variant="outlined"
                        onChange={e => setDateParams(prevState => ({...prevState, year: e.target.value}))}
                        color="secondary"
                        classes={{root: classes.selectRoot}}
                    >
                        {years.map(year => {
                            return (
                                <MenuItem key={year.id}
                                          classes={{
                                              selected: classes.selected,
                                              root: classes.rootMenuItem
                                          }}
                                          value={year.yearNumber}
                                >
                                    {year.yearNumber}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <Button variant="contained"
                        color="secondary"
                        className={classes.sortBtn}
                        type="submit"
                >Filtruj</Button>
            </form>
            {errorsToRender()}
        </Paper>
    )
}