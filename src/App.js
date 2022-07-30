import { Navbar, Cart, Tilte } from "./components";
import React from "react";
import "./SCSS/index.scss";
import { useSelector, useDispatch } from "react-redux";
import { itemesAmount, fetchCartItems} from "./appState/cartSlice";





function App() {
  //useSelector is a hook that allows us to access the state of the store
  const { cartitems,isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(itemesAmount());

  }, [cartitems])

  React.useEffect(() => {
    dispatch(fetchCartItems());
  }, [])

  if (isLoading) {
    return <h1>loading...</h1>
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className="App">
        <Cart />
      </div>
    </React.Fragment>
  );
}

export default App;
