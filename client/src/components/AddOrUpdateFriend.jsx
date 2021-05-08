import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router";
import FriendFinder from "../API/FriendFinder";
import { FriendsContext } from "../context/FriendsContext";

import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";

const AddOrUpdateFriend = () => {
  const { id, friendId } = useParams();
  const { friends } = useContext(FriendsContext);
  console.log({ id, friendId });

  let result = {};

  if (friendId) {
    result = friends.filter((friend) => friend.id === friendId);
  }
  console.log(result[0]);

  const [firstName, setFirstName] = useState(
    result[0] ? result[0].first_name : ""
  );
  const [lastName, setLastName] = useState(
    result[0] ? result[0].last_name : ""
  );
  const [gender, setGender] = useState(
    result[0] ? result[0].gender : "Select a Gender"
  );
  const [birthday, setBirthday] = useState(
    result[0] ? result[0].birthday : new Date()
  );
  const [isMother, setIsMother] = useState(
    result[0] ? (result[0].ismother === true ? "yes" : "no") : "no"
  );
  const [isFather, setIsFather] = useState(
    result[0] ? (result[0].isfather === true ? "yes" : "no") : "no"
  );

  const { addFriends } = useContext(FriendsContext);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        firstName,
        lastName,
        gender,
        birthday,
        isMother: isMother === "yes" ? true : false,
        isFather: isFather === "yes" ? true : false,
      };

      if (friendId) {
        const updatedFriend = await FriendFinder.put(`/2/${friendId}`, data);
        console.log({ updatedFriend });
        alert(
          `${updatedFriend.data.updatedFriend.first_name} has been updated. SWAL will go here later.`
        );
      } else {
        //Replace 2 with AUTH logic
        const newFriend = await FriendFinder.post(`/2`, data);
        addFriends(newFriend.data.newFriend);
      }
      history.goBack();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="form d-flex flex-column align-items-center">
        <div className="form-group col-4">
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group col-4">
          <div className="row">
            <div className="col-6">
              <label htmlFor="gender">Gender</label>

              <select
                id="gender"
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled>Select a Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-Binary</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="birthday">Birthday</label>

              <Flatpickr
                className="form-control"
                options={{ dateFormat: "m-d-Y" }}
                value={birthday}
                onChange={(birthday) => setBirthday(birthday)}
              />
            </div>
          </div>
        </div>
        <div className="col-4 form-group">
          <div className="row">
            <div className="col-6">
              <label htmlFor="mother">Are they a mother?</label>
              <select
                name="mother"
                id="mother"
                className="form-control"
                value={isMother}
                onChange={(e) => setIsMother(e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="father">Are they a father?</label>
              <select
                name="father"
                id="father"
                className="form-control"
                value={isFather}
                onChange={(e) => setIsFather(e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-4 form-group">
          <button
            type="submit"
            className="btn btn-warning btn-lg form-control mt-5"
            onClick={handleSubmit}
          >
            {friendId ? "Update Friend" : "Add Friend"}
          </button>
        </div>
        <div className="col-4 form-group">
          <button
            className="btn btn-info btn-lg form-control mt-2"
            onClick={() => history.goBack()}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrUpdateFriend;
