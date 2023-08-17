import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventCard from "../components/EventCard";
import { BrowserRouter } from "react-router-dom";
import "intersection-observer";

const mockEvent = {
  name: "Event Name",
  bannerName: "event-banner.png",
  startDate: "2023-08-01T14:00:00Z",
  venue: "Event Venue",
  _id: "mock-event-id",
};

it("renders without crashing", () => {
  const isPast = false;

  render(
    <BrowserRouter>
      <EventCard event={mockEvent} isPast={isPast} />
    </BrowserRouter>
  );
});

it("renders the component with provided props", () => {
  const isPast = false;

  render(
    <BrowserRouter>
      <EventCard event={mockEvent} isPast={isPast} />
    </BrowserRouter>
  );

  const eventName = screen.getByText(mockEvent.name);
  const eventStartDate = screen.getByText(/1st Aug 2023, 7:30 PM/);
  const eventVenue = screen.getByText(mockEvent.venue);
  const registerButton = screen.getByText("Register Now");

  expect(eventName).toBeInTheDocument();
  expect(eventStartDate).toBeInTheDocument();
  expect(eventVenue).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
});

it("renders 'View Details' button for past events", () => {
  const isPast = true;

  render(
    <BrowserRouter>
      <EventCard event={mockEvent} isPast={isPast} />
    </BrowserRouter>
  );

  const viewDetailsButton = screen.getByText("View Details");
  expect(viewDetailsButton).toBeInTheDocument();
});

it("renders 'Register Now' button for upcoming events", () => {
  const isPast = false;

  render(
    <BrowserRouter>
      <EventCard event={mockEvent} isPast={isPast} />
    </BrowserRouter>
  );

  const viewDetailsButton = screen.getByRole("button");
  expect(viewDetailsButton).toBeInTheDocument();
});

it("navigates to the event details page when button is clicked", () => {});
