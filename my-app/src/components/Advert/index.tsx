import { Button } from "react-bootstrap";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "./style.css";

const Advert = () => {
  const handleAdvert = () => {
    console.log("dneme");
  };
  return (
    <div className="advertising-space-container">
      <div className="advertising-space-div">
        <div>
          <ShoppingBasketIcon />
        </div>
        <div>
          <h4>Bu Alan Reklam Alanıdır! Hemen </h4>
        </div>
        <div>
          <Button onClick={handleAdvert}> Keşfet</Button>
        </div>
      </div>
    </div>
  );
};

export default Advert;
