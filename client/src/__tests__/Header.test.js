import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import "intersection-observer";

it("should render Header without crashing", () => {
  render(<Header title='Title' subtitle='Subtitle' />);
});

it("should render title text", () => {
  render(<Header title='Title' subtitle='Subtitle' />);
  const titleText = screen.getByText(/Title/);

  expect(titleText).toBeInTheDocument();
});

it("should render subtitle text", () => {
  render(<Header title='Title' subtitle='Subtitle' />);
  const subtitleSpans = screen.getByRole("heading", {
    name: "S u b t i t l e",
  });

  expect(subtitleSpans).toBeInTheDocument();
});
