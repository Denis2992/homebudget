import Header from "./landingPage/Header";
import PageCarousel from "./landingPage/PageCarousel";
import AboutSection from "./landingPage/AboutSection";
import TryApplication from "./landingPage/TryApplication";
import Benefits from "./landingPage/Benefits"


const LandingPage = () => {
    return (
        <>
            <Header />
            <PageCarousel />
            <AboutSection />
            <TryApplication />
            <Benefits />
        </>
    )
};

export default LandingPage;