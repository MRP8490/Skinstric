import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("renders the main Skinstric heading", () => {
    render(<Home />);

    expect(
      screen.getByText(/Sophisticated/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/skincare/i)
    ).toBeInTheDocument();
  });

  it("renders the main navigation actions", () => {
    render(<Home />);

    expect(
      screen.getByRole("button", { name: /ENTER CODE/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/DISCOVER A\.I\./i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/TAKE TEST/i)
    ).toBeInTheDocument();
  });

  it("links TAKE TEST to the intro page", () => {
    render(<Home />);

    const takeTestLink = screen.getByRole("link", {
      name: /TAKE TEST/i,
    });

    expect(takeTestLink).toHaveAttribute("href", "/intro");
  });

});