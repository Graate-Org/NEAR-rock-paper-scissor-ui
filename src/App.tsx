import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Redirect } from "react-router-dom";
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
	console.log(contract, currentUser, nearConfig, wallet);

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Layout>
					<Route exact path="/">
						{!currentUser ? <Redirect to="/login" /> : <Profile />}
					</Route>
					<Route exact path="/games" component={Games} />
					<Route
						exact
						path="/games"
						render={(props) => (
							<Games
								{...props}
								contract={contract}
								currentUser={currentUser}
								wallet={wallet}
							/>
						)}
					/>
					<Route exact path="/games/:id" component={GameView} />
					<Route exact path="/rooms" component={Rooms} />
					<Route exact path="/rooms/:id" component={RoomView} />
					<Route exact path="/login">
						{currentUser ? <Redirect to="/" /> : <Login />}
					</Route>
				</Layout>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
