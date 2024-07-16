import React from "react";
import { Button, Card } from "react-bootstrap";
import "./style.css"; // Stil dosyası import edildi
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addItem } from "../../pages/Basket/slice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  truncateDescriptiont,
  truncateTitle,
} from "../../Helpers/TextTruncate";
import { RootState } from "../../app/store";
import { addFavorite, removeFavorite } from "../../pages/Favorites/slice";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ChildComponentProps {
  product: Product;
}

const ProductsCard: React.FC<ChildComponentProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const truncatedTitle = truncateTitle(product.title, 20);
  const truncatedDescription = truncateDescriptiont(product.description, 20);
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
    <Card
      key={product.id}
      onClick={() => handleProductClick(product.id)}
      style={{ width: "18rem", position: "relative" }}
    >
      <FavoriteBorderIcon
        className={`favorite-icon ${isFavorite(product.id) ? "favorite" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product);
        }}
      />
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{truncatedTitle}</Card.Title>
        <Card.Text>{truncatedDescription}</Card.Text>
        <Card.Text>Tutar: {product.price} ₺</Card.Text>
        <Button
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id, product.title, product.price);
          }}
        >
          Sepete Ekle
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductsCard;
