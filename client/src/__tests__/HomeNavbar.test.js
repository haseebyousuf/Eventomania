import React from "react";
import { render, screen } from "@testing-library/react";
import HomeNavbar from "../components/HomeNavbar";
import { BrowserRouter } from "react-router-dom";
import "intersection-observer";
// Mock useDispatch and useSelector
jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

it("renders the component with authenticated user", () => {
  require("react-redux").useSelector.mockReturnValue({ global: { user: {} } });

  render(
    <BrowserRouter>
      <HomeNavbar />
    </BrowserRouter>
  );
});

it("renders 'HOME' button in Navbar", () => {
  require("react-redux").useSelector.mockReturnValue({ global: { user: {} } });

  render(
    <BrowserRouter>
      <HomeNavbar />
    </BrowserRouter>
  );

  const homeButton = screen.getByText("HOME");

  expect(homeButton).toBeInTheDocument();
});

it("renders 'ABOUT' button in Navbar", () => {
  require("react-redux").useSelector.mockReturnValue({ global: { user: {} } });

  render(
    <BrowserRouter>
      <HomeNavbar />
    </BrowserRouter>
  );

  const aboutButton = screen.getByText("ABOUT");

  expect(aboutButton).toBeInTheDocument();
});
it("renders 'Dashboard' button in Navbar", () => {
  require("react-redux").useSelector.mockReturnValue({ global: { user: {} } });

  render(
    <BrowserRouter>
      <HomeNavbar />
    </BrowserRouter>
  );

  const dashboardButton = screen.getByText("Dashboard");
  expect(dashboardButton).toBeInTheDocument();
});

it("renders 'THEME MODE' button in Navbar", () => {
  require("react-redux").useSelector.mockReturnValue({ global: { user: {} } });

  render(
    <BrowserRouter>
      <HomeNavbar />
    </BrowserRouter>
  );
  const modeToggleButton = screen.getByTestId("LightModeOutlinedIcon");

  expect(modeToggleButton).toBeInTheDocument();
});
