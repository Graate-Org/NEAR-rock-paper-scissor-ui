import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeftIcon, ProfileIcon } from "../icons";
import { AppProps } from "../interfaces/IApp.interface";
import Flex from "./Flex";
import Spacing from "./Spacing";
import Text from "./Text";

interface Props extends AppProps {
	route: string;
	title: string;
}

const AppLink = styled(Link)`
	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 21px;
	/* identical to box height */
	color: #7f88a9;
	text-decoration: none;
	display: inline-flex;
	align-items: center;
	svg {
		font-size: 26px;
	}
`;

export default function AppBar({
	route,
	title,
	currentUser,
}: Props): ReactElement {
	return (
		<Spacing marginBottom="68px">
			<Flex justifyContent="space-between">
				<AppLink to={route}>
					<ArrowLeftIcon />
					{title}
				</AppLink>
				<Flex alignItems="center">
					<ProfileIcon
						style={{ width: 15, marginRight: 10, fill: "#10DCE9" }}
					/>
					<Text>{currentUser?.accountId}</Text>&nbsp;◊
				</Flex>
			</Flex>
		</Spacing>
	);
}
