
// Sample data array (replace this with your actual data)
import {Link} from "react-router-dom";

const presentations = [
    {
        id: 1,
        title: "ẢNH HƯỞNG CỦA MXH HỘI UIT",
        subtitle: "Presentation",
        image: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        title: "Nhóm 8_Giới thiệu nhóm",
        subtitle: "Presentation",
        image: "https://via.placeholder.com/150",
    },
    {
        id: 3,
        title: "SE346.021_Nhom36",
        subtitle: "Presentation",
        image: "https://via.placeholder.com/150", //
    },
    {
        id: 4,
        title: "ẢNH HƯỞNG CỦA MXH HỘI UIT",
        subtitle: "Presentation",
        image: "https://via.placeholder.com/150", //
    },
    {
        id: 5,
        title: "Nhóm 8_Giới thiệu nhóm",
        subtitle: "Presentation",
        image: "https://via.placeholder.com/150", //
    },
    {
        id: 6,
        title: "SE346.021_Nhom36",
        subtitle: "Presentation",
        image: "https://via.placeholder.com/150",
    }
];

const ResponsiveGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {presentations.map((item) => (
                <Link to=''
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 "
                >
                    <div className="w-full h-48 bg-gray-200 relative">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-xs text-gray-500">{item.subtitle}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ResponsiveGrid;
