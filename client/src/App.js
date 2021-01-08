import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import AppNavbar from "./components/AppNavbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import PostList from "./components/PostList";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <PostList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
