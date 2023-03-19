import { useState, useEffect } from "react";
import Header from "./Header";
import "../App.scss";
import ProductCard from "./ProductCard";
import Loader from "./shared/Loader";
import { ProductList_Data } from "../interfaces/product";

const ProductList = () => {
  const [products, setProducts] = useState<ProductList_Data>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
            (currentPage - 1) * productsPerPage
          }`
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        if (typeof err === "string") {
          setErrorMessage(err);
          setLoading(false);
        } else if (err instanceof Error) {
          setErrorMessage(err.message);
          setLoading(false);
        }
      }
    };
    fetchProducts();
  }, [currentPage, productsPerPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!products) {
    return <Loader dynamicClass="preloader-center" />;
  }

  if (errorMessage) {
    return <h2>{errorMessage}</h2>;
  }

  return (
    <>
      <Header title="Product list" icon={false} />
      <div className="section-wrapper">
        <div className="card-list">
          {products?.products.map((product: any) => (
            <ProductCard product={product} key={product.id} loading={loading} />
          ))}
        </div>
        <div className="pagination-wrapper">
          <div className="pagination-buttons">
            <span>{`Pages: ${currentPage}/${
              products?.total / productsPerPage
            }`}</span>
            <button
              className="prev-btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <button
              className="next-btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * productsPerPage === products?.total}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
