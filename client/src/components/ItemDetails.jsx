import React, { useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";

const ItemDetails = () => {
  const { selectedItem } = useContext(ItemsContext);

  const amazonUrl = "https://www.amazon.com/s?k=";
  const amazon = selectedItem.name
    ? `Find ${selectedItem.name} on Amazon.com`
    : "";

  const walmartUrl = "https://www.walmart.com/search/?query=";
  const walmart = selectedItem.name
    ? `Find ${selectedItem.name} on Walmart.com`
    : "";

  const targetUrl = "https://www.target.com/s?searchTerm=";
  const target = selectedItem.name
    ? `Find ${selectedItem.name} on Target.com`
    : "";

  return (
    <div className="container text-center mt-5">
      <h1 className="h1">{selectedItem.name}</h1>
      <p>{selectedItem.description}</p>
      <h2>Shopping Links</h2>

      <p>
        <a
          href={`${amazonUrl}${selectedItem.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {amazon}
        </a>
      </p>
      <p>
        <a
          href={`${walmartUrl}${selectedItem.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {walmart}
        </a>
      </p>
      <p>
        <a
          href={`${targetUrl}${selectedItem.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {target}
        </a>
      </p>
    </div>
  );
};

export default ItemDetails;
