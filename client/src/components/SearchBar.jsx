import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FriendsContext } from "../context/FriendsContext";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { friends, setFilteredFriends } = useContext(FriendsContext);
  let history = useHistory();
  useEffect(() => {
    setSearchValue("");
  }, []);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);
    //add Next event column to this filter
    const filteredFriends = friends.filter(
      (friend) =>
        friend.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        friend.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFriends(filteredFriends);
  };

  const handleClick = () => {
    history.push("/addOrUpdateFriend/2");
  };

  return (
    <div className="container">
      <div className="text-center mb-5 d-flex justify-content-evenly align-items-center form-group">
        <label htmlFor="search" className="display-6">
          Search Name
        </label>
        <input
          id="search"
          type="search"
          className="display-6"
          value={searchValue}
          onChange={handleChange}
        />
        <button className="btn btn-primary btn-lg" onClick={handleClick}>
          Add Friend
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
