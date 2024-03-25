import React, { useState, useEffect, useRef } from "react";
import image from "../images/headphone.jpg";

const ZoomImage = ({ imageUrl, secondary = false }) => {
  const [zoom, setZoom] = useState(1);
  const [originX, setOriginX] = useState("50%");
  const [originY, setOriginY] = useState("50%");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const imageElem = imageRef.current;

    const handleMouseEnter = () => setZoom(1.5);
    const handleMouseMove = (e) => {
      const { left, top, width, height } = imageElem.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setOriginX(`${x}%`);
      setOriginY(`${y}%`);
    };
    const handleMouseLeave = () => {
      setZoom(1);
      setOriginX("50%");
      setOriginY("50%");
    };

    imageElem.addEventListener("mouseenter", handleMouseEnter);
    imageElem.addEventListener("mousemove", handleMouseMove);
    imageElem.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      imageElem.removeEventListener("mouseenter", handleMouseEnter);
      imageElem.removeEventListener("mousemove", handleMouseMove);
      imageElem.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const isSmallScreen = windowWidth < 400;
  const imageSizeStyle = isSmallScreen
    ? { maxWidth: "100%", maxHeight: "100%" }
    : {
        maxWidth: secondary ? "200px" : "500px",
        maxHeight: secondary ? "200px" : "500px",
      };

  return (
    <div
      className={`zoom-image ${secondary && "w-100"}`}
      ref={imageRef}
      style={{
        overflow: "hidden",
        padding: "20px",
        border: "1px solid rgba(0, 0, 0, 0.18)",
        background: "white",
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: secondary ? "288px" : "541px",
      }}
    >
      <img
        src={imageUrl || image}
        alt="zoomed"
        style={{
          objectFit: "cover",
          transition: "transform 0.3s ease",
          transform: `scale(${zoom})`,
          transformOrigin: `${originX} ${originY}`,
          ...imageSizeStyle,
        }}
      />
    </div>
  );
};

export default ZoomImage;
