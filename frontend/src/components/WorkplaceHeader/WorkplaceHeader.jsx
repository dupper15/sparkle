import { FaPlus } from "react-icons/fa6";
import avt from "../../assets/default-profile-icon.png";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useEffect, useReducer, useRef, useState } from "react";
import AddEditorForm from "../AddEditorForm/AddEditorForm";
import { useMutation } from "@tanstack/react-query";
import * as ProjectService from "../../services/ProjectService";
import * as Alert from "../Alert/Alert";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { BsThreeDotsVertical } from "react-icons/bs";
import SettingWork from "../AddEditorForm/SettingWork";
import ShareProject from "../ShareProject/ShareProject";
import JoinForm from "../JoinForm/JoinForm";

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
  const [openSetting, setOpenSetting] = useState(false);
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const projectId = localStorage.getItem("projectId");
  const user = useSelector((state) => state.user);
  const ownerId = user?.id;
  const project = useSelector((state) => state.project);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [status, setStatus] = useState("");
  const [download, setDownload] = useState(false);
  const [downloadType, setDownloadType] = useState("pdf");
  const [openAddEditor, setOpenAddEditor] = useState(false);

  const [isShareOpen, SetIsShare] = useState(false);

  const [canvases, setCanvases] = useState("");

  const canvasRefs = useRef([]);
  const handleDownloadPDF = async () => {
    const pdfWidth = project?.width;
    const pdfHeight = project?.height;

    let pdf = null;

    const ratio = pdfWidth / pdfHeight;
    if (ratio > 1) {
      pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [pdfWidth, pdfHeight],
      });
    } else {
      pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [pdfWidth, pdfHeight],
      });
    }
    for (let i = 0; i < canvasRefs.current.length; i++) {
      const element = canvasRefs.current[i];
      if (!element) continue;

      const page = await html2canvas(element, {
        useCORS: true,
        scale: 3,
      });

      const data = page.toDataURL("image/png");

      if (i > 0) {
        pdf.addPage();
      }
      const imgProps = pdf.getImageProperties(data);
      console.log("imgProps", imgProps);

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    }
    pdf.save(`${project?.projectName}.pdf`);
  };
  const handleDownloadPNG = async () => {
    if (!canvasRefs.current.length) {
      console.error("No canvases available to download.");
      return;
    }

    try {
      const zip = new JSZip();
      const folder = zip.folder("canvases");
      if (!folder) {
        console.error("Failed to create folder in ZIP.");
        return;
      }

      for (let i = 0; i < canvasRefs.current.length; i++) {
        const element = canvasRefs.current[i];
        if (!element) continue;

        const canvasImage = await html2canvas(element, {
          useCORS: true,
          scale: 3,
        });
        const dataUrl = canvasImage.toDataURL("image/png");

        const base64Data = dataUrl.split(",")[1];
        folder.file(`canvas_${i + 1}.png`, base64Data, { base64: true });
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${project?.projectName}.zip`);
    } catch (error) {
      console.error("Error processing canvases:", error);
    }
  };

  const getShapeSVG = (shapeType, width, height, color) => {
    switch (shapeType) {
      case "circle":
        return (
          <svg width={width} height={height}>
            <circle cx="50%" cy="50%" r="50%" fill={color || "transparent"} />
          </svg>
        );
      case "triangle":
        return (
          <svg width={width} height={height}>
            <polygon
              points="50,0 100,100 0,100"
              fill={color || "transparent"}
            />
          </svg>
        );
      case "invertedTriangle":
        return (
          <svg width={width} height={height}>
            <polygon points="50,100 0,0 100,0" fill={color || "transparent"} />
          </svg>
        );
      case "rect":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: color || "transparent",
            }}></div>
        );
      case "pentagon":
        return (
          <svg width={width} height={height}>
            <polygon
              points="50,0 100,38 82,100 18,100 0,38"
              fill={color || "transparent"}
            />
          </svg>
        );
      case "hexagon":
        return (
          <svg width={width} height={height}>
            <polygon
              points="50,0 100,25 100,75 50,100 0,75 0,25"
              fill={color || "transparent"}
            />
          </svg>
        );
      case "octagon":
        return (
          <svg width={width} height={height}>
            <polygon
              points="30,0 70,0 100,30 100,70 70,100 30,100 0,70 0,30"
              fill={color || "transparent"}
            />
          </svg>
        );
      case "arrowUp":
        return (
          <svg width={width} height={height}>
            <polygon
              points="50,0 100,50 75,50 75,100 25,100 25,50 0,50"
              fill={color || "transparent"}
            />
          </svg>
        );
      case "arrowDown":
        return (
          <svg width={width} height={height}>
            <polygon
              points="50,100 100,50 75,50 75,0 25,0 25,50 0,50"
              fill={color || "transparent"}
            />
          </svg>
        );
      case "arrowRight":
        return (
          <svg width={width} height={height}>
            <polygon
              points="0,50 50,0 50,25 100,25 100,75 50,75 50,100"
              fill={color || "transparent"}
            />
          </svg>
        );
      case "arrowLeft":
        return (
          <svg width={width} height={height}>
            <polygon
              points="100,50 50,0 50,25 0,25 0,75 50,75 50,100"
              fill={color || "transparent"}
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleDownload = () => {
    if (downloadType === "pdf") {
      handleDownloadPDF();
    } else if (downloadType === "png") {
      handleDownloadPNG();
    }
    setDownload(!download);
  };

  useEffect(() => {
    setStatus(project?.isPublic);
  }, [project?.isPublic]);

  const mutation = useMutation({
    mutationFn: (usersInRoom) => {
      return ProjectService.getAvatar(usersInRoom);
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
    mutationFn: async ({ projectId }) => {
      const response = await ProjectService.updatePublic(projectId);
      if (response.status === "ERROR") {
        throw new Error(response.message);
      }
      return response;
    },
    onError: (error) => {
      const apiErrorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage(
        apiErrorMessage.message === undefined
          ? apiErrorMessage
          : apiErrorMessage.message
      );
      setSuccessMessage("");
    },
    onSuccess: (data) => {
      setErrorMessage("");
      const apiSuccessMessage = "Public project successfully!";
      setSuccessMessage(apiSuccessMessage);
    },
  });

  const mutationPrivate = useMutation({
    mutationFn: async ({ projectId }) => {
      const response = await ProjectService.updatePrivate(projectId);
      if (response.status === "ERROR") {
        throw new Error(response.message);
      }
      return response;
    },
    onError: (error) => {
      const apiErrorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage(
        apiErrorMessage.message === undefined
          ? apiErrorMessage
          : apiErrorMessage.message
      );
      setSuccessMessage("");
    },
    onSuccess: (data) => {
      setErrorMessage("");
      const apiSuccessMessage = "Private project successfully!";
      setSuccessMessage(apiSuccessMessage);
    },
  });

  const { isError, isSuccess } = mutationPublic;

  useEffect(() => {
    if (isError) {
      Alert.error("You don't have permission to public project!");
    }
    if (isSuccess) {
      Alert.success(successMessage);
    }
  }, [isSuccess, isError, errorMessage, successMessage]);

  const [isLoading, setIsLoading] = useState(false);

  const handlePublic = async () => {
    try {
      setIsLoading(true);
      await mutationPublic.mutateAsync({ projectId });
      setStatus(true);
    } catch (error) {
      console.error("Error updating project to public:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivate = async () => {
    try {
      setIsLoading(true);
      await mutationPrivate.mutateAsync({ projectId });
      setStatus(false);
    } catch (error) {
      console.error("Error updating project to private:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickDownload = async () => {
    try {
      const result = await ProjectService.getDetailProject(projectId);

      if (result?.data?.canvasArray) {
        setCanvases([...result.data.canvasArray]);
        setDownload(!download);
      } else {
        console.error("Canvas array not found in response.");
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const toggleAddMember = () => {
    dispatch({ type: "TOGGLE_SHOW" });
  };

  const goHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    if (usersInRoom.length > 0) {
      mutation.mutate(usersInRoom);
    }
  }, [usersInRoom]);

  const [isJoined, setIsJoined] = useState(true);

  useEffect(() => {
    console.log("User in room(join):", usersInRoom);
    if (usersInRoom.some((usersInRoom) => usersInRoom.id === user._id)) {
      setIsJoined(true);
    } else {
      setIsJoined(false);
    }
  }, [usersInRoom, user._id]);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
      console.log("form");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  isJoined ? console.log("yes") : "no";

  return (
    <div
      className={`flex items-center justify-between w-full h-[50px] px-5 py-8 ${
        isDarkMode ? "bg-black" : "bg-slate-100"
      }`}>
      <div className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
        <div
          onClick={goHome}
          className="text-3xl font-bold cursor-pointer 
           gradient
          ">
          Grafik
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden md:flex md:items-center relative mr-6">
          {state.avatars.length > 1 && (
            <div className="flex flex-row-reverse">
              {state.avatars.map((value, index) => (
                <div
                  key={index}
                  className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-white"
                  style={{
                    marginLeft:
                      index !== state.avatars.length - 1 ? "-15px" : "0",
                    zIndex: state.avatars.length - index,
                  }}>
                  <img
                    src={value || avt}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            onClick={toggleAddMember}
            className="w-[40px] h-[40px] bg-white font-semibold rounded-full
                      border-2 shadow-sm cursor-pointer text-[#4335DE] flex justify-center
                      items-center p-2 hover:bg-slate-200"
            style={{
              position: "absolute",
              top: "50%",
              left: "calc(100% - 15px)",
              transform: "translateY(-50%)",
            }}>
            <FaPlus className="w-[30px] h-[30px]" />
          </button>
        </div>

        {state.isShow && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
              onClick={toggleAddMember}></div>
            <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[9999] animate-fade-in">
              <AddEditorForm
                childCloseFormRequest={toggleAddMember}
                onCreate={(data) => console.log("Member added:", data)}
              />
            </div>
          </>
        )}

        <button
          onClick={handleClickDownload}
          className="w-[100px] h-[40px] bg-gradient font-semibold rounded-lg shadow-sm cursor-pointer flex justify-center items-center p-2">
          <span className="text-white">Download</span>
        </button>
        {download && (
          <div
            className={`profile-dropdown z-[100] absolute w-[240px] top-[4rem] right-[10rem] box-border pb-4 shadow-xl rounded-2xl ${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            }`}>
            {/* Header */}
            <div className="text-center py-3 border-b">
              <span className="font-semibold text-lg">Download Options</span>
            </div>

            {/* Options */}
            <div className="flex flex-col px-6 py-4 space-y-3">
              {/* Radio Option for PDF */}
              <label className="flex items-center cursor-pointer text-sm hover:text-orange-500 transition">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="downloadType"
                    value="pdf"
                    checked={downloadType === "pdf"}
                    onChange={() => setDownloadType("pdf")}
                    className=" mr-3  accent-orange-500 focus:outline-none "
                  />
                  <label htmlFor="pdf" className="custom-radio"></label>
                  <span className="w-full text-left">Download PDF</span>
                </div>
              </label>

              {/* Radio Option for PNG */}
              <label className="flex items-center cursor-pointer text-sm hover:text-orange-500 transition">
                <input
                  type="radio"
                  name="downloadType"
                  value="png"
                  checked={downloadType === "png"}
                  onChange={() => setDownloadType("png")}
                  className="mr-3 accent-orange-500 focus:outline-none"
                />
                <span className="w-full text-left">Download PNG</span>
              </label>
            </div>

            {/* Download Button */}
            <div className="flex justify-center mt-5">
              <button
                onClick={handleDownload}
                className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-500 transition transform hover:scale-105 z-99">
                Download
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            transform: "translate(-9999px, -9999px)",
            opacity: 0,
            pointerEvents: "none",
          }}>
          {Array.isArray(canvases) &&
            canvases.map((canvas, index) => (
              <div
                key={canvas?._id}
                id={canvas?._id}
                className="canvas-container bg-white">
                <div
                  ref={(el) => (canvasRefs.current[index] = el)}
                  className="canvas-background"
                  style={{
                    width: `${project.width}px`,
                    height: `${project.height}px`,
                    backgroundImage:
                      canvas.background === "#ffffff"
                        ? "none"
                        : `url(${canvas.background})`,
                    backgroundColor:
                      canvas.background === "#ffffff"
                        ? "#ffffff"
                        : "transparent",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                  }}>
                  {canvas.componentArray?.map((component, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: "absolute",
                        top: component.y,
                        left: component.x,
                        width: component.width,
                        height: component.height,
                        transform: `rotate(${component.rotate}deg)`, // Xoay hình ảnh
                        transformOrigin: "center", // Tâm xoay nằm ở giữa
                      }}>
                      {component.type === "Text" ? (
                        <div
                          style={{
                            color: component.color,
                            fontSize: component.fontSize,
                            fontFamily: component.fontFamily,
                            fontStyle: component.fontStyle,
                            fontWeight: component.fontWeight,
                            textDecoration: component.textDecorationLine,
                            textAlign: component.textAlign,
                            whiteSpace: "pre-wrap", // Để xuống dòng nếu có nhiều dòng
                          }}>
                          {component.content}
                        </div>
                      ) : component.type === "Image" ? (
                        <img
                          src={component.image}
                          alt=""
                          style={{
                            width: "100%", // Đảm bảo hình ảnh chiếm toàn bộ chiều rộng container
                            height: "100%", // Đảm bảo hình ảnh chiếm toàn bộ chiều cao container
                            opacity: component.opacity, // Áp dụng độ mờ
                            objectFit: "contain", // Đảm bảo hình ảnh không bị méo
                          }}
                        />
                      ) : (
                        getShapeSVG(
                          component.shapeType,
                          component.width + 10,
                          component.height + 10,
                          component.color
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Nút chia sẻ */}
        <button
          onClick={() => SetIsShare((prev) => !prev)}
          className="w-[100px] h-[40px] bg-white font-semibold rounded-lg  shadow-sm cursor-pointer text-black flex justify-center items-center p-2 hover:bg-slate-200">
          <span className="text-orange-500">Share</span>
        </button>
        {isShareOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
              onClick={() => SetIsShare((prev) => !prev)}></div>
            <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[9999] animate-fade-in">
              <ShareProject
                childCloseFormRequest={() => SetIsShare((prev) => !prev)}
              />
            </div>
          </>
        )}

        {/* Nút trạng thái Private/Public */}
        {ownerId === project?.owner && (
          <BsThreeDotsVertical
            onClick={() => setOpenSetting((prev) => !prev)}
            className="text-xl text-slate-800 hover:text-slate-600 cursor-pointer dark:text-white"
          />
        )}
        {openSetting && (
          <div className="absolute top-[4rem] right-[1rem] padding-[15px] z-[100]">
            <SettingWork
              isLoading={isLoading}
              status={status}
              handlePrivate={handlePrivate}
              handlePublic={handlePublic}
              setOpenAddEditor={() => setOpenSetting(!openSetting)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkplaceHeader;
