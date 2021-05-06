import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddOrUpdateFriend from "./components/AddOrUpdateFriend";
import AddOrUpdateEvent from "./components/AddOrUpdateEvent";
import Header from "./components/Header";
import { FriendsContextProvider } from "./context/FriendsContext";
import Home from "./routes/Home";

const App = () => {
  return (
    <FriendsContextProvider>
      <div className="container">
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              exact
              path="/addOrUpdateFriend/:id"
              component={AddOrUpdateFriend}
            />

            <Route
              exact
              path="/addOrUpdateEvent/:id"
              component={AddOrUpdateEvent}
            />

            <Route
              exact
              path="/addOrUpdateFriend/:id/Edit/:friendId"
              component={AddOrUpdateFriend}
            />

            <Route
              exact
              path="/addOrUpdateFriend/:id/Edit/:friendId"
              component={AddOrUpdateEvent}
            />
          </Switch>
        </Router>
      </div>
    </FriendsContextProvider>
  );
};

export default App;
