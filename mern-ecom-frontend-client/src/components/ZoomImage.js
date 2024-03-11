import React, { useState, useEffect, useRef } from "react";
import image from "../images/headphone.jpg";

const ZoomImage = ({ imageUrl, secondary = false }) => {
  const [zoom, setZoom] = useState(1);
  const [originX, setOriginX] = useState("50%");
  const [originY, setOriginY] = useState("50%");
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElem = imageRef.current;

    const handleMouseEnter = () => {
      setZoom(1.5); // Set the zoom level when mouse enters
    };

    const handleMouseMove = (e) => {
      const { left, top, width, height } = imageElem.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setOriginX(`${x}%`);
      setOriginY(`${y}%`);
    };

    const handleMouseLeave = () => {
      setZoom(1); // Reset zoom level to 1 when mouse leaves
      setOriginX("50%"); // Reset origin to center
      setOriginY("50%"); // Reset origin to center
    };

    if (imageElem) {
      imageElem.addEventListener("mouseenter", handleMouseEnter);
      imageElem.addEventListener("mousemove", handleMouseMove);
      imageElem.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (imageElem) {
        imageElem.removeEventListener("mouseenter", handleMouseEnter);
        imageElem.removeEventListener("mousemove", handleMouseMove);
        imageElem.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // width: "100%",
  // height: "100%",

  return (
    <div
      className={`zoom-image ${secondary && "w-100 h-100"}`}
      ref={imageRef}
      style={{
        overflow: "hidden",
        padding: "10px",
        border: "1px solid rgba(0, 0, 0, 0.18)",
        background: "white",
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <img
        src={imageUrl ? imageUrl : image} // Make sure you have defined or passed `image` in your component
        alt="watch"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.3s ease",
          transform: `scale(${zoom})`,
          transformOrigin: `${originX} ${originY}`,
        }}
      />
    </div>
  );
};

export default ZoomImage;
