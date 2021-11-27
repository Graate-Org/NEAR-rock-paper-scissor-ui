import { themeInterface } from "./types";

export const theme: themeInterface ={
  colors: {},
  breakpoint: {
    up: handleBreakpoint,
    down: handleDownBreakpoint,
  },
};

function handleBreakpoint(width = "xs") {
  switch (width.toLowerCase()) {
    case "xs":
      return "@media all and (min-width: 0px)";
    case "sm":
      return "@media all and (min-width: 576px)";
    case "md":
      return "@media all and (min-width: 768px)";
    case "lg":
      return "@media all and (min-width: 992px)";
    case "xl":
      return "@media all and (min-width: 1200px)";
    default:
      return "";
  }
}

function handleDownBreakpoint(width = "xl") {
  switch (width.toLowerCase()) {
    case "xs":
      return "@media all and (max-width: 320px)";
    case "sm":
      return "@media all and (max-width: 576px)";
    case "md":
      return "@media all and (max-width: 768px)";
    case "lg":
      return "@media all and (max-width: 992px)";
    case "xl":
      return "@media all and (max-width: 1200px)";
    default:
      return "";
  }
}
