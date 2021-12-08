import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import { theme } from "./config/theme";
import { AppProps } from "./interfaces/IApp.interface";
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
				<Layout currentUser={currentUser} wallet={wallet}>
					<Route exact path="/">
						{!currentUser ? (
							<Redirect to="/login" />
						) : (
							<Profile
								contract={contract}
								currentUser={currentUser}
								nearConfig={nearConfig}
								wallet={wallet}
							/>
						)}
					</Route>
					<Route
						exact
						path="/games/:id"
						render={(props) =>
							currentUser ? (
								<GameView
									{...props}
									contract={contract}
									currentUser={currentUser}
									nearConfig={nearConfig}
									wallet={wallet}
								/>
							) : (
								<Login contract={contract} wallet={wallet} />
							)
						}
					/>
					<Route
						exact
						path="/rooms"
						render={(props) =>
							currentUser ? (
								<Rooms
									{...props}
									contract={contract}
									currentUser={currentUser}
									nearConfig={nearConfig}
									wallet={wallet}
								/>
							) : (
								<Login contract={contract} wallet={wallet} />
							)
						}
					/>
					<Route
						exact
						path="/rooms/:id"
						render={(props) =>
							currentUser ? (
								<RoomView
									{...props}
									contract={contract}
									currentUser={currentUser}
									nearConfig={nearConfig}
									wallet={wallet}
								/>
							) : (
								<Login contract={contract} wallet={wallet} />
							)
						}
					/>
					<Route exact path="/login">
						{currentUser ? (
							<Redirect to="/" />
						) : (
							<Login contract={contract} wallet={wallet} />
						)}
					</Route>
				</Layout>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
