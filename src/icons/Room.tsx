import * as React from "react";

const SVGComponent = (props: any) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.4844 20.7031V4.29687H17.1875V0.63501L4.29688 2.85752V20.7031H0.78125V22.2656H5.02441L17.1875 23.9433V5.85937H19.9219V22.2656H24.2188V20.7031H21.4844ZM15.625 22.1505L5.85938 20.8035V4.17373L15.625 2.49023V22.1505Z"
      fill="#7F88A9"
    />
    <path d="M12.5 11.3281H14.0625V14.4531H12.5V11.3281Z" fill="#7F88A9" />
  </svg>
);

export default SVGComponent;
