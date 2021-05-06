import React, { useState, createContext } from "react";
import FriendFinder from "../API/FriendFinder";

export const FriendsContext = createContext();

export const FriendsContextProvider = (props) => {
  const [friends, setFriends] = useState([]);
  const [events, setEvents] = useState([]);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [filteredFriends, setFilteredFriends] = useState([]);

  const addFriends = (friend) => {
    setFriends([...friends, friend]);
  };

  const addEvents = (event) => {
    setEvents([...events, event]);
  };

  const deleteFriend = async (friendId) => {
    const deletedFriend = await FriendFinder.delete(`/${friendId}`);
    console.log(deletedFriend);
  };

  return (
    <FriendsContext.Provider
      value={{
        friends,
        setFriends,
        filteredFriends,
        setFilteredFriends,
        selectedFriend,
        setSelectedFriend,
        addFriends,
        addEvents,
        setEvents,
        events,
        deleteFriend,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      {props.children}
    </FriendsContext.Provider>
  );
};
