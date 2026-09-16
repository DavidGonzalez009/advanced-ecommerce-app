import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Login from "../components/Login";

describe("Login Component", () => {
  test("renders the login form", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });
});

import Register from "../components/Register";

describe("Register Component", () => {
  test("renders the registration form", () => {
    render(<Register />);

    expect(
      screen.getByRole("heading", { name: "Register" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" }),
    ).toBeInTheDocument();
  });
});
