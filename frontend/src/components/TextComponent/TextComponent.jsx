import useTextComponentViewModel from "./TextComponentViewModel";
import { MdOutlineChangeCircle } from "react-icons/md";

/* eslint react/prop-types: 0 */
const TextComponent = ({
  info,
  onClick,
  removeComponent,
  selectedComponents,
  handleTextContentChange,
}) => {
  const {
    localPosition,
    localSize,
    handleMouseDown,
    handleTransformMouseDown,
    handleResizeMouseDown,
    componentRef,
    isSelected,
    deg,
    inputRef,
    handleDoubleClick,
    isEditing,
    handleBlur,
    isTransformButtonPressed,
  } = useTextComponentViewModel(info, removeComponent, selectedComponents);

  return (
    <div
      id={info._id}
      ref={componentRef}
      onDoubleClick={handleDoubleClick}
      className='wrapperDiv resizable-component group hover:border-[2px] hover:border-indigo-500 relative'
      style={{
        position: "absolute",
        width: localSize.width || "240px",
        height: localSize.height || "40px",
        left: localPosition.x,
        top: localPosition.y,
        zIndex: info.zIndex,
        clipPath: info.clipPath,
        transform: `rotate(${deg}deg)`,
        transformOrigin: "center",
        backgroundColor: info.backgroundColor || "transparent",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={(event) => {
        onClick(info, event);
      }}
      onMouseDown={(event) => handleMouseDown(event)}>
      {isEditing ? (
        <input
          ref={inputRef}
          onBlur={handleBlur}
          onChange={(e) => handleTextContentChange(e.target.value)}
          style={{
            width: "100%",
            color: info.color,
            textAlign: info.textAlign,
            fontFamily: info.fontFamily,
            fontSize: info.fontSize,
            fontStyle: info.fontStyle,
            fontWeight: info.fontWeight,
            textDecorationLine: info.textDecorationLine,
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
          }}
          type={"text"}
          defaultValue={info.content}
        />
      ) : (
        <h2
          style={{
            width: "100%",
            color: info.color,
            textAlign: info.textAlign,
            fontFamily: info.fontFamily,
            fontSize: info.fontSize,
            fontStyle: info.fontStyle,
            fontWeight: info.fontWeight,
            textDecorationLine: info.textDecorationLine,
            opacity: info.opacity || 1,
          }}>
          {info.content}
        </h2>
      )}
      {isSelected && (
        <MdOutlineChangeCircle
          size={20}
          className='resize-handle transform-icon'
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-30px",
            transform: "translateX(-50%)",
            cursor: "pointer",
            zIndex: 10,
            color: isTransformButtonPressed ? "red" : "inherit", // Change color when pressed
          }}
          onMouseDown={handleTransformMouseDown}
        />
      )}
      {isSelected && (
        <>
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
            style={{
              position: "absolute",
              top: "-10px",
              left: "-10px",
              width: "10px",
              height: "10px",
              cursor: "nwse-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "top")}
            style={{
              position: "absolute",
              top: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "10px",
              height: "10px",
              cursor: "ns-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "10px",
              height: "10px",
              cursor: "nesw-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "right")}
            style={{
              position: "absolute",
              top: "50%",
              right: "-10px",
              transform: "translateY(-50%)",
              width: "10px",
              height: "10px",
              cursor: "ew-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")}
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "-10px",
              width: "10px",
              height: "10px",
              cursor: "nwse-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "10px",
              height: "10px",
              cursor: "ns-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "-10px",
              width: "10px",
              height: "10px",
              cursor: "nesw-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "left")}
            style={{
              position: "absolute",
              top: "50%",
              left: "-10px",
              transform: "translateY(-50%)",
              width: "10px",
              height: "10px",
              cursor: "ew-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
        </>
      )}
    </div>
  );
};

export default TextComponent;
