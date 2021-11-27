import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import { theme } from "./config/theme";
import Games from "./views/Games";
import GameView from "./views/GameView";
import Profile from "./views/Profile";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout>
          <Route exact path="/" component={Profile} />
          <Route exact path="/games" component={Games} />
          <Route exact path="/games/:id" component={GameView} />
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
