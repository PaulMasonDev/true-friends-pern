import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router";
import EventFinder from "../API/EventFinder";

import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import { EventsContext } from "../context/EventsContext";

const AddOrUpdateEvent = () => {
  const { eventId, friendId } = useParams();
  const { events } = useContext(EventsContext);

  let result = events.filter((event) => event.id === eventId);

  const [name, setName] = useState(result[0] ? result[0].name : "");
  const [eventDate, setEventDate] = useState(result[0] ? result[0].date : "");
  const [notes, setNotes] = useState(result[0] ? result[0].notes : "");

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        eventDate,
        notes,
      };
      if (eventId) {
        const updatedEvent = await EventFinder.put(`/${eventId}`, data);
        console.log({ updatedEvent });
        alert(
          `${updatedEvent.data.updatedEvent.name} has been updated. SWAL will go here later.`
        );
      } else {
        const newEvent = await EventFinder.post(`${friendId}`, data);
        console.log(newEvent);
      }
      history.goBack();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="form d-flex flex-column align-items-center">
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <label htmlFor="name">Event Name</label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label htmlFor="event-date">Event Date</label>
              <Flatpickr
                className="form-control"
                options={{ dateFormat: "m-d-Y" }}
                value={eventDate}
                onChange={(eventDate) => setEventDate(eventDate)}
              />
            </div>
          </div>
        </div>
        <div className="form-group col-4">
          <label htmlFor="notes">Notes</label>
          <textarea
            className="form-control"
            name="notes"
            id="notes"
            rows="15"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="col-4 form-group">
          <button
            type="submit"
            className="btn btn-warning btn-lg form-control mt-5"
            onClick={handleSubmit}
          >
            {eventId ? "Update Event" : "Add Event"}
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

export default AddOrUpdateEvent;
