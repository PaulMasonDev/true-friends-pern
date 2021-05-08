import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import EventFinder from "../API/EventFinder";
import { FriendsContext } from "../context/FriendsContext";
import { UtilityContext } from "../context/UtilityContext";
import { EventsContext } from "../context/EventsContext";

const FriendDetail = () => {
  const [friend, setFriend] = useState({});
  const { friendId } = useParams();
  let history = useHistory();
  const { friends, selectedFriend, setSelectedFriend } = useContext(
    FriendsContext
  );
  const { events, setEvents, deleteEvent, setSelectedEvent } = useContext(
    EventsContext
  );
  const {
    displayFriendlyDate,
    calcEnding,
    displayPronoun,
    daysUntilEvent,
    getNextBirthday,
  } = useContext(UtilityContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await EventFinder.get(`/${friendId}`);
        setEvents(events.data.foundEvents);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
    const friendToSet = friends.filter((friend) => friend.id === friendId);

    setSelectedFriend(friendToSet[0]);
  }, [friendId, friend, friends, setEvents]);

  const handleEdit = (e, eventId) => {
    e.stopPropagation();
    history.push(`/AddOrUpdateEvent/${eventId}/Edit`);
  };

  const handleDelete = (e, event) => {
    e.stopPropagation();
    const response = prompt(`Are you sure you want to delete ${event.name}?`);
    if (response != null) {
      deleteEvent(event.id);
      //NEED TO FIGURE OUT A PAGE REFRESH
    } else {
      alert(`${event.name} thanks you for sparing them`);
    }
  };

  const handleAddEvent = (e, friendId) => {
    e.stopPropagation();
    history.push(`/AddOrUpdateEvent/${friendId}`);
  };

  const handleAddItem = (e, eventId) => {
    e.stopPropagation();
    history.push(`/addOrUpdateItem/${eventId}`);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    history.push(`/event/${event.id}`);
  };

  return (
    <div className="container mt-5">
      {selectedFriend ? (
        <>
          <h1 className="text-center">
            {selectedFriend.first_name}
            {selectedFriend.first_name &&
              calcEnding(selectedFriend.first_name)}{" "}
            Upcoming Events
          </h1>
          <p className="display-6 text-center">
            {selectedFriend.gender && displayPronoun(selectedFriend.gender)}{" "}
            birthday is coming up in{" "}
            {selectedFriend.birthday &&
              daysUntilEvent(getNextBirthday(selectedFriend.birthday))}
            {" days "}
            on{" "}
            {selectedFriend.birthday &&
              getNextBirthday(selectedFriend.birthday)}
          </p>
        </>
      ) : null}
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-lg btn-success"
          onClick={(e) => handleAddEvent(e, selectedFriend.id)}
        >
          Add Event
        </button>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Event Name</th>
            <th scope="col">Event Date</th>
            <th scope="col">Notes</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event) => {
              return (
                <tr key={event.id} onClick={() => handleEventClick(event)}>
                  <td>
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-warning"
                        onClick={(e) => handleEdit(e, event.id)}
                      >
                        Edit event
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDelete(e, event)}
                      >
                        Delete event
                      </button>
                    </div>
                  </td>
                  <td className="h4">{event.name}</td>
                  <td className="h4">{displayFriendlyDate(event.date)}</td>
                  <td className="h6">{event.notes}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={(e) => handleAddItem(e, event.id)}
                    >
                      Add Item
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

export default FriendDetail;
