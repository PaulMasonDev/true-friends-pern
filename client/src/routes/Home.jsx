import React from "react";
import FriendsList from "../components/FriendsList";

import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div>
      <div className="container mt-5">
        <SearchBar />
        <FriendsList />
      </div>
    </div>
  );
};

export default Home;
