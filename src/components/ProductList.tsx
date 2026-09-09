import { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../api/products";

import { addToCart } from "../redux/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory
        ? fetchProductsByCategory(selectedCategory)
        : fetchProducts(),
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <p className="status-message">Loading products...</p>;
  }

  if (error) {
    return <p className="status-message">Unable to load products.</p>;
  }

  if (categoriesLoading) {
    return <p className="status-message">Loading categories...</p>;
  }

  if (categoriesError) {
    return <p className="status-message">Unable to load categories.</p>;
  }

  return (
    <section className="catalog-section">
      <div className="catalog-header">
        <div>
          <h1>Product Catalog</h1>
          <p>Discover quality products for every lifestyle.</p>
        </div>

        <div className="category-filter">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">All Products</option>

            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products?.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrapper">
              <img
                className="product-image"
                src={product.image}
                alt={product.title}
                onError={(event) => {
                  event.currentTarget.src = "https://via.placeholder.com/300";
                }}
              />
            </div>

            <div className="product-info">
              <p className="product-category">{product.category}</p>

              <h2>{product.title}</h2>

              <p className="product-description">{product.description}</p>

              <div className="product-rating">
                <span>★</span>
                <span>{product.rating.rate}</span>
                <span>({product.rating.count})</span>
              </div>

              <p className="product-price">${product.price.toFixed(2)}</p>

              <button
                className="add-to-cart-button"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
