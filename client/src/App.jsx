import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddOrUpdateFriend from "./components/AddOrUpdateFriend";
import AddOrUpdateEvent from "./components/AddOrUpdateEvent";
import Header from "./components/Header";
import { FriendsContextProvider } from "./context/FriendsContext";
import Home from "./routes/Home";
import FriendDetails from "./components/FriendDetails";
import EventDetails from "./components/EventDetails";
import ItemDetails from "./components/ItemDetails";
import { UtilityContextProvider } from "./context/UtilityContext";
import { EventsContextProvider } from "./context/EventsContext";
import AddOrUpdateItem from "./components/AddOrUpdateItem";
import { ItemsContextProvider } from "./context/ItemsContext";

const App = () => {
  return (
    <UtilityContextProvider>
      <FriendsContextProvider>
        <EventsContextProvider>
          <ItemsContextProvider>
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
                    path="/addOrUpdateEvent/:friendId"
                    component={AddOrUpdateEvent}
                  />

                  <Route
                    exact
                    path="/addOrUpdateFriend/:id/Edit/:friendId"
                    component={AddOrUpdateFriend}
                  />

                  <Route
                    exact
                    path="/addOrUpdateEvent/:eventId/Edit/"
                    component={AddOrUpdateEvent}
                  />

                  <Route
                    exact
                    path="/addOrUpdateItem/:eventId"
                    component={AddOrUpdateItem}
                  />

                  <Route
                    exact
                    path="/addOrUpdateItem/:itemId/Edit/"
                    component={AddOrUpdateItem}
                  />

                  <Route
                    exact
                    path="/Friend/:friendId"
                    component={FriendDetails}
                  />

                  <Route
                    exact
                    path="/Event/:eventId"
                    component={EventDetails}
                  />

                  <Route exact path="/Item/:itemId" component={ItemDetails} />
                </Switch>
              </Router>
            </div>
          </ItemsContextProvider>
        </EventsContextProvider>
      </FriendsContextProvider>
    </UtilityContextProvider>
  );
};

export default App;
