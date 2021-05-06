//Improvements: Age Calculation, Overall Cleaner Code, Cascade with SQL, dynamic AddOrUpdate page to cover CREATE and UPDATE routes for friends.
//TODO: Sort Feature on each column

import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import FriendFinder from "../API/FriendFinder";
import { FriendsContext } from "../context/FriendsContext";
import { UtilityContext } from "../context/UtilityContext";

const FriendsList = () => {
  const {
    setFriends,
    filteredFriends,
    setFilteredFriends,
    deleteFriend,
  } = useContext(FriendsContext);

  const { calcAge } = useContext(UtilityContext);

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
  }, [setFilteredFriends, setFriends]);

  const handleEdit = (e, friendId) => {
    e.stopPropagation();
    //NEED TO CHANGE THE 2 WHEN AUTH IS IMPLEMENTED
    history.push(`/addOrUpdateFriend/2/Edit/${friendId}`);
  };

  const handleDelete = (e, friend) => {
    e.stopPropagation();
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

  const handleAddEvent = (e, friendId) => {
    e.stopPropagation();
    history.push(`/AddOrUpdateEvent/${friendId}`);
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
                <tr
                  key={friend.id}
                  onClick={() => history.push(`/friend/${friend.id}`)}
                >
                  <td>
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-warning"
                        onClick={(e) => handleEdit(e, friend.id)}
                      >
                        Edit Friend
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDelete(e, friend)}
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
                      onClick={(e) => handleAddEvent(e, friend.id)}
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
