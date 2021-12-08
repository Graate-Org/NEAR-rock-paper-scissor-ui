import styled, { css } from "styled-components";
import {
	Link,
	RouteComponentProps,
	useLocation,
	withRouter,
} from "react-router-dom";
import { LogoutIcon, ProfileIcon, RoomIcon } from "../../icons";
import Text from "../Text";
import { AppProps } from "../../interfaces/IApp.interface";

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

const linkStyles = css`
	padding: 10px;
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

const NavLink = styled(Link)<{ activepath?: string }>`
	${linkStyles};
	background: rgba(
		36,
		43,
		66,
		${({ activepath }) => (activepath === "true" ? 1 : 0)}
	);
`;

const LogoutButton = styled.p`
	${linkStyles};
	cursor: pointer;
	background: rgba(36, 43, 66, 0);
`;

interface SidebarProps extends AppProps, RouteComponentProps {}

const Sidebar: React.FC<SidebarProps> = ({ wallet }) => {
	const { pathname } = useLocation();

	const handleLogout = () => {
		if (wallet?.signOut) {
			wallet.signOut();
			window.location.replace(
				window.location.origin + window.location.pathname
			);
		}
	};

	return (
		<>
			{pathname !== "/login" && (
				<Wrapper>
					<Inner>
						<NavLink activepath={(pathname === "/").toString()} to="/">
							<ProfileIcon />
							<Text fontWeight={500}>Profile</Text>
						</NavLink>
						<NavLink
							activepath={(pathname.split("/")[1] === "rooms").toString()}
							to="/rooms"
						>
							<RoomIcon />
							<Text fontWeight={500}>Rooms</Text>
						</NavLink>
						<LogoutButton role="button" onClick={handleLogout}>
							<LogoutIcon />
							<Text fontWeight={500}>Log Out</Text>
						</LogoutButton>
					</Inner>
				</Wrapper>
			)}
		</>
	);
};

export default withRouter(Sidebar);
