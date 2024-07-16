import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProductCategory } from "./slice";
import ProductsCard from "../../components/Card";
import "./style.css";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const CategoryProduct = () => {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.productsCategory.data);
  const status = useAppSelector((state) => state.productsCategory.status);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    if (category) {
      dispatch(fetchProductCategory(category));
    }
  }, [category, dispatch]);

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const sortProducts = (products: Product[], sortBy: string) => {
    if (sortBy === "ascending") {
      return products.slice().sort((a, b) => a.price - b.price);
    } else if (sortBy === "descending") {
      return products.slice().sort((a, b) => b.price - a.price);
    } else {
      return products;
    }
  };

  const sortedData = sortProducts(data, sortBy);

  return (
    <div className="product-category-container">
      <div className="product-category-filter-container">
        <div className="category-name">
          <h3>{category?.toLocaleUpperCase()}</h3>
        </div>
        <div className="filter-dropdown-div">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sırala
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                active={sortBy === "default"}
                onClick={() => handleSortChange("default")}
              >
                Varsayılan
              </Dropdown.Item>
              <Dropdown.Item
                active={sortBy === "ascending"}
                onClick={() => handleSortChange("ascending")}
              >
                Artan Fiyat
              </Dropdown.Item>
              <Dropdown.Item
                active={sortBy === "descending"}
                onClick={() => handleSortChange("descending")}
              >
                Azalan Fiyat
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="product-category">
        {status === "loading" && <p>Yükleniyor...</p>}
        {status === "failed" && <p>Ürünler yüklenirken bir hata oluştu.</p>}
        <div className="product-list">
          {sortedData.map((product: Product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
