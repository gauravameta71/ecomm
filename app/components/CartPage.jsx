import React from "react";

const CartPage = ({ cartItems }) => {
  return (
    <div>
      <h1>Cart Items</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
