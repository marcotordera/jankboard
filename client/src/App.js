import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import AppNavbar from "./components/AppNavbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import PostList from "./components/PostList";
import About from "./components/About";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Switch>
        {/*  */}
        <Provider store={store}>
          <AppNavbar />
          <Route path="/board">
            <Container>
              <PostList />
            </Container>
          </Route>
          {/*  */}
          <Route exact path="/">
            <Container>
              <About />
            </Container>
          </Route>
          {/*  */}
        </Provider>
      </Switch>
    </Router>
  );
}

export default App;
