import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CardProvider from "./store/CardProvider";

function App() {
  const [cartIsShown, setcartIsShown] = useState(false);
  const showCartHandler = () => {
    setcartIsShown(true);
  };
  const hideCartHandler = () => {
    setcartIsShown(false);
  };
  return (
    <CardProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CardProvider>
  );
}

export default App;
