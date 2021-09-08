import Header from "./landingPage/Header";
import PageCarousel from "./landingPage/PageCarousel";
import AboutSection from "./landingPage/AboutSection";
import TryApplication from "./landingPage/TryApplication";
import Benefits from "./landingPage/Benefits"
import ContactUs from "./landingPage/ContactUs";
import Footer from "./landingPage/Footer";


const LandingPage = () => {
    return (
        <>
            <Header />
            <PageCarousel />
            <AboutSection />
            <TryApplication />
            <Benefits />
            <ContactUs />
            <Footer />
        </>
    )
};

export default LandingPage;