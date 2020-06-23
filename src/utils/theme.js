const color = {
  primary: "#FFD600",
  alt1: "#FFFDE7",
  alt2: "#FFF9C4",
  alt3: "#FFF59D",
  alt4: "#FFF176",
  alt5: "#FFEE58",
  alt6: "#FFEB3B",
  alt7: "#FDD835",
  alt8: "#FBC02D",
  alt9: "#F9A825",
  alt10: "#F57F17",
  alt11: "#FFFF8D",
  alt12: "#FFFF00",
  alt13: "#FFEA00",
  secondary: "#2ECC71",
  accent: "#E74C3C"
};

const viewport = {
  xs: {
    minWidth: "0px",
    maxWidth: "599px"
  },
  sm: {
    minWidth: "600px",
    maxWidth: "959px"
  },
  md: {
    minWidth: "960px",
    maxWidth: "1279px"
  },
  lg: {
    minWidth: "1280px",
    maxWidth: "1919px"
  },
  xl: {
    minWidth: "1920px"
  }
};

const breakpoints = {
  up: key => `@media (min-width: ${viewport[key].minWidth})`,
  down: key => {
    if (key === "xl") {
      return "@media (min-width: 0px)";
    } else {
      return `@media (max-width: ${viewport[key].maxWidth})`;
    }
  },
  only: key => {
    if (key === "xl") {
      return `@media (min-width: ${viewport[key].minWidth})`;
    } else {
      return `@media (min-width: ${viewport[key].minWidth}) 
        and (max-width: ${viewport[key].maxWidth})`;
    }
  },
  between: (start, end) => {
    if (end === "xl") {
      return `@media (min-width: ${viewport[start].minWidth})`;
    } else {
      return `@media (min-width: ${viewport[start].minWidth}) 
        and @media (max-width: ${viewport[end].minWidth})`;
    }
  }
};

export { color, breakpoints };
