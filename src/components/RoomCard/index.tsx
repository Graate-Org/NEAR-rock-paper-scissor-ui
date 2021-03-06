import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppProps } from "../../interfaces/IApp.interface";
import { RoomMember } from "../../interfaces/IRoom.interface";
import Flex from "../Flex";
import Text from "../Text";

interface Props {
	privacy: "public" | "private";
	id: string;
	created: string;
	route: string;
	children?: React.ReactNode;
	contract: AppProps["contract"];
}

const Wrapper = styled.div`
	background-color: #2e3650;
	background-image: url("./room-bg.svg");
	background-repeat: no-repeat;
	border-radius: 5px;
	position: relative;
	padding: 26px 20px 46px 20px;
`;

const CardText = styled(Text)`
	color: #b1b9d8;
`;

const ViewLink = styled(Link)`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	font-size: 15px;
	line-height: 13px;
	/* identical to box height */
	color: #808fbe;
	text-decoration: underline;
`;

export default function RoomCard({
	created,
	id,
	privacy,
	route,
	children,
	contract,
}: Props): ReactElement {
	const [membersCount, setMemberCount] = useState(0);

	useEffect(() => {
		const getRoomMembers = async () => {
			try {
				const res: RoomMember[] = await contract?.getRoomMembers({
					_roomId: id,
				});
				setMemberCount(res?.length);
			} catch (error) {
				console.log(error);
			}
		};

		getRoomMembers();
	}, [contract, id]);

	return (
		<Wrapper>
			<Flex>
				<div style={{ width: "100%" }}>
					<CardText fontWeight={600} mb="20px" fontSize={18}>
						Room ID: {id}
					</CardText>

					<CardText mb="2px" fontSize={14}>
						Created: {created}
					</CardText>

					<CardText mb="2px" fontSize={14}>
						Privacy: {privacy.toUpperCase()}
					</CardText>

					<CardText mb="17px" fontSize={14}>
						Members: {membersCount}
					</CardText>

					{children && <div style={{ width: "100%" }}>{children}</div>}

					{route && (
						<Flex justifyContent="flex-end">
							<ViewLink to={route}>View Room</ViewLink>
						</Flex>
					)}
				</div>
			</Flex>
		</Wrapper>
	);
}
