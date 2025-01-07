// Sample data array (replace this with your actual data)
import { Link } from 'react-router-dom';
import testImage from '../../../assets/banner1.png';

import { useDispatch, useSelector } from 'react-redux';
import { useMutationHooks } from '../../../hooks/useMutationHook';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ProjectService from '../../../services/ProjectService';
import { useMutation } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const ResponsiveGrid = () => {
	const user = useSelector((state) => state.user);

	const navigate = useNavigate();

	const [projects, setProjects] = useState([]);

	const mutation = useMutationHooks(async () => {
		try {
			const response = await ProjectService.getPublic();
			if (response?.status === 'OK' && Array.isArray(response.data)) {
				setProjects(response.data); // Đặt vào projects
				console.log('Projects fetched successfully:', response.data);
				setIsLoading(false);
			} else {
				setProjects([]); // Nếu không phải mảng, đặt mảng rỗng
				console.warn('Unexpected response format:', response);
				setIsLoading(false);
			}
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	});

	const mutaionCopy = useMutation({
		mutationFn: async ({ data }) => {
			return await ProjectService.createCopy(data._id, data);
		},
		onSuccess: (data) => {
			if (data.status === 'OK') {
				const projectId = data.data._id;
				localStorage.setItem('projectId', projectId);
				navigate(`/${projectId}/edit`);
			}
			console.log('Copy created successfully');
		},
		onError: (error) => {
			console.error('Error creating copy:', error);
		},
	});

	useEffect(() => {
		handleGetPublic();
	}, []);

	const handleGetPublic = () => {
		mutation.mutate();
	};

	const handleClick = (id) => {
		const values = {
			_id: user?.id,
			data: id,
		};
		mutaionCopy.mutate({ data: values });
	};
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-12  py-6'>
			{isLoading ? (
				Array.from({ length: 5 }).map((_, index) => (
					<div className='' key={index}>
						<div className='bg-gray-200 rounded-md w-[300px] h-[200px]'>
							<Skeleton height={200} width='100%' borderRadius='8px' />
						</div>
						<div className='mt-2'>
							<Skeleton width='60%' />
						</div>
					</div>
				))
			) : projects.length === 0 ? (
				<div className='text-gray-500 text-start'>There are no projects to display.</div>
			) : (
				projects
					.slice()
					.reverse()
					.map((project, index) => (
						<div
							onClick={() => handleClick(project?._id)}
							key={project?._id}
							id={project?._id}
							className='bg-white w-full mb-4 cursor-pointer max-w-[300px] mx-auto rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105'
						>
							<div
								className='relative w-full h-0 pb-[56.25%] bg-cover overflow-hidden border'
								style={{
									backgroundImage:
										project.canvasArray?.[0]?.background === '#ffffff'
											? 'none' // Không hiển thị hình ảnh nền
											: `url(${project.canvasArray?.[0]?.background})`,
									backgroundColor:
										project.canvasArray?.[0]?.background === '#ffffff'
											? '#ffffff' // Hiển thị màu trắng
											: 'transparent', // Màu nền trong suốt nếu có hình ảnh nền
									backgroundSize: '100% 100%',
									backgroundPosition: 'center',
									backgroundRepeat: 'no-repeat',
								}}
							>
								{project.canvasArray?.[0]?.componentArray?.map((component, index) => {
									const getShapeStyle = (shapeType) => {
										switch (shapeType) {
											case 'circle':
												return { borderRadius: '50%' }; // Tạo hình tròn
											case 'triangle':
												return {
													clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
												}; // Hình tam giác
											case 'invertedTriangle':
												return { clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }; // Hình tam giác ngược
											case 'pentagon':
												return {
													clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
												}; // Hình ngũ giác
											case 'hexagon':
												return {
													clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
												}; // Hình lục giác
											case 'octagon':
												return {
													clipPath: 'polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)',
												}; // Hình bát giác
											case 'arrowUp':
												return {
													clipPath: 'polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%)',
												}; // Mũi tên hướng lên
											case 'arrowDown':
												return {
													clipPath: 'polygon(50% 100%, 100% 50%, 75% 50%, 75% 0%, 25% 0%, 25% 50%, 0% 50%)',
												}; // Mũi tên hướng xuống
											case 'arrowRight':
												return {
													clipPath: 'polygon(0% 50%, 50% 0%, 50% 25%, 100% 25%, 100% 75%, 50% 75%, 50% 100%)',
												}; // Mũi tên hướng phải
											case 'arrowLeft':
												return {
													clipPath: 'polygon(100% 50%, 50% 0%, 50% 25%, 0% 25%, 0% 75%, 50% 75%, 50% 100%)',
												}; // Mũi tên hướng trái
											case 'rect':
												return {}; // Hình chữ nhật (mặc định không cần clipPath)
											default:
												return {};
										}
									};

									const shapeStyle = getShapeStyle(component.shapeType);

									const scaleX = 360 / project.width;
									const scaleY = 200 / project.height;

									const widthComponent = component.width * scaleX;
									const heightComponent = component.height * scaleY;
									const topComponent = component.y * scaleY;
									const leftComponent = component.x * scaleX;

									return (
										<>
											{/* Xử lý Text */}
											{component.type === 'Text' && component.content && (
												<div
													key={index}
													style={{
														position: 'absolute',
														top: topComponent,
														left: leftComponent,
														width: Math.max(widthComponent, 50),
														height: Math.max(heightComponent, 20),
														transform: `rotate(${component.rotate || 0}deg)`,
														transformOrigin: 'center',
														color: component.color || 'black',
														fontSize: Math.max(component.fontSize * scaleY, 12),
														fontFamily: component.fontFamily || 'Arial',
														fontStyle: component.fontStyle || 'normal',
														fontWeight: component.fontWeight || 'normal',
														textDecoration: component.textDecorationLine || 'none',
														textAlign: component.textAlign || 'left',
														whiteSpace: 'pre-wrap',
													}}
												>
													{component.content}
												</div>
											)}

											{/* Xử lý Image */}
											{component.type === 'Image' && component.image && (
												<img
													key={index}
													src={component.image}
													alt=''
													style={{
														position: 'absolute',
														top: topComponent,
														left: leftComponent,
														width: widthComponent,
														height: heightComponent,
														transform: `rotate(${component.rotate || 0}deg)`,
														transformOrigin: 'center',
														opacity: component.opacity || 1,
														objectFit: 'contain',
													}}
												/>
											)}

											{/* Xử lý Shape */}
											{component.type === 'Shape' && (
												<div
													key={index}
													style={{
														position: 'absolute',
														top: topComponent,
														left: leftComponent,
														width: widthComponent,
														height: heightComponent,
														transform: `rotate(${component.rotate || 0}deg)`,
														transformOrigin: 'center',
														backgroundColor: component.color || 'transparent',
														...shapeStyle,
													}}
												></div>
											)}
										</>
									);
								})}
							</div>
							<div className='p-4'>
								<h3 className='font-semibold text-gray-800'>{project.projectName}</h3>
								<p className='text-xs text-gray-500'>Available template</p>
							</div>
						</div>
					))
			)}
		</div>
	);
};

export default ResponsiveGrid;
