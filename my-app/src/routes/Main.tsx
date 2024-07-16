import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Basket from "../pages/Basket";
import Detail from "../pages/Detail";
import Favorites from "../pages/Favorites";
import CategoryProduct from "../pages/CategoryProducts";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/products/category/:category"
          element={<CategoryProduct />}
        />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Main;
