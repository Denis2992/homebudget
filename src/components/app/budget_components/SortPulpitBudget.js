import React, {useContext, useState} from "react";
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
import months from "./date_data/monthData";
import years from "./date_data/yearData";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {datesContext} from "./BudgetPulpit";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        border:`2px solid ${theme.palette.warning.dark}`,
        minHeight: theme.spacing(10),
    },
    form: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        margin: theme.spacing(2, 1, 0, 1),
        width: theme.spacing(19.5),
        height: 60
    },
    selectRoot: {
        "&:focus": {
            backgroundColor: lighten(theme.palette.secondary.light, 0.90),
            borderRadius: 25
        },

    },
    rootMenuItem: {
        "&:selected": {
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
        margin: theme.spacing(1, 2, 1.5, 2),
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

const schema = yup.object({
    monthSortValue: yup
        .string()
        .required("Wybierz miesiąc"),
    yearSortValue: yup
        .string()
        .required("Wybierz rok"),
}).required();

export default function SortPulpitBudget () {
    const {setMonth, setYear} =useContext(datesContext);
    const [monthSortValue, setMonthSortValue] = useState("");
    const [yearSortValue, setYearSortValue] = useState("")
    const classes = useStyles();

    const {  control, register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });


    const handleFilterData = () => {
        setMonth(monthSortValue);
        setYear(yearSortValue);
    };

    return (
        <Paper className={classes.paper}>
            <Typography align="center">Zobacz dane za inny miesiąc</Typography>
            <form className={classes.form} onSubmit={handleSubmit(handleFilterData)}>

                <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.input}
                    size="small"
                    error={errors?.monthSortValue ? true : false}
                    color={errors?.monthSortValue ? "error" : "secondary"}
                >
                    <InputLabel id="month" color="secondary">Miesiąc</InputLabel>
                    <Controller
                        name="monthSortValue"
                        control={control}
                        render={() => (
                            <Select
                                labelId="month"
                                label="Miesiąc"
                                classes={{root: classes.selectRoot}}
                                value={monthSortValue}
                                {...register("monthSortValue")}
                                onChange={e => setMonthSortValue(e.target.value)}

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
                        )}
                    />
                    <Typography
                        variant="caption"
                        color="error"
                        style={{height:20, margin: "4px 14px 0 14px"}}
                    >
                        {errors?.monthSortValue?.message}
                    </Typography>
                </FormControl>
                <FormControl
                    fullWidth
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    error={errors?.yearSortValue ? true : false}
                    color={errors?.yearSortValue ? "error" : "secondary"}
                >
                    <InputLabel id="year" color="secondary">Rok</InputLabel>
                    <Controller
                        name="yearSortValue"
                        control={control}
                        render={() => (
                            <Select
                                labelId="year"
                                label="Rok"
                                variant="outlined"
                                color="secondary"
                                value={yearSortValue}
                                classes={{root: classes.selectRoot}}
                                {...register("yearSortValue")}
                                onChange={e => setYearSortValue(e.target.value)}
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
                        )}
                    />
                    <Typography
                        variant="caption"
                        color="error"
                        style={{height:20, margin: "4px 14px 0 14px"}}
                    >
                        {errors?.yearSortValue?.message}</Typography>
                </FormControl>
                <Button variant="contained"
                        color="secondary"
                        className={classes.sortBtn}
                        type="submit"
                >Filtruj</Button>
            </form>
        </Paper>
    )
}