import React, { ReactElement } from "react";
import styled from "styled-components";
import { Link, useLocation, withRouter } from "react-router-dom";
import { GameIcon, LogoutIcon, ProfileIcon, RoomIcon } from "../../icons";
import Text from "../Text";

const Wrapper = styled.div`
  width: 220px;
`;

const Inner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  background: #1a2036;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 10px;
`;

const NavLink = styled(Link)<{ activepath?: string }>`
  padding: 10px;
  background: rgba(36, 43, 66, ${({ activepath }) => (activepath === "true" ? 1 : 0)});
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  margin-bottom: 15px;
  display: flex;
  text-decoration: none;
  :last-child {
    margin-bottom: 0px;
  }
  svg {
    margin-right: 8px;
  }
`;

function Sidebar(): ReactElement {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/login" && (
        <Wrapper>
          <Inner>
            <NavLink activepath={(pathname === "/").toString()} to="/">
              <ProfileIcon />
              <Text fontWeight={500}>Profile</Text>
            </NavLink>
            <NavLink activepath={(pathname.split("/")[1] === "games").toString()} to="/games">
              <GameIcon />
              <Text fontWeight={500}>Games</Text>
            </NavLink>
            <NavLink activepath={(pathname.split("/")[1] === "rooms").toString()} to="/rooms">
              <RoomIcon />
              <Text fontWeight={500}>Rooms</Text>
            </NavLink>
            <NavLink to="/login">
              <LogoutIcon />
              <Text fontWeight={500}>Log Out</Text>
            </NavLink>
          </Inner>
        </Wrapper>
      )}
    </>
  );
}

export default withRouter(Sidebar);
