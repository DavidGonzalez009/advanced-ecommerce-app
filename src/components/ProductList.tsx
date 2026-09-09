import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

const ProductList = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Unable to load products.</p>;
  }

  return (
    <div>
      <h1>Product Catalog</h1>

      {products?.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} width="150" />
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>{product.description}</p>
          <p>Rating: {product.rating.rate}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
