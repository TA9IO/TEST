import React, { Children } from "react";

const TITLE_STYLES = ["title-shadow-1", "title-shadow-2", "title-shadow-3"];

// 1/ if you are looking another color just add it to the array below
// go to src\SCSS\components\_title.scss and add the color
// 2/ or add it as inline style in the title component i distructed the ...style (u knw :p)

const TITLE_COLORS = ["title-color-white", "title-color-black"];

const TITLE_SIZES = [
  "title-small",
  "title-medium",
  "title-large",
  "title-xlarge",
];

function Title({ title, Titlestyle, children, size, style, titleColor }) {

  
  const title_Style = TITLE_STYLES.includes(Titlestyle) ? Titlestyle : null;

  const title_Size = TITLE_SIZES.includes(size) ? size : "title-medium";

  const title_color = TITLE_COLORS.includes(titleColor)
    ? titleColor
    : "title-color-black";

  return (
    <h1
      style={{ ...style }}
      className={`title ${title_Style} ${title_Size} ${title_color}`}
    >
      {title ? title : children}
    </h1>
  );
}

export default Title;
