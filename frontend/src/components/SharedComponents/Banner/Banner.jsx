import hpBanner from "../../../assets/homepage-banner.png"
function Banner() {
    return (
        <header className="banner w-full">
            <div className="profile-image w-[80%] ml-auto mr-auto">
                <img src={hpBanner} alt="Profile" />
            </div>
        </header>
    );
}

export default Banner;