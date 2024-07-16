import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchProducts } from "./slice";
import ProductsCard from "../Card";
import ReactPaginate from "react-paginate";
import "./style.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const Products = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state: RootState) => state.products.status);
  const data = useAppSelector((state: RootState) => state.products.data);
  const searchTerm = useAppSelector((state: RootState) => state.search.term);

  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(9);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredData = data.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / productsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredData.slice(offset, offset + productsPerPage);

  return (
    <div className="products">
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <>
          <div className="products-container">
            {currentProducts.map((product: Product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
          <div className="pagination-container">
            <ReactPaginate
              previousLabel={
                <button
                  disabled={currentPage === 0}
                  className={currentPage === 0 ? "disabled" : ""}
                >
                  Geri
                </button>
              }
              nextLabel={
                <button
                  disabled={currentPage === pageCount - 1}
                  className={currentPage === pageCount - 1 ? "disabled" : ""}
                >
                  İleri
                </button>
              }
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </>
      )}
      {status === "failed" && <p>Bir Hata Oluştu...</p>}
    </div>
  );
};

export default Products;
