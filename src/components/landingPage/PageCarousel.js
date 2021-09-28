import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, makeStyles, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import money from "../images/carousel/money.jpg";
import incomeTax from "../images/carousel/incomeTax.jpg";
import savings from "../images/carousel/savings.jpg";
import {theme} from "../../index";


const useStyles = makeStyles((theme) =>({
    carousel: {
        maxWidth: theme.spacing(187.5),
        width: "100%",
        margin: "0 auto",

    },
    carouselElement: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    head: {
      textAlign: "center"
    },
    carouselParagraph: {
        padding: theme.spacing(2)
    },
    carouselLink: {
        textDecoration: "none",
        color: theme.palette.primary.contrastText
    }
}));


function PageCarousel() {
    const items = [
        {
            name: `Zastanawiasz się w jaki sposób można kontrolować wydatki?`,
            description: "Lorem ipsum dolor sit amet",
            backgroundStyle: {
                backgroundImage: `url(${money})`,
                height: 500,
                backgroundSize: "1500px 700px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                color: theme.palette.primary.contrastText
            }
        },
        {
            name: "Chcesz dokładnie wiedzieć gdzie wydałeś pieniądze?",
            description: "Lorem ipsum dolor sit amet",
            backgroundStyle: {
                backgroundImage: `url(${incomeTax})`,
                height: 500,
                backgroundSize: "1500px 700px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                color: theme.palette.primary.contrastText
            }
        },
        {
            name: "Chcesz zaoszczędzić więcej niz teraz?",
            description: "Lorem ipsum dolor sit amet",
            backgroundStyle: {
                backgroundImage: `url(${savings})`,
                height: 500,
                backgroundSize: "1500px 700px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom",
                color: theme.palette.primary.contrastText
            }
        },
    ]

    const classes = useStyles();

    return (
        <Carousel className={classes.carousel}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props) {
    const classes = useStyles();
    return (
        <Paper style={props.item.backgroundStyle} className={classes.carouselElement}>
            <Typography variant="h4" className={classes.head}>{props.item.name}</Typography>
            <Typography variant="subtitle1" className={classes.carouselParagraph}>{props.item.description}</Typography>
            <Button variant="contained" color="primary">
                <a href="https://www.google.pl/" target="blank" className={classes.carouselLink}>Dowiedz się więcej</a>
            </Button>

        </Paper>
    )
}

export default PageCarousel;

