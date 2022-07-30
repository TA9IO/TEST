import React, { Fragment } from "react";
import Title from "../Title";
import { CartIcon, ChevronUp, ChevronDown, Delete } from "../../icons/icons";
import { useDispatch } from "react-redux";
import {
  removeItem,
  decreaseAmount,
  increaseAmount,
} from "../../appState/cartSlice";
function CartItem({ currency, id, title, price, description, img, amount }) {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <div className="left-side">
        <div className="img-wrapper">
          <img src={img} alt={title} />
        </div>
        <div className="item-details">
          <Title size={"title-medium"}>{title}</Title>
          <p>{description}</p>
        </div>
      </div>
      <div className="right-side">
        <div className="amount-container">
          <ChevronDown
            onClick={() => {
              dispatch(decreaseAmount(id));
            }}
          />

          <p className="amount">{amount}</p>
          <ChevronUp
            onClick={() => {
              dispatch(increaseAmount(id));
            }}
          />
        </div>
        <div className="price-container">
          <p className="price">
            {parseFloat(price).toFixed(2)}
            {currency}
          </p>
        </div>
        <div
          className="delete-container"
          onClick={() => {
            dispatch(removeItem(id));
          }}
        >
          <Delete />
        </div>
      </div>
    </article>
  );
}

export default CartItem;
