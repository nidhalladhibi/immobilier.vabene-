import React from "react";

const ListingItemOwner = ({ _id, title, price, image, onEdit, onDelete }) => {
  console.log("image url", image)
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", borderRadius: "5px" }}>
      <img
        src={`http://localhost:5000/${image}`} // Use the full URL to the image
        alt={title}
        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
      />
      <h3>{title}</h3>
      <p>💰 Prix: {price}€</p>
      <div>
        <button onClick={() => onEdit(_id)} style={{ padding: "5px", margin: "5px" }}>
          Modifier
        </button>
        <button onClick={() => onDelete(_id)} style={{ padding: "5px", margin: "5px" }}>
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default ListingItemOwner;