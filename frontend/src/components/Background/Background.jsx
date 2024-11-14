import template from "../../assets/bg-dm.png";

const Background = ({ setBackground }) => {
  const backgrounds = [template, template, ""];

  return (
    <div className='grid grid-cols-2 gap-2 w-full'>
      {backgrounds.map((bgLink, i) => (
        <div
          key={i}
          onClick={() => setBackground(bgLink || "white")}
          className='w-full h-[90px] rounded-md cursor-pointer'
          style={{
            backgroundColor: bgLink ? "transparent" : "white",
            backgroundImage: bgLink ? `url(${bgLink})` : "none",
            backgroundSize: "cover",
          }}></div>
      ))}
    </div>
  );
};

export default Background;
