import { Container } from "react-bootstrap";
import GlobalState from "./context/globalState";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import * as React from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignupForm from "./pages/SignupForm";
import AddProductForm from "./components/Forms/AddProductForm";
import NavbarHome from "./components/NavbarHome";
import ProductsList from "./components/ProductsList";
import CustomersList from "./components/CustomersList";
import { ShoppingCart } from "./components/ShoppingCart";
import EditProductForm from "./components/Forms/EditProductForm";
import Footer from "./components/Footer";
import OrdersList from "./components/OrdersList";
import EditOrderForm from "./components/Forms/EditOrderForm";
import PageNotFound from "./pages/PageNotFound";
import PageNotFoundIn from "./pages/PageNotFoundIn";
import CheckoutSuccess from "./components/CheckoutSuccess";

function useLocalStorage(key, initial) {
  const [value, setValue] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    }
    // otherwise if not existing in localstarge return the initial value
    return initial;
  });
  // the use effect is here important  to set the updated value whenever there is chenge in vlue as dependency
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}

function App() {
  const [token, setToken] = useLocalStorage("token", "");
  const [role, setRole] = useLocalStorage("role", false);
  const [userId, setUserId] = useLocalStorage("userId", "false");

  const [isOpen, setIsOpen] = React.useState(false);
  const [listItems, setListItems] = React.useState([]);
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  function getItemQuantity(_id) {
    return cartItems.find((item) => item._id === _id)?.quantity || 0;
  }
  function increaseCartQuantity(_id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === _id) == null) {
        return [...currItems, { _id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            console.log(item);
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(_id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === _id)?.quantity === 1) {
        return currItems.filter((item) => item._id !== _id);
      } else {
        return currItems.map((item) => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(_id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id !== _id);
    });
  }

  return (
    <GlobalState.Provider
      value={{
        token,
        setToken,
        role,
        setRole,
        userId,
        setUserId,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        listItems,
        setListItems,
      }}
    >
      {!token ? (
        <>
          <NavbarHome role={role} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <Navbar role={role} />
          <Container>
            <Routes>
              <Route path="/products" element={<ProductsList />} />
              <Route path="/add-product" element={<AddProductForm />} />
              <Route path="/Products/edit" element={<EditProductForm />} />
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/orders/edit" element={<EditOrderForm />} />
              <Route path="/customers" element={<CustomersList />} />
              <Route path="/customers/edit" element={<SignupForm />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              <Route path="*" element={<PageNotFoundIn />} />
            </Routes>
            <ShoppingCart isOpen={isOpen} />
          </Container>
          <Footer />
        </>
      )}
    </GlobalState.Provider>
  );
}

export default App;
