import React from "react";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const orderHandler = () => {
    setIsCheckou(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-dcd83-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItem: cartCtx.items }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-close"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItem && (
        <button className={classes["button-order"]} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModelContent = (
    <div>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && modalActions}
    </div>
  );
  const isSubmittingModelContent = <p>Sending Oder...</p>;
  const didSubmitModelContent = (
    <div>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button classname={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </div>
  );
  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModelContent}
      {isSubmitting && isSubmittingModelContent}
      {!isSubmitting && didSubmit && didSubmitModelContent}
    </Modal>
  );
}

export default Cart;
