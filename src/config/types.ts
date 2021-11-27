export interface themeInterface {
  colors: {};
  breakpoint: {
    up: (query: "xs" | "sm" | "md" | "lg" | "xl") => string;
    down: (query: "xs" | "sm" | "md" | "lg" | "xl") => string;
  };
}
