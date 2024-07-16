import "./style.css";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Input from "@mui/material/Input";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { clearSearch, setSearchTerm } from "./slice";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const basketCount = useAppSelector((state: RootState) => state.basket.count);
  const favoriteCount = useAppSelector(
    (state: RootState) => state.favorites.count
  );
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(inputValue));
  };

  const handleHomeClick = () => {
    dispatch(clearSearch());
    setInputValue("");
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-container-div">
        <div className="navbar-logo-container-div">
          <div className="navbar-logo-div">
            <ShoppingBasketIcon fontSize="large" onClick={handleHomeClick} />
          </div>
        </div>
        <div className="navbar-search-container-div">
          <div className="navbar-input-search-div">
            <Input
              color="primary"
              placeholder="Aramak istediğin ürünü yaz..."
              fullWidth
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="navbar-search-button-div">
            <Button onClick={handleSearch}>
              Ara
            </Button>
          </div>
        </div>
        <div className="navbar-navigation-div">
          <div
            className="navbar-favorite-div"
            onClick={() => navigate("/favorites")}
          >
            <div>
              <FavoriteIcon />
              <span className="favorite-count">{favoriteCount}</span>
            </div>
            <div>
              <p>Favorilerim</p>
            </div>
          </div>
          <div
            className="navbar-basket-div"
            onClick={() => navigate("/basket")}
          >
            <div>
              <ShoppingCartIcon />
              <span className="basket-count">{basketCount}</span>
            </div>
            <div>
              <p>Sepetim</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
