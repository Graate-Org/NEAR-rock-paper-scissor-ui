import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Flex from "../Flex";
import Text from "../Text";

interface Props {
  privacy: "public" | "private";
  id: string;
  created: string;
  membersCount: number;
  route: string;
  children?: React.ReactNode;
}

const Wrapper = styled.div`
  background-color: #2e3650;
  background-image: url('./room-bg.svg');
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

export default function GameCard({ created, membersCount, id, privacy, route, children }: Props): ReactElement {
  return (
    <Wrapper>
      <Flex>
        <div style={{ width: "100%" }}>
          <CardText fontWeight={600} mb="20px" fontSize={18}>
            Room ID: {id}
          </CardText>

          <CardText mb="17px" fontSize={14}>
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
              <ViewLink to={route}>View details</ViewLink>
            </Flex>
          )}
        </div>
      </Flex>
    </Wrapper>
  );
}
