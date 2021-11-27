import * as React from "react";

const SVGComponent = (props: any) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15.8334 10H4.16675" stroke="#7F88A9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.0001 15.8333L4.16675 10L10.0001 4.16666" stroke="#7F88A9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default SVGComponent;
