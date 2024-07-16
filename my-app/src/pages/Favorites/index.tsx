import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Button, Card } from "react-bootstrap";
import { addFavorite, removeFavorite } from "./slice";
import { addItem } from "../Basket/slice";
import "./style.css"; // Import the CSS file
import {
  truncateDescriptiont,
  truncateTitle,
} from "../../Helpers/TextTruncate";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favorites = useAppSelector((state: RootState) => state.favorites.items);

  const addToCart = (id: number, name: string, price: number) => {
    dispatch(addItem({ id, name, price, quantity: 1 }));
  };

  const isFavorite = (productId: number) => {
    return favorites.some((favorite) => favorite.id === productId);
  };

  const toggleFavorite = (product: any) => {
    if (isFavorite(product.id)) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="favorite-items-container">
      {favorites.map((item: any) => (
        <div key={item.id} className="favorite-item">
          <Card.Img
            variant="top"
            src={item.image} // Ensure item.image is available
            onClick={() => handleProductClick(item.id)}
            className="favorite-item-image"
          />
          <div className="favorite-item-details">
            <div className="favorite-item-header">
              <h5>{truncateTitle(item.title, 10)}</h5>
              <span className="favorite-item-price">${item.price}</span>
            </div>
            <p>{truncateDescriptiont(item.description, 20)}</p>
            <div className="favorite-item-buttons">
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item.id, item.title, item.price);
                }}
              >
                Sepete Ekle
              </Button>
              <Button
                variant="outline-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                }}
              >
                {isFavorite(item.id) ? "Favorilerden Çıkar" : "Favorilere Ekle"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
