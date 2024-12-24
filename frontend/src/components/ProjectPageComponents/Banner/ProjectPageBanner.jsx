import hpBanner from "../../../assets/project-page-banner.png";
function ProjectPageBanner() {
  return (
    <header className='banner w-full'>
      <div className='profile-image ml-auto mr-auto'>
        <img
          className='rounded-2xl  w-[1220px] h-[300px]'
          src={hpBanner}
          alt='Profile'
        />
      </div>
    </header>
  );
}

export default ProjectPageBanner;
