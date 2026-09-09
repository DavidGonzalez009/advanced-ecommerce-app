import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../api/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

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
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Unable to load products.</p>;
  }

  if (categoriesLoading) {
    return <p>Loading categories...</p>;
  }

  if (categoriesError) {
    return <p>Unable to load categories.</p>;
  }

  return (
    <div>
      <h1>Product Catalog</h1>

      <label htmlFor="category">Choose a category: </label>

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

      {products?.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>

          <img
            src={product.image}
            alt={product.title}
            width="150"
            onError={(event) => {
              event.currentTarget.src = "https://via.placeholder.com/150";
            }}
          />

          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>{product.description}</p>
          <p>Rating: {product.rating.rate}</p>
          <button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
