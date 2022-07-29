import axios from "axios";
import { useEffect, useContext } from "react";
import GlobalState from "../context/globalState";

const PayButton = ({ cartItems, itemsCheckOut }) => {
  //   const user = useSelector((state) => state.auth);
  const { token } = useContext(GlobalState);
  const url = "http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleCheckout = () => {
    axios
      .post(
        `${url}/stripe/create-checkout-session`,
        {
          itemsCheckOut,
        },
        config
      )
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
          localStorage.removeItem("shopping-cart");
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    console.log("itemsCheckOut", itemsCheckOut);
  }, []);

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};
export default PayButton;
