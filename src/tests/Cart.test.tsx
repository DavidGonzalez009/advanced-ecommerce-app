import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, test } from "vitest";

import Cart from "../components/Cart";
import cartReducer, { addToCart } from "../redux/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

describe("Cart Component", () => {
  test("renders the cart", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  });
});

describe("Cart Integration", () => {
  test("updates the cart when a product is added", () => {
    store.dispatch(
      addToCart({
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
      }),
    );

    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
});
