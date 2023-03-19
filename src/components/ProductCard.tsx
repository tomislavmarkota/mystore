import React from "react";
import { Link } from "react-router-dom";
import "../App.scss";
import Loader from "./shared/Loader";



interface Props {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
  };
  loading: boolean
}

const ProductCard: React.FC<Props> = ({ product, loading }) => {

  return (
    <div className="product-card">
      {loading ? (
        <Loader dynamicClass="preloader"/>
      ) : (
        <>
          <div className="product-card__img-container">
            <img src={product?.images[0]} alt={product.title} />
          </div>
          <h2>{product.title}</h2>

          <div className="product-card__action">
            <h3>Price: {product?.price}$</h3>
            <Link to={`/product/${product?.id}`}>View Details</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
