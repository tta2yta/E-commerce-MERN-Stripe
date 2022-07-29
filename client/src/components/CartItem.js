import { Button, Stack } from "react-bootstrap";
import { useContext } from "react";
import GlobalState from "../context/globalState";
import { formatCurrency } from "../utilities/formatCurrency";

export function CartItem({ _id, quantity }) {
  const { listItems, removeFromCart } = useContext(GlobalState);
  const item = listItems.find((i) => i._id === _id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.productImage}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt="Product-Img"
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item._id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
