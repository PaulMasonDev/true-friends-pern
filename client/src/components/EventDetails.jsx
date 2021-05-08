import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ItemFinder from "../API/ItemFinder";
import { FriendsContext } from "../context/FriendsContext";
import { UtilityContext } from "../context/UtilityContext";
import { EventsContext } from "../context/EventsContext";
import { ItemsContext } from "../context/ItemsContext";

const EventDetail = () => {
  const { eventId } = useParams();
  let history = useHistory();
  const { selectedFriend } = useContext(FriendsContext);
  const { events, setEvents, selectedEvent, setSelectedEvent } = useContext(
    EventsContext
  );
  const { items, setItems, deleteItem, setSelectedItem } = useContext(
    ItemsContext
  );
  const { calcEnding } = useContext(UtilityContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await ItemFinder.get(`/${eventId}`);
        setItems(items.data.foundItems);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
    const eventToSet = events.filter((event) => event.id === eventId);

    setSelectedEvent(eventToSet[0]);
  }, [eventId, events, setEvents]);

  const handleEdit = (e, itemId) => {
    e.stopPropagation();
    history.push(`/AddOrUpdateItem/${itemId}/Edit`);
  };

  const handleDelete = (e, item) => {
    e.stopPropagation();
    const response = prompt(`Are you sure you want to delete ${item.name}?`);
    if (response != null) {
      deleteItem(item.id);
      //NEED TO FIGURE OUT A PAGE REFRESH
    } else {
      alert(`${item.name} thanks you for sparing them`);
    }
  };

  const handleAddItem = (e, eventId) => {
    e.stopPropagation();
    history.push(`/AddOrUpdateItem/${eventId}`);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    history.push(`/item/${item.id}`);
  };

  return (
    <div className="container mt-5">
      {selectedEvent ? (
        <>
          <h1 className="text-center">
            {selectedFriend.first_name}
            {selectedFriend.first_name &&
              calcEnding(selectedFriend.first_name)}{" "}
            {selectedEvent.name} List of Items
          </h1>
        </>
      ) : null}
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-lg btn-success"
          onClick={(e) => handleAddItem(e, selectedEvent.id)}
        >
          Add Item
        </button>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Item Name</th>
            <th scope="col">Description</th>
            <th scope="col">Purchased?</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item) => {
              return (
                <tr key={item.id} onClick={() => handleItemClick(item)}>
                  <td>
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-warning"
                        onClick={(e) => handleEdit(e, item.id)}
                      >
                        Edit item
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDelete(e, item)}
                      >
                        Delete item
                      </button>
                    </div>
                  </td>
                  <td className="h4">{item.name}</td>
                  <td className="h4">{item.description}</td>
                  <td className="h6">{item.ispurchased}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EventDetail;
