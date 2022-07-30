import React, {Fragment} from "react";
import CartItem from "./CartItem";
import Title from "../Title";
import Button from "../Button";
import {useDispatch, useSelector } from "react-redux";
import { CartIconLine } from "../../icons/icons";
import { clearCart } from "../../appState/cartSlice"; 

function Cart() {
  const { cartitems, total, amount, currency } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  return (
    <section className="cart-container">
      <div className="title-container">
        <Title
          Titlestyle="title-shadow-2"
          title={"YOUR CART :)"}
          titleColor={"title-color-black"}
          size={"title-large"}
        />
        <CartIconLine />
      </div>
      {cartitems.length > 0 ? (
        <Fragment>
          {cartitems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          {/* <-- crat footer -->*/}
          <footer className="cart-footer">
            <div className="subtotal">
              <p>Subtotal: </p>
              <p>{total}&pound;</p>
            </div>
            <div className="discount">
              <p>Discount: </p>
              <p>{total}&pound;</p>
            </div>
            <div className="total">
              <p>Total: </p>
              <p>{total}&pound;</p>
            </div>
            <Button text={"clear Cart!"} handleClick={() => {dispatch(clearCart())}}></Button>
          </footer>
        </Fragment>
      ) : (
        <div>
          cart is empty
          <img
            src="https://c.tenor.com/wKlhaRMgF-kAAAAM/malta-malta-gifs.gif"
            alt="empty"
          />
        </div>
      )}
    </section>
  );
}

export default Cart;
