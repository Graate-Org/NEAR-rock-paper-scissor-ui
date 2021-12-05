import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import { theme } from "./config/theme";
import { AppProps } from "./interfaces/IApp.interface";
import Games from "./views/Games";
import GameView from "./views/GameView";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Rooms from "./views/Rooms";
import RoomView from "./views/Rooms/RoomView";

const App: React.FC<AppProps> = ({
	contract,
	currentUser,
	nearConfig,
	wallet,
}) => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Layout>
					<Route exact path="/" component={Profile} />
					<Route exact path="/games" component={Games} />
					<Route exact path="/games/:id" component={GameView} />
					<Route exact path="/rooms" component={Rooms} />
					<Route exact path="/rooms/:id" component={RoomView} />
					<Route exact path="/login" component={Login} />
				</Layout>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
