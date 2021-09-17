import React, {useState} from "react";
import {
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    makeStyles,
} from "@material-ui/core";
import {lighten} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        border:`2px solid ${theme.palette.warning.dark}`,
        height: theme.spacing(15),
        margin: theme.spacing(4, 2, 2, 3),
    },
    form: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center"
    },
    input: {
        margin: theme.spacing(2,1),
        width: theme.spacing(19.5),
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
    sortBtn: {
        width: theme.spacing(12),
        margin: theme.spacing(2),
        "&:hover": {
            backgroundColor: theme.palette.warning.dark
        }
    }
}));



export default function SortPulpitBudget () {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const classes = useStyles();

    const months = {
        january: "Styczeń",
        february: "Luty",
        march: "Marzec",
        april: "Kwiecień",
        may: "Maj",
        june: "Czerwiec",
        july: "Lipiec",
        august: "Sierpień",
        september: "Wrzesień",
        october: "Październik",
        november: "Listopad",
        december: "Grudzień"
    };

    return (
        <Paper className={classes.paper}>
            <Typography align="center">Zobacz dane za inny miesiąc</Typography>
            <form className={classes.form}>
                <FormControl fullWidth variant="outlined" className={classes.input}>
                    <InputLabel id="month" color="secondary">Miesiąc</InputLabel>
                    <Select
                        labelId="month"
                        id="month"
                        value={month}
                        label="Miesiąc"
                        classes={{root: classes.selectRoot}}
                        color="secondary"
                        onChange={e => setMonth(e.target.value)}
                        over
                    >
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.january}>{months.january}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.february}>{months.february}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.march}>{months.march}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.april}>{months.april}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.may}>{months.may}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.june}>{months.june}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.july}>{months.july}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.august}>{months.august}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.september}>{months.september}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.october}>{months.october}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.november}>{months.november}</MenuItem>
                            <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={months.december}>{months.december}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth className={classes.input} variant="outlined">
                    <InputLabel id="year" color="secondary">Rok</InputLabel>
                    <Select
                        labelId="year"
                        id="year"
                        value={year}
                        label="Rok"
                        variant="outlined"
                        onChange={e => setYear(e.target.value)}
                        color="secondary"
                        classes={{root: classes.selectRoot}}
                    >
                        <MenuItem value={2018}>2018</MenuItem>
                        <MenuItem value={2019}>2019</MenuItem>
                        <MenuItem value={2020}>2020</MenuItem>
                        <MenuItem value={2021}>2021</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
                        <MenuItem value={2025}>2025</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained"
                        color="secondary"
                        className={classes.sortBtn}
                >Sortuj</Button>
            </form>
        </Paper>
    )
}