import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchCategory } from "./slice";
import "./style.css";
import React, { useEffect } from "react";

interface Category {
  name: string;
}

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state: RootState) => state.category.status);
  const data = useAppSelector((state: RootState) => state.category.data);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategory());
    }
  }, [status, dispatch]);

  const handleCategoryClick = (category: string) => {
    navigate(`/products/category/${category}`);
  };

  return (
    <div className="category-container">
      {data.map((category) => (
        <div
          className="category-div"
          key={category}
          onClick={() => handleCategoryClick(category)}
        >
          <p>{category}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
