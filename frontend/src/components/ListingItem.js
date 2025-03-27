import React from "react";
import { useSelector } from "react-redux";

const ListingItem = ({ title, price, image }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", borderRadius: "5px" }}>
      <img
        src={`http://localhost:5000/${image}`} // Use the full URL to the image
        alt={title}
        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
      />
      <h3>{title}</h3>
      <p>💰 Prix: {price}€</p>
    </div>
  );
};

export default ListingItem;
