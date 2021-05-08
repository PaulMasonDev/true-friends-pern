import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router";
import ItemFinder from "../API/ItemFinder";

import { ItemsContext } from "../context/ItemsContext";

const AddOrUpdateItem = () => {
  const { itemId, eventId } = useParams();
  console.log({ itemId, eventId });
  const { items } = useContext(ItemsContext);

  let result = items.filter((item) => item.id === itemId);

  const [name, setName] = useState(result[0] ? result[0].name : "");
  const [description, setDescription] = useState(
    result[0] ? result[0].description : ""
  );
  const [isPurchased, setIsPurchased] = useState(
    result[0] ? (result[0].ispurchased === true ? "yes" : "no") : "Purchased?"
  );

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        description,
        isPurchased,
      };
      if (itemId) {
        const updatedItem = await ItemFinder.put(`/${itemId}`, data);
        console.log({ updatedItem });
        alert(
          `${updatedItem.data.updatedItem.name} has been updated. SWAL will go here later.`
        );
      } else {
        const newItem = await ItemFinder.post(`${eventId}`, data);
        console.log(newItem);
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
          <div className="row">
            <div className="col-6">
              <label htmlFor="name">Item Name</label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label htmlFor="is-purchased">Is Purchased</label>
              <select
                id="is-purchased"
                className="form-control"
                value={isPurchased}
                onChange={(e) => setIsPurchased(e.target.value)}
              >
                <option disabled>Purchased?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group col-4">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            rows="15"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="col-4 form-group">
          <button
            type="submit"
            className="btn btn-warning btn-lg form-control mt-2"
            onClick={handleSubmit}
          >
            {itemId ? "Update Item" : "Add Item"}
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

export default AddOrUpdateItem;
