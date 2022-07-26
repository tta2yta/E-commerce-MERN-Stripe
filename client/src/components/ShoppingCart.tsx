import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import PayButton from "./PayButton";
import { useEffect } from "react";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, listItems } = useShoppingCart();
  const itemsCheckOut: any = [];

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
                item
                  ? itemsCheckOut.push({ ...item, quantity: cartItem.quantity })
                  : "";
                if (item !== null) {
                  itemsCheckOut.push({ ...item, quantity: cartItem.quantity });
                }
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
