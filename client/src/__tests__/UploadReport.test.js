import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadReport from "../components/UploadReport";
import "intersection-observer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { api } from "state/api";
import globalReducer from "state";

const setupStore = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

test("renders without errors", () => {
  render(
    <Provider store={setupStore}>
      <UploadReport id='sampleId' />
    </Provider>
  );
});

test("displays upload button when no report is selected", () => {
  render(
    <Provider store={setupStore}>
      <UploadReport id='sampleId' />
    </Provider>
  );

  const uploadButton = screen.getByRole("button", { name: "UPLOAD NOW" });
  expect(uploadButton).toBeInTheDocument();
});

test("displays Submit and Reset Button when a report is selected", async () => {
  render(
    <Provider store={setupStore}>
      <UploadReport id='sampleId' />
    </Provider>
  );
  const file = new File(["dummy content"], "report.pdf", {
    type: "application/pdf",
  });
  const dropzone = screen.getByTestId("dropzone");

  userEvent.upload(dropzone, file);

  const submit = await screen.findByRole("button", { name: "Submit" });
  const reset = await screen.findByRole("button", { name: "Reset" });
  const buttons = await screen.findAllByRole("button");
  expect(submit).toBeInTheDocument();
  expect(reset).toBeInTheDocument();
  expect(buttons.length).toBe(2);
});
