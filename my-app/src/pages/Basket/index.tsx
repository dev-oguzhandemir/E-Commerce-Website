import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { clearCart, decrementQuantity, incrementQuantity } from "./slice";
import "./style.css";

const Basket = () => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state: RootState) => state.basket.cartItems);

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    alert("Satın alma işlemi tamamlandı!");
    dispatch(clearCart());
  };

  const calculateTotalPrice = () => {
    return card
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="basket-container">
      <h2 className="basket-title">Sepetim</h2>
      <ul className="basket-list">
        {card.map((item) => (
          <li className="basket-item" key={item.id}>
            <div>
              <p>{item.name}</p>
              <p>Ücret: {item.price}₺</p>
              <p>Adet: {item.quantity}</p>
            </div>
            <div className="basket-item-buttons">
              <button
                className="basket-item-button"
                onClick={() => handleIncrement(item.id)}
              >
                +
              </button>
              <button
                className="basket-item-button"
                onClick={() => handleDecrement(item.id)}
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="basket-total">Toplam ücret: {calculateTotalPrice()}₺</h3>
      <div className="basket-actions">
        <button onClick={handleClearCart}>Sepeti Temizle</button>
        <button onClick={handleCheckout} disabled={card.length === 0}>
          Satın Al
        </button>
      </div>
    </div>
  );
};

export default Basket;
