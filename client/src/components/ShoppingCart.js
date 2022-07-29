import { Offcanvas, Stack } from "react-bootstrap";
import GlobalState from "../context/globalState";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { useContext } from "react";
import PayButton from "./PayButton";

export function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems, listItems, userId } = useContext(GlobalState);
  const itemsCheckOut = [];

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item._id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = listItems.find((i) => i._id === cartItem._id);
                if (item !== null) {
                  itemsCheckOut.push({
                    ...item,
                    quantity: cartItem.quantity,
                    userId,
                  });
                }
                console.log(itemsCheckOut);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
          <div className="checkout">
            <PayButton cartItems={cartItems} itemsCheckOut={itemsCheckOut} />
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
