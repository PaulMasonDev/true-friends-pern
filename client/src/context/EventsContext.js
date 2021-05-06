import React, { useState, createContext } from "react";
import { useHistory } from "react-router";
import EventFinder from "../API/EventFinder";

export const EventsContext = createContext();

export const EventsContextProvider = (props) => {
  let history = useHistory();
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const addEvents = (event) => {
    setEvents([...events, event]);
  };

  const deleteEvent = async (eventId) => {
    const deletedEvent = await EventFinder.delete(`/${eventId}`);
    console.log(deletedEvent);
  };

  return (
    <EventsContext.Provider
      value={{
        addEvents,

        setEvents,
        events,
        selectedEvent,
        setSelectedEvent,
        deleteEvent,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
