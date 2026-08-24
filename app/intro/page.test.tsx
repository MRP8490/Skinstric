import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import IntroPage from "./page";

const { pushMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("Intro page", () => {
  beforeEach(() => {
    localStorage.clear();
    pushMock.mockClear();
  });

  it("renders the name input", () => {
    render(<IntroPage />);

    expect(
      screen.getByRole("textbox", { name: /your name/i })
    ).toBeInTheDocument();
  });

  it("shows an error for an invalid name", () => {
    render(<IntroPage />);

    const input = screen.getByRole("textbox", {
      name: /your name/i,
    });

    fireEvent.change(input, {
      target: { value: "Mona123" },
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
    });

    expect(
      screen.getByText(
        /please enter a valid name without numbers or special characters/i
      )
    ).toBeInTheDocument();
  });

  it("saves a valid name and navigates to location", () => {
    render(<IntroPage />);

    const input = screen.getByRole("textbox", {
      name: /your name/i,
    });

    fireEvent.change(input, {
      target: { value: "Mona Hadizadeh" },
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
    });

    expect(localStorage.getItem("skinstric-name")).toBe(
      "Mona Hadizadeh"
    );

    expect(pushMock).toHaveBeenCalledWith("/location");
  });
});
