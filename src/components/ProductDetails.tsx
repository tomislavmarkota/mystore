import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "../App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "./shared/Loader";
import { Link } from "react-router-dom";
import { Product } from "../interfaces/product";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProducts] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [imagesCount, setImagesCount] = useState<number>(0);
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products/${params.id}`
        );
        const data = await response.json();
        setProducts(data);
        setImagesCount(data?.images?.length);
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
  }, []);

  const clickArrowLeft = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const clickArrowRight = () => {
    if (count < imagesCount - 1) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  if (loading) {
    return <Loader dynamicClass="preloader-center" />;
  }

  if (errorMessage) {
    return <h2>{errorMessage}</h2>;
  }

  return (
    <>
      <Header title="Product details" icon={true} />

      <div className="product-details">
        <div className="product-details__images__container">
          <div className="product-details__images__container__image">
            <img src={product?.images[`${count}`]} alt={product?.title} />
          </div>
          <div className="product-details__images__container__icons">
            <FontAwesomeIcon
              className="product-details__images-actions-left icons"
              icon={faCircleArrowLeft}
              onClick={() => {
                clickArrowLeft();
              }}
            />
            <span>{count + 1 + " / " + product?.images.length}</span>
            <FontAwesomeIcon
              className="product-details__images-actions-right icons"
              icon={faCircleArrowRight}
              onClick={() => {
                clickArrowRight();
              }}
            />
          </div>
        </div>

        <div className="product-details__details">
          <h1>{product?.title}</h1>
          <h2>{product?.brand}</h2>
          <p>
            <span className="description">Description:</span>{" "}
            {product?.description}
          </p>
          <h3>Price: {product?.price}$</h3>
          <h4>Rating: {product?.rating}</h4>
          <div className="product-details__details__action">
            <Link to="/">Go back</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
