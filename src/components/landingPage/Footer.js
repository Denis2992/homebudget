import React from "react";
import {Box, Container, rgbToHex, Typography} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footerContainer: {
        maxWidth: theme.spacing(187.5),
        width: "100%",
        height: 60,
        backgroundColor: theme.palette.primary.main,
        marginTop: theme.spacing(5),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: theme.palette.primary.contrastText
    },
    logoBox: {
        display: "flex",
    },
    logoBoxText: {
        fontFamily: "'Courgette', cursive",
        fontSize: 18
    },
    instaIcon: {
        padding: theme.spacing(0,3)
    }
}))

const Footer = () => {
    const classes = useStyles();

    return (
        <Container className={classes.footerContainer}>
            <Box>
                <Box className={classes.logoBox}>
                    <HomeIcon />
                    <Typography className={classes.logoBoxText}> BudgetDomowy</Typography>
                </Box>
                <Typography variant="body2">© 2021 BudgetDomowy LTD, All Rights Reserved</Typography>
            </Box>
            <Box>
                <FacebookIcon />
                <InstagramIcon className={classes.instaIcon}/>
                <TwitterIcon />
            </Box>
        </Container>
    )
};

export default Footer;