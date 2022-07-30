import React, {Fragment} from "react";
import CartItem from "./CartItem";
import Title from "../Title";
import Button from "../Button";
import {useDispatch, useSelector } from "react-redux";
import { CartIconLine } from "../../icons/icons";
import { clearCart } from "../../appState/cartSlice"; 
import promotions from "../../promotions";

function Cart() {
  const { cartitems, total, amount, currency } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();


  const promoQuantity = promotions.reduce((map, promo) => {
    const conditionsFulfilled = promo.buy.every(mustBuy => {
        const item = cartitems.find(_ => _.id === mustBuy.item);
        return item.amount >= mustBuy.quantity;
    });

    if (conditionsFulfilled) {
        for (const free of promo.get) {
            map.set(free.item, (map.get(free.id) || 0) + free.quantity);
        }
    }

    return map;
}, new Map());

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
      
      { promotions.map(_ => <h3 key={Date().toString()}>{_.description}</h3>)}

      {cartitems.length > 0 ? (
        <Fragment>
          {cartitems.map(({ amount, ...item }) => (
            <CartItem
            key={item.id}
            {...item}
            amount={amount + (promoQuantity.get(item.id) || 0)}
        />
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
