import React from "react";

const Color = ({ data, setColor, color }) => {
  return (
    <>
      <ul className="colors ps-0">
        {data?.map((colorData) => {
          // Basic style with backgroundColor
          const baseStyle = {
            backgroundColor: colorData.title,
            cursor: "pointer",
          };

          // Additional styles if the id's match
          const selectedStyle =
            color && colorData._id === color
              ? {
                  boxShadow: "0 0 0 3px #00695C",
                  border: "3px solid white",
                }
              : {};

          // Merge the base style with the selectedStyle if applicable
          const style = { ...baseStyle, ...selectedStyle };
          return (
            <li
              onClick={() => setColor(colorData._id)}
              style={style}
              key={colorData._id}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Color;
