import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const MainLayout = () => {
    return (
        <div>
            <header>
                <Navbar/>
            </header>
            <section>
                <Outlet/>
            </section>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default MainLayout;