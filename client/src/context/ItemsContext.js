import React, { useState, createContext } from "react";
import { useHistory } from "react-router";
import ItemFinder from "../API/ItemFinder";

export const ItemsContext = createContext();

export const ItemsContextProvider = (props) => {
  let history = useHistory();
  const [items, setItems] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const addItems = (item) => {
    setItems([...items, item]);
  };

  const deleteItem = async (itemId) => {
    const deletedItem = await ItemFinder.delete(`/${itemId}`);
    console.log(deletedItem);
  };

  return (
    <ItemsContext.Provider
      value={{
        addItems,
        setItems,
        items,
        selectedItem,
        setSelectedItem,
        deleteItem,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};
