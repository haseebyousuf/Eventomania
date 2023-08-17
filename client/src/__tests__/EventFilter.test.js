import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventFilter from "../components/EventFilter";
import { BrowserRouter } from "react-router-dom";
import "intersection-observer";

// Mock the useCommitteesQuery hook
jest.mock("../state/committeeApiSlice.js", () => ({
  useCommitteesQuery: jest.fn(),
}));

const mockCommittees = [
  { _id: "1", name: "Committee A" },
  { _id: "2", name: "Committee B" },
];

const mockEvents = [
  {
    id: 1,
    name: "Event 1",
    committee: [{ _id: "1", name: "Committee A" }],
  },
  {
    id: 2,
    name: "Event 2",
    committee: [{ _id: "2", name: "Committee B" }],
  },
  {
    id: 3,
    name: "Event 3",
    committee: [{ _id: "1", name: "Committee A" }],
  },
];

it("renders without crashing", () => {
  const setAnimateCardMock = jest.fn();
  const setFilteredEventsMock = jest.fn();

  require("../state/committeeApiSlice.js").useCommitteesQuery.mockReturnValue({
    data: mockCommittees,
  });

  render(
    <EventFilter
      setAnimateCard={setAnimateCardMock}
      setFilteredEvents={setFilteredEventsMock}
      events={mockEvents}
    />
  );
});

it("renders the component with provided props", () => {
  const setAnimateCardMock = jest.fn();
  const setFilteredEventsMock = jest.fn();

  require("state/committeeApiSlice").useCommitteesQuery.mockReturnValue({
    data: mockCommittees,
  });

  render(
    <EventFilter
      setAnimateCard={setAnimateCardMock}
      setFilteredEvents={setFilteredEventsMock}
      events={mockEvents}
    />
  );

  const filterLabel = screen.getByText(/Filter:/);
  const committeeSelect = screen.getByLabelText("Committee");

  expect(filterLabel).toBeInTheDocument();
  expect(committeeSelect).toBeInTheDocument();
});

it("renders 'All' as the initial value in the select", () => {
  const setAnimateCardMock = jest.fn();
  const setFilteredEventsMock = jest.fn();

  require("state/committeeApiSlice").useCommitteesQuery.mockReturnValue({
    data: mockCommittees,
  });

  render(
    <EventFilter
      setAnimateCard={setAnimateCardMock}
      setFilteredEvents={setFilteredEventsMock}
      events={mockEvents}
    />
  );

  const selectValue = screen.getByText(/All/);
  expect(selectValue).toBeInTheDocument();
});
