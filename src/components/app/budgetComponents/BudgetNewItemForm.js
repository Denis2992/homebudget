import React from "react";
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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {lighten} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        maxWidth: 380,
        maxHeight: 550,
        border: `2px solid ${theme.palette.success.main}`,
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(0, 4)
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
}));

export default function BudgetNewItemForm () {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <IconButton style={{ alignSelf: "self-end"}}>
                <Link to="/app/budget/dataBudget" style={{height: 24}}>
                    <HighlightOffIcon color="error" />
                </Link>
            </IconButton>
            <Typography className={classes.headText} variant="h6">Nowy wpis</Typography>
            <Divider className={classes.divider} variant="middle"/>
            <form className={classes.form}>
                <TextField
                    label="Nazwa"
                    variant="outlined"
                    className={classes.inputs}
                    color="secondary"
                />
                <FormControl variant="outlined" className={classes.inputs}>
                    <InputLabel id="category" color="secondary">Kategoria</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        label="Kategoria"
                        color="secondary"
                        classes={{root: classes.selectRoot}}
                        >
                        <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={10}>Pensja</MenuItem>
                        <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={20}>Jedzenie</MenuItem>
                        <MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem}} value={30}>Auto</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="date"
                    label="Data"
                    type="date"
                    defaultValue="2021-01-01"
                    variant="outlined"
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.inputs}
                />
                <TextField
                    label="Suma"
                    type="number"
                    variant="outlined"
                    color="secondary"
                    className={classes.inputs}
                />
                <Button className={classes.formBtn}>Zapisz i zamknij</Button>
            </form>
        </Paper>
    )
}