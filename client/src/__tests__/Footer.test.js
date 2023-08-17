import { render, screen } from "@testing-library/react";

import Footer from "../components/Footer";

test("should render footer without crashing", () => {
  render(<Footer />);
});

test("should render Developed and maintained by in footer", () => {
  render(<Footer />);

  const text = screen.getByText(/Developed and maintained by/);

  expect(text).toBeInTheDocument();
});

test("should render 'SP College' in footer", () => {
  render(<Footer />);

  const text = screen.getByText(/SP College/);

  expect(text).toBeInTheDocument();
});

test("should render 'Department of IT' in footer", () => {
  render(<Footer />);

  const text = screen.getByText(/Department of IT/);

  expect(text).toBeInTheDocument();
});
