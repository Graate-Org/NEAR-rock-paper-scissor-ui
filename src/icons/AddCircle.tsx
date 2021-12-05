import * as React from "react";

const SVGComponent = (props: any) => (
	<svg
		width={32}
		height={32}
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<circle cx={16} cy={16} r={16} fill="#242B42" />
		<path
			d="M21 16.7647H16.8235V21H15.1569V16.7647H11V15.2549H15.1569V11H16.8235V15.2549H21V16.7647Z"
			fill="#7F88A9"
		/>
	</svg>
);

export default SVGComponent;
