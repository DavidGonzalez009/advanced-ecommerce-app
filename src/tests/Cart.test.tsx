import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, test, vi } from "vitest";

import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import cartReducer from "../redux/cartSlice";

vi.mock("../api/products", () => ({
  fetchProducts: vi.fn().mockResolvedValue([
    {
      id: "1",
      title: "Test Product",
      description: "Test product description",
      price: 25,
      category: "test",
      image: "https://placehold.co/300",
      rating: {
        rate: 5,
        count: 1,
      },
    },
  ]),
  fetchCategories: vi.fn().mockResolvedValue(["test"]),
  fetchProductsByCategory: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

describe("Cart Component", () => {
  test("renders an empty cart", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});

describe("Product and Cart Integration", () => {
  test("updates the cart when the user clicks Add to Cart", async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ProductList />
          <Cart />
        </Provider>
      </QueryClientProvider>,
    );

    const product = await screen.findByText("Test Product");
    expect(product).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Add to Cart",
      }),
    );

    expect(screen.getAllByText("Test Product")).toHaveLength(2);
  });
});
