import axios from "axios";
import { useEffect } from "react";

type payButtonProps = {
  cartItems: any;
  itemsCheckOut: any;
};

const PayButton = ({ cartItems, itemsCheckOut }: payButtonProps) => {
  //   const user = useSelector((state) => state.auth);
  const url = "http://localhost:3001/api";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDk4MmFmMzNhY2QyNmUwMGFhZWMxYyIsInJvbGUiOiJidXllciIsInVzZXJuYW1lIjoidGVkIiwiaWF0IjoxNjU4NTI1MzAyfQ.QBzSZApCko4Ty6NRX68nxuJ8j2sx7HtkRmYzAK1MJDU";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleCheckout = () => {
    axios
      .post(
        `${url}/stripe/create-checkout-session`,
        {
          itemsCheckOut,
          // userId: user._id,
        },
        config
      )
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
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
