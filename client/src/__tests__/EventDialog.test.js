import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventDialog from "../components/EventDialog";
import { BrowserRouter } from "react-router-dom";
import "intersection-observer";

describe("EventDialog Component", () => {
  it("renders the component without crashing", () => {
    const openDialog = true;
    const params = {
      row: {
        name: "Event Name",
        bannerName: "event-banner.png",
        startDate: "2023-08-01",
        endDate: "2023-08-03",
        venue: "Event Venue",
        committee: [{ name: "Committee Name" }],
        createdBy: [{ name: "Creator Name" }],
        description: "Event Description",
        orderName: "event-order.pdf",
      },
    };
    const handleCloseDialog = jest.fn();
    const handleClickOpen = jest.fn();
    const showOrder = true;

    render(
      <BrowserRouter>
        <EventDialog
          openDialog={openDialog}
          params={params}
          handleCloseDialog={handleCloseDialog}
          handleClickOpen={handleClickOpen}
          showOrder={showOrder}
        />
      </BrowserRouter>
    );
  });

  it("renders the component with provided props", () => {
    const openDialog = true;
    const params = {
      row: {
        name: "Event Name",
        bannerName: "event-banner.png",
        startDate: "2023-08-01",
        endDate: "2023-08-03",
        venue: "Event Venue",
        committee: [{ name: "Committee Name" }],
        createdBy: [{ name: "Creator Name" }],
        description: "Event Description",
        orderName: "event-order.pdf",
      },
    };
    const handleCloseDialog = jest.fn();
    const handleClickOpen = jest.fn();
    const showOrder = true;

    render(
      <BrowserRouter>
        <EventDialog
          openDialog={openDialog}
          params={params}
          handleCloseDialog={handleCloseDialog}
          handleClickOpen={handleClickOpen}
          showOrder={showOrder}
        />
      </BrowserRouter>
    );

    const eventName = screen.getByText(params.row.name);
    const eventDescription = screen.getByText(params.row.description);
    const viewOrderButton = screen.getByText("View Order");

    expect(eventName).toBeInTheDocument();
    expect(eventDescription).toBeInTheDocument();
    expect(viewOrderButton).toBeInTheDocument();
  });
  it("calls handleCloseDialog when the close button is clicked", () => {
    const showOrder = true;
    const params = {
      row: {
        name: "Event Name",
        bannerName: "event-banner.png",
        startDate: "2023-08-01",
        endDate: "2023-08-03",
        venue: "Event Venue",
        committee: [{ name: "Committee Name" }],
        createdBy: [{ name: "Creator Name" }],
        description: "Event Description",
        orderName: "event-order.pdf",
      },
    };
    const handleCloseDialog = jest.fn();
    const handleClickOpen = jest.fn();
    render(
      <BrowserRouter>
        <EventDialog
          openDialog={true}
          params={params}
          handleCloseDialog={handleCloseDialog}
          handleClickOpen={handleClickOpen}
          showOrder={showOrder}
        />
      </BrowserRouter>
    );

    const closeButton = screen.getByLabelText("close");
    fireEvent.click(closeButton);

    expect(handleCloseDialog).toHaveBeenCalledTimes(1);
  });

  it("renders the View Order button when showOrder is true", () => {
    const showOrder = true;
    const params = {
      row: {
        name: "Event Name",
        bannerName: "event-banner.png",
        startDate: "2023-08-01",
        endDate: "2023-08-03",
        venue: "Event Venue",
        committee: [{ name: "Committee Name" }],
        createdBy: [{ name: "Creator Name" }],
        description: "Event Description",
        orderName: "event-order.pdf",
      },
    };
    const handleCloseDialog = jest.fn();
    const handleClickOpen = jest.fn();
    render(
      <BrowserRouter>
        <EventDialog
          openDialog={true}
          params={params}
          handleCloseDialog={handleCloseDialog}
          handleClickOpen={handleClickOpen}
          showOrder={showOrder}
        />
      </BrowserRouter>
    );

    const viewOrderButton = screen.getByText("View Order");
    expect(viewOrderButton).toBeInTheDocument();
  });

  it("does not render the View Order button when showOrder is false", () => {
    const showOrder = false;
    const params = {
      row: {
        name: "Event Name",
        bannerName: "event-banner.png",
        startDate: "2023-08-01",
        endDate: "2023-08-03",
        venue: "Event Venue",
        committee: [{ name: "Committee Name" }],
        createdBy: [{ name: "Creator Name" }],
        description: "Event Description",
        orderName: "event-order.pdf",
      },
    };
    const handleCloseDialog = jest.fn();
    const handleClickOpen = jest.fn();
    render(
      <BrowserRouter>
        <EventDialog
          openDialog={true}
          params={params}
          handleCloseDialog={handleCloseDialog}
          handleClickOpen={handleClickOpen}
          showOrder={showOrder}
        />
      </BrowserRouter>
    );

    const viewOrderButton = screen.queryByText("View Order");
    expect(viewOrderButton).not.toBeInTheDocument();
  });
});
