import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";
import { addToCart } from "../redux/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [selectedCategory, setSelectedCategory] = useState("");
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  const handleCreateProduct = (event: React.FormEvent) => {
    event.preventDefault();

    createProductMutation.mutate(newProduct, {
      onSuccess: () => {
        setNewProduct({
          title: "",
          description: "",
          price: 0,
          category: "",
          image: "",
          rating: {
            rate: 0,
            count: 0,
          },
        });

        alert("Product created successfully!");
      },
    });
  };

  const updateProductMutation = useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: string;
      product: Parameters<typeof updateProduct>[1];
    }) => updateProduct(id, product),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

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

  if (isLoading || categoriesLoading) {
    return <p className="status-message">Loading...</p>;
  }

  if (error || categoriesError) {
    return <p className="status-message">Something went wrong.</p>;
  }

  return (
    <section className="catalog-section">
      <form onSubmit={handleCreateProduct}>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              title: event.target.value,
            })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              price: Number(event.target.value),
            })
          }
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              category: event.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              description: event.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              image: event.target.value,
            })
          }
        />

        <button type="submit">Add Product</button>
      </form>
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
                  const img = event.currentTarget;

                  if (img.dataset.fallback) return;

                  img.dataset.fallback = "true";
                  img.src = "https://placehold.co/300";
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
              <button
                onClick={() => {
                  const newTitle = prompt(
                    "Enter a new product title:",
                    product.title,
                  );

                  if (!newTitle) return;

                  updateProductMutation.mutate({
                    id: product.id,
                    product: {
                      title: newTitle,
                    },
                  });
                }}
              >
                Edit Product
              </button>

              <button
                onClick={() => {
                  const confirmed = confirm(
                    `Are you sure you want to delete ${product.title}?`,
                  );

                  if (!confirmed) return;

                  deleteProductMutation.mutate(product.id);
                }}
              >
                Delete Product
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
