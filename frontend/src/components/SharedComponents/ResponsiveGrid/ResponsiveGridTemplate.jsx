
// Sample data array (replace this with your actual data)
import {Link} from "react-router-dom";
import testImage from "../../../assets/banner1.png";

import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import * as ProjectService from '../../../services/ProjectService'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResponsiveGrid = () => {

    const user = useSelector((state) => state.user)

    const navigate = useNavigate()

    const [projects, setProjects] = useState([])

    const mutation = useMutationHooks(async () => {
        try {
            const response = await ProjectService.getPublic();
            if (response?.status === "OK" && Array.isArray(response.data)) {
                setProjects(response.data); // Đặt vào projects
                console.log('Projects fetched successfully:', response.data);
            } else {
                setProjects([]); // Nếu không phải mảng, đặt mảng rỗng
                console.warn('Unexpected response format:', response);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    });
    

    useEffect(() => {
        handleGetPublic()
    }, [user])

    const handleGetPublic= () => {
        mutation.mutate()
    }

    const handleClick = (id) => {
        localStorage.setItem('projectId', id)
        navigate(`/${id}/edit`)
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {projects.length === 0 ? (
            <div className="text-gray-500 text-center col-span-4">
               There are no projects to display.
            </div>
        ) : (
            projects.slice().reverse().map((project, index) => (
                <div
                    onClick={() => handleClick(project?._id)}
                    key={project?._id}
                    id={project?._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                >
                    <div className="w-full h-48 bg-gray-200 relative">
                        <img
                            src={
                                project.canvasArray?.[0]?.background === '#ffffff'
                                    ? testImage
                                    : project.canvasArray?.[0]?.background
                            }
                            alt={project.projectName || 'Project Image'}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-800">{project.projectName}</h3>
                        <p className="text-xs text-gray-500">Presentation</p>
                    </div>
                </div>
            ))
        )}
    </div>
    
    );
};

export default ResponsiveGrid;
