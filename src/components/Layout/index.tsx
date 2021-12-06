import { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { AppProps } from "../../interfaces/IApp.interface";
import Sidebar from "./Sidebar";

const Wrapper = styled.div`
	width: 100%;
	display: flex;
`;

const Main = styled.div`
	padding: 22px 40px;
	width: 100%;
`;

const Layout: React.FC<AppProps> = ({ children, wallet }) => {
	const history = useHistory();

	useEffect(() => {
		if (!wallet?.isSignedIn) {
			history.push("/login");
		}
	}, [history, wallet?.isSignedIn]);

	return (
		<Wrapper>
			<Sidebar wallet={wallet} />
			<div style={{ flex: 1 }}>
				<Main>{children}</Main>
			</div>
		</Wrapper>
	);
};

export default Layout;
