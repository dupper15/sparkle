import { FaPlus } from "react-icons/fa6";
import avt from "../../assets/default-profile-icon.png";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useEffect, useReducer, useRef, useState } from "react";
import AddEditorForm from "../AddEditorForm/AddEditorForm";
import { useMutation } from "@tanstack/react-query";
import * as ProjectService from "../../services/ProjectService";
import * as Alert from "../Alert/Alert"
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const initialState = {
  isShow: false,
  errorMessage: "",
  avatars: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SHOW":
      return { ...state, isShow: !state.isShow };
    case "SET_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SET_AVATARS":
      return { ...state, avatars: action.payload };
    default:
      return state;
  }
}

const WorkplaceHeader = ({ usersInRoom }) => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const projectId = localStorage.getItem("projectId")
  const user = useSelector((state) => state.user)
  const ownerId = user?.id
  const project = useSelector((state) => state.project)
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [status, setStatus] = useState("")
  const [download, setDownload] = useState(false)
  const [downloadType, setDownloadType] = useState("pdf");

  const [canvases, setCanvases] = useState("")

  useEffect(() => {
    setCanvases(project?.canvasArray)
  }, [project?.canvasArray])

  console.log("project", project)
  const canvasRefs = useRef([]);

  const handleDownloadPDF = async () => {
    const pdfWidth = 900
    const pdfHeight = 300
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [pdfWidth, pdfHeight], // Kích thước PDF khớp với canvas
    });

    for (let i = 0; i < canvasRefs.current.length; i++) {
      const element = canvasRefs.current[i];
      if (!element) continue;

    
      const page = await html2canvas(element, {
        useCORS: true, // Hỗ trợ tải ảnh từ các nguồn khác
        scale: 2, // Tăng chất lượng ảnh chụp
      });
      const data = page.toDataURL("image/png");

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save("all_canvases.pdf");
  };

  // const handleDownloadPDF = useReactToPrint({
  //   contentRef: contentRef,
  //   documentTitle: "workplace",
  //   onPrintError: (error) => console.error("Print error:", error),
  //   pageStyle: `
  //     @page {
  //       size: ${project.width}px ${project.height}px;
  //       margin: 0;
  //     }
  //     @media print {
  //       .canvas-container {
  //         page-break-before: always;
  //         display: block !important;
  //       }
  //     }
  //   `,
  //   // Customize the print behavior to handle multiple pages
  //   onAfterPrint: () => console.log("Printing completed"),
  // });

  // Handle PNG download using html2canvas
  const handleDownloadPNG = async () => {
    const canvas = canvasesRefs.current; // Lấy Canvas đầu tiên (hoặc tùy chọn)
    if (canvas) {
      const canvasImage = await html2canvas(canvas);
      const dataUrl = canvasImage.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "workplace.png";
      link.click();
    }
  };

  const handleDownload = () => {
    if (downloadType === "pdf") {
      handleDownloadPDF();
    } else if (downloadType === "png") {
      handleDownloadPNG();
    }
  };

  const renderCanvases = () => {
    return canvasList.map((canvas, index) => (
      <div key={index} ref={canvasRefs} style={{ pageBreakAfter: 'always' }}>
        
      </div>
    ));
  };

  useEffect(() => {
    setStatus(project?.isPublic)
  }, [project?.isPublic])

  const mutation = useMutation({
    mutationFn: (data) => {
      return ProjectService.getAvatar(data.usersInRoom);
    },
    onError: (error) => {
      const apiErrorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      console.error(error);
      dispatch({ type: "SET_ERROR", payload: apiErrorMessage });
    },
    onSuccess: (data) => {
      console.log("Dữ liệu nhận được:", data);
      dispatch({ type: "SET_AVATARS", payload: data.avatars || [] });
    },
  });

  const mutationPublic = useMutation({
    mutationFn: async  ({projectId}) => {
      const response = await ProjectService.updatePublic(projectId);
      if (response.status === "ERROR") {
        // Throw an error to trigger onError
        throw new Error(response.message);
      }
      return response;
    },
    onError: (error) => {
      const apiErrorMessage = error.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage(apiErrorMessage.message === undefined ? apiErrorMessage : apiErrorMessage.message);
      setSuccessMessage("")
    },
    onSuccess: (data) => {
      setErrorMessage("");
      const apiSuccessMessage = "Public project successfully!";
      setSuccessMessage(apiSuccessMessage)
    },
  });

  const mutationPrivate = useMutation({
    mutationFn: async  ({projectId}) => {
      const response = await ProjectService.updatePrivate(projectId);
      if (response.status === "ERROR") {
        // Throw an error to trigger onError
        throw new Error(response.message);
      }
      return response;
    },
    onError: (error) => {
      const apiErrorMessage = error.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage(apiErrorMessage.message === undefined ? apiErrorMessage : apiErrorMessage.message);
      setSuccessMessage("")
    },
    onSuccess: (data) => {
      setErrorMessage("");
      const apiSuccessMessage = "Private project successfully!";
      setSuccessMessage(apiSuccessMessage)
    },
  });

  const {isError, isSuccess} = mutationPublic
 
  useEffect(() => {
    if (isError) {
      Alert.error("You don't have permission to public project!");
    }
    if (isSuccess) {
      Alert.success(successMessage);
    }
  }, [isSuccess, isError, errorMessage, successMessage]);

  const handlePublic = () => {
    mutationPublic.mutate({projectId})
    setStatus(!status)
  }

  const handlePrivate = () => {
    mutationPrivate.mutate({projectId})
    setStatus(!status)
  }

  const handleClickDownload = () => {
    setDownload(!download)
  }

  const toggleAddMember = () => {
    dispatch({ type: "TOGGLE_SHOW" });
  };

  const goHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    if (usersInRoom.length > 0) {
      mutation.mutate(projectId);
    }
  }, [usersInRoom]);

  return (
    <div
      className={`flex items-center justify-between w-full h-[50px] px-5 py-8 ${
        isDarkMode ? "bg-[#18191B]" : "bg-gray-200"
      }`}>
      <div className='flex items-center gap-2'>
        <div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
        <div
          onClick={goHome}
          className={`text-3xl font-bold cursor-pointer ${
            isDarkMode ? "text-white" : "text-black"
          }`}>
          Sparkle
        </div>
      </div>
      <div className='flex items-center gap-5 '>
        <div className='hidden md:flex md:items-center relative mr-6'>
          <div className='flex flex-row-reverse'>
            {state.avatars.map((value, index) => (
              <div
                key={index}
                className='w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-white'
                style={{
                  marginLeft:
                    index !== state.avatars.length - 1 ? "-15px" : "0",
                  zIndex: state.avatars.length - index,
                }}>
                <img
                  src={value || avt}
                  alt='Avatar'
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>

          <button
            onClick={toggleAddMember}
            className='w-[40px] h-[40px] bg-white font-semibold rounded-full
                      border-2 shadow-sm cursor-pointer text-[#4335DE] flex justify-center
                      items-center p-2 hover:bg-slate-200'
            style={{
              position: "absolute",
              top: "50%",
              left: "calc(100% - 15px)",
              zIndex: 50,
              transform: "translateY(-50%)",
            }}>
            <FaPlus className='w-[30px] h-[30px]' />
          </button>
        </div>

        {state.isShow && (
          <>
            <div
              className='fixed inset-0 bg-black bg-opacity-50 z-[9998]'
              onClick={toggleAddMember}></div>
            <div className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[9999] animate-fade-in'>
              <AddEditorForm
                childCloseFormRequest={toggleAddMember}
                onCreate={(data) => console.log("Member added:", data)}
              />
            </div>
          </>
        )}

        <button onClick={handleClickDownload} className='w-[100px] h-[40px] bg-gradient font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2'>
          <span className='text-white'>Download</span>
        </button>
        {download && (
          <div className="absolute top-[4rem] right-[12rem] padding-[15px]">
            <div
              className={`profile-dropdown w-[200px] box-border pb-2 shadow-lg rounded-2xl ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
            >
              {/* Header */}
              <div className="text-center py-2 border-b">
                <span className="font-semibold text-lg">Download Options</span>
              </div>

              {/* Options */}
              <div className="flex flex-col px-4 py-2">
                {/* Radio Option for PDF */}
                <label className="flex items-center cursor-pointer py-2">
                  <input
                    type="radio"
                    name="downloadType"
                    value="pdf"
                    checked={downloadType === "pdf"}
                    onChange={() => setDownloadType("pdf")}
                    className="mr-2"
                  />
                  <span className="w-full text-left hover:text-[#4335DE]">Download PDF</span>
                </label>

                {/* Radio Option for PNG */}
                <label className="flex items-center cursor-pointer py-2">
                  <input
                    type="radio"
                    name="downloadType"
                    value="png"
                    checked={downloadType === "png"}
                    onChange={() => setDownloadType("png")}
                    className="mr-2"
                  />
                  <span className="w-full text-left hover:text-[#4335DE]">Download PNG</span>
                </label>
              </div>

              {/* Download Button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-[#4335DE] text-white rounded-lg hover:bg-[#372fc9] transition z-99"
                >
                  Download
                </button>
              </div>
              {/* WorkplaceCanvas (ẩn trong giao diện chính) */}
                {
                  canvases.slice().map((canvas, index) => (
                    <div 
                        key={canvas?._id}
                        id={canvas?._id}
                        className="canvas-container bg-white"
                    >
                            <div  
                                ref={(el) => (canvasRefs.current[index] = el)} // Lưu tham chiếu canvas
                                className={`canvas-background w-[${project.width}px] h-[${project.height}px] relative bg-cover `}
                                style={{
                                  backgroundImage:
                                  canvas.background === "#ffffff"
                                    ? "none"
                                    : `url(${canvas.background})`,
                                  backgroundColor:
                                    canvas.background === "#ffffff" ? "#ffffff" : "transparent",
                                  backgroundSize: "100% 100%",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                              }}
                            >
                            {canvas.componentArray?.map((component, index) => {
                                const getShapeStyle = (shapeType) => {
                                switch (shapeType) {
                                    case 'circle':
                                    return {
                                        borderRadius: '50%',  // Tạo hình tròn
                                    };
                                    case 'triangle':
                                    return {
                                        clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',  // Hình tam giác
                                    };
                                    case 'invertedTriangle':
                                    return {
                                        clipPath: 'polygon(50% 100%, 0 0, 100% 0)',  // Hình tam giác ngược
                                    };
                                    case 'pentagon':
                                    return {
                                        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',  // Hình ngũ giác
                                    };
                                    case 'hexagon':
                                    return {
                                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',  // Hình lục giác
                                    };
                                    case "octagon":
                                        return {
                                        clipPath:
                                            "polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)",
                                        }; // Hình bát giác
                                    case "arrowUp":
                                        return {
                                        clipPath:
                                            "polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%)",
                                        }; // Mũi tên hướng lên
                                    case "arrowDown":
                                        return {
                                        clipPath:
                                            "polygon(50% 100%, 100% 50%, 75% 50%, 75% 0%, 25% 0%, 25% 50%, 0% 50%)",
                                        }; // Mũi tên hướng xuống
                                    case "arrowRight":
                                        return {
                                        clipPath:
                                            "polygon(0% 50%, 50% 0%, 50% 25%, 100% 25%, 100% 75%, 50% 75%, 50% 100%)",
                                        }; // Mũi tên hướng phải
                                    case "arrowLeft":
                                        return {
                                        clipPath:
                                            "polygon(100% 50%, 50% 0%, 50% 25%, 0% 25%, 0% 75%, 50% 75%, 50% 100%)",
                                        }; // Mũi tên hướng trái
                                    case 'rect':
                                    return {};  // Hình chữ nhật (mặc định không cần clipPath)
                                    default:
                                    return {};
                                }
                                };
                            
                                const shapeStyle = getShapeStyle(component.shapeType);
                 
                                return (
                                <div className="canvas-component"
                                    key={index}
                                    style={{
                                    position: 'absolute', 
                                    top: component.y,
                                    left: component.x,
                                    width: component.width,
                                    height: component.height,
                                    backgroundColor: component.color || 'transparent',
                                    ...shapeStyle,  // Áp dụng kiểu dáng cho hình
                                    }}
                                />
                                );
                            })}
                            </div>
                    </div>
                ))
                }
                </div>
              </div>
        )}

        <button
          onClick={() => console.log("userInRoom", usersInRoom)}
          className='w-[100px] h-[40px] bg-white font-semibold rounded-lg border-2 border-black shadow-sm cursor-pointer text-black flex justify-center items-center p-2 hover:bg-slate-200'>
          <span className='gradient'>Share</span>
        </button>
        {(ownerId === project?.owner) &&
          <button
            onClick={status ? handlePrivate : handlePublic}
            className='w-[100px] h-[40px] bg-white font-semibold rounded-lg border-2 shadow-sm cursor-pointer text-black flex justify-center items-center p-2 hover:bg-slate-200'>
            <span className='gradient'>{status ? "Private" : "Public"}</span>
          </button>
         }
      </div>
    </div>
  );
};

export default WorkplaceHeader;
