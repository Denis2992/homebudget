import React from "react";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";
import {theme} from "../../index";
import coins from "../images/aboutSection/coins.jpg"
import diagram from "../images/aboutSection/diagram.png"
import {Paper} from "@material-ui/core";


const useStyles = makeStyles((theme) =>({
    dataContainer: {
        margin: "0 auto",
        maxWidth: theme.spacing(187.5),
        width: "100%",
        padding: theme.spacing(2, 0)
    },
    dataPaper: {
        border: `2px solid ${theme.palette.secondary.main}`,
        margin: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    textBox: {
        padding: theme.spacing(2, 4),
        maxWidth: 650
    },
    textBoxHead: {
        fontWeight: 600
    },
    textBoxParagraph: {
        paddingTop: theme.spacing(3)
    },
    coinsImg: {
        height: 260,
        width: 315,
        padding: theme.spacing(2)
    },
    diagramImg: {
        width: 480,
        height: 295,
        padding: theme.spacing(2)
    }
}));

const WhyShouldCount = () => {
    const classes = useStyles();
    return (
        <Container className={classes.dataContainer}>
            <Paper component="div" elevation={3} className={classes.dataPaper}>
                <Box className={classes.textBox}>
                    <Typography variant="h5" className={classes.textBoxHead}>Dlaczego warto wiedzieć na co wydajesz swoja pensje?</Typography>
                    <Typography className={classes.textBoxParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse cillum dolore
                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                </Box>
                <img src={coins} className={classes.coinsImg} alt="coins"/>
            </Paper>
        </Container>
    );
};


const AboutApplication = () => {
    const classes = useStyles();
    return (
        <Container className={classes.dataContainer}>
            <Paper component="div" elevation={3} className={classes.dataPaper} style={{border: `2px solid ${theme.palette.primary.main}`}}>
                <img src={diagram} className={classes.diagramImg} alt="diagram"/>
                <Box className={classes.textBox}>
                    <Typography variant="h5" className={classes.textBoxHead}>Do czego służy aplikacja?</Typography>
                    <Typography className={classes.textBoxParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse cillum dolore
                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                </Box>
            </Paper>
        </Container>
    );
};



const AboutSection = () => {
    return (
        <>
            <WhyShouldCount />
            <AboutApplication />
        </>
    )
};

export default AboutSection;