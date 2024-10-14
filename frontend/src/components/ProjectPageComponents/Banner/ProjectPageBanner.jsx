import hpBanner from "../../../assets/projectpage-banner.png"
function ProjectPageBanner() {
    return (
        <header className="banner w-full">
            <div className="profile-image ml-auto mr-auto">
                <img className='' src={hpBanner} alt="Profile" />
            </div>
        </header>
    );
}

export default ProjectPageBanner;