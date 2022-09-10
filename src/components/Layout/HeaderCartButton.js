import React, { useEffect, useState } from "react";
import "./HeaderCartButton.css";
import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const numberOfCartItem = cartCtx.items.reduce((num, item) => {
    return num + item.amount;
  }, 0);
  const { items } = cartCtx;
  const [btnHilight, setbtnHilight] = useState(false);
  const btnclasses = `button ${btnHilight ? "bump" : ""}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setbtnHilight(true);
    const timer = setTimeout(() => {
      setbtnHilight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnclasses} onClick={props.onClick}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfCartItem}</span>
    </button>
  );
}

export default HeaderCartButton;
