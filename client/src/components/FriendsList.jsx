//Improvements: Age Calculation, Overall Cleaner Code, Cascade with SQL, dynamic AddOrUpdate page to cover CREATE and UPDATE routes for friends.
//TODO: Sort Feature on each column

import React, { useEffect, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import FriendFinder from "../API/FriendFinder";
import { FriendsContext } from "../context/FriendsContext";

const FriendsList = () => {
  const {
    friends,
    setFriends,
    filteredFriends,
    setFilteredFriends,
    calcAge,
    deleteFriend,
  } = useContext(FriendsContext);
  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //2 is hardcoded for now until User Auth is implemented
        const response = await FriendFinder.get(`/2`);
        setFriends(response.data.friends);
        setFilteredFriends(response.data.friends);
        //ADD LOGIC TO ELIMINATE USERS FROM friends WHO ARE ALREADY IN priorityFriends
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (friendId) => {
    history.push(`/addOrUpdateFriend/2/Edit/${friendId}`);
  };

  const handleDelete = (friend) => {
    const response = prompt(
      `Are you sure you want to delete ${friend.first_name} ${friend.last_name}?`
    );
    if (response != null) {
      deleteFriend(friend.id);
      //NEED TO FIGURE OUT A PAGE REFRESH
    } else {
      alert(`${friend.first_name} thanks you for sparing them`);
    }
  };

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Age</th>
            <th scope="col">Next Event</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredFriends &&
            filteredFriends.map((friend) => {
              return (
                <tr key={friend.id}>
                  <td>
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(friend.id)}
                      >
                        Edit Friend
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(friend)}
                      >
                        Delete Friend
                      </button>
                    </div>
                  </td>
                  <td className="h4">{friend.first_name}</td>
                  <td className="h4">{friend.last_name}</td>
                  <td className="h4">{calcAge(friend.birthday)}</td>
                  <td className="h4">Mother's Day</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        history.push(`/AddOrUpdateEvent/${friend.id}`)
                      }
                    >
                      Add Event
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FriendsList;
