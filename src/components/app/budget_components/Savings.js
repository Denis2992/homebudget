import React, {useContext, useEffect, useState} from "react";
import {Button, Paper, Typography, makeStyles, Box} from "@material-ui/core";
import {DoubleArrow} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {currentUserContext} from "../../../index";
import getFirebase from "../../firebase/firebase";

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
    const [savings, setSavings] = useState([]);
    const {currentUser} = useContext(currentUserContext);
    const firebase = getFirebase();

    useEffect(() => {
        const fetch = async () => {
            try {
                if (!firebase) return;
                const db = firebase.firestore();
                const ref = db.collection(`${currentUser}`);
                await ref.get()
                    .then(querySnapshot => {
                        return querySnapshot.docs[0].ref.collection("savings").get();
                    })
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            setSavings(prevState => [...prevState, doc.data()])
                        })
                    })
            } catch (error) {
                console.log("error", error);
            }
        };

        fetch();
    }, [currentUser, firebase]);

    const total = savings?.map(item => item.currentState)
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