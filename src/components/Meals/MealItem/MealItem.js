import React from "react";
import "./MealItem.css";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import MealItemForm from "../MealItemForm";
function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price}`;
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <div className="description">{props.description}</div>
        <div className="price">{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
