import React, {useContext} from "react";
import {Button, Paper, Typography, makeStyles, Box} from "@material-ui/core";
import {DoubleArrow} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {usersDataContext} from "../../../App";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1, 2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.info.light}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    paddingStyle: {
        padding:theme.spacing(1)
    },
    styleBtn: {
        padding: "6px 30px",
        marginBottom: theme.spacing(2),
        "&:hover": {
            backgroundColor: theme.palette.info.main
        }
    },
    link: {
        color: theme.palette.primary.contrastText,
        textDecoration: "none"
    },
    icon: {
        display: "none",
        [theme.breakpoints.up('sm')]: {
            display: "flex"
        },
    }
}))

export default function Savings () {
    const classes = useStyles();
    const {currentUserData} = useContext(usersDataContext);

    const total = currentUserData?.savings?.map(item => item.currentState)
        .reduce((sum, num) => {
            return +sum + +num;
        }, 0);



    return (
        <Paper className={classes.paper} elevation={3}>
            <Typography
                color="textPrimary"
                className={classes.paddingStyle}
            >
                Twoje oszczędności: <br/>{total}
            </Typography>
            <DoubleArrow fontSize="large" color="secondary" className={classes.icon}/>
            <Box >
                <Typography className={classes.paddingStyle}>Zobacz pewną informacje</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.styleBtn}
                >
                    <Link to="/app/budget/dataSavings/" className={classes.link}>Przejdź</Link>
                </Button>
            </Box>

        </Paper>
    );
}