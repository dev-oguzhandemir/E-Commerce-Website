import { Params, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchProductDetail } from "./slice";
import { Button } from "react-bootstrap";
import { addItem } from "../Basket/slice";
import { addFavorite, removeFavorite } from "../Favorites/slice";
import { RootState } from "../../app/store";
import "./style.css"

const Detail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<Params>();
  const product = useAppSelector((state) => state.detail.data);
  const detailStatus = useAppSelector((state) => state.detail.status);
  const error = useAppSelector((state) => state.detail.error);
  const favorites = useAppSelector((state: RootState) => state.favorites.items);

  console.log(detailStatus, error, product);

  console.log(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(parseInt(id)));
    }
  }, [dispatch, id]);

  console.log(product.title);

  if (detailStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (detailStatus === "failed") {
    return <div>Error: {error}</div>;
  }

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
  return (
    <div className="product-container">
      <div className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info-container">
          <div className="product-info">
            <h2>{product.title}</h2>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>Ücret: {product.price}₺</p>
          </div>
          <div className="basket-button">
            <Button
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product.id, product.title, product.price);
              }}
            >
              Sepete Ekle
            </Button>
            <div className="favorite-button">
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
              >
                {isFavorite(product.id)
                  ? "Favorilerden Çıkar"
                  : "Favorilere Ekle"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
