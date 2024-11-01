import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import SettingSideBar from "../../components/SettingSideBar/SettingSideBar.jsx";

const SettingPage = () => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <header>
                <Header />
            </header>
            <div className="flex h-[calc(100%-60px)] w-screen scrollbar-hide">
                <div className="w-[80px] z-50 scrollbar-hide h-full overflow-y-auto">
                    <SettingSideBar />
                </div>
            </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default SettingPage;
