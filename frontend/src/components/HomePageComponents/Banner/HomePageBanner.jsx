import hpBanner from "../../../assets/homepage-banner.png"
function HomePageBanner() {
    return (
        <header className="banner">
            <div className="profile-image">
                <img src={hpBanner} alt="Profile" />
            </div>
        </header>
    );
}

export default HomePageBanner;