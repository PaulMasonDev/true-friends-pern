import React, { useState, createContext } from "react";
import FriendFinder from "../API/FriendFinder";

export const FriendsContext = createContext();

export const FriendsContextProvider = (props) => {
  const [friends, setFriends] = useState([]);

  const [selectedFriend, setSelectedFriend] = useState(null);

  const [filteredFriends, setFilteredFriends] = useState([]);

  const addFriends = (friend) => {
    setFriends([...friends, friend]);
  };

  const deleteFriend = async (friendId) => {
    const deletedFriend = await FriendFinder.delete(`/${friendId}`);
    console.log(deletedFriend);
  };

  const calcAge = (birthday) => {
    const birthdate = new Date(birthday);
    const ageDifMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const calcDatePriority = (date) => {
    const dateNow = new Date();
    const birthdate = new Date(date);

    const nextBirthday = new Date(
      dateNow.getFullYear(),
      birthdate.getMonth(),
      birthdate.getDate()
    );

    const nowInMs = dateNow.getTime();
    const nextBirthdayInMs = nextBirthday.getTime();

    const days = 30;
    //There are 86,400,000 milliseconds in 1 day
    const filterDateRange = 86400000 * days;

    const dateDiff = nextBirthdayInMs - nowInMs;

    console.log({
      date,
      dateNow,
      birthdate,
      nextBirthday,
      nowInMs,
      nextBirthdayInMs,
      filterDateRange,
      dateDiff,
    });

    if (dateDiff < filterDateRange && dateDiff > 0) {
      return true;
    }
    return false;
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
        calcAge,
        calcDatePriority,
        addFriends,
        deleteFriend,
      }}
    >
      {props.children}
    </FriendsContext.Provider>
  );
};
