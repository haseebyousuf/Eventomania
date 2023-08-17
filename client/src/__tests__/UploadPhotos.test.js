import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadPhotos from "../components/UploadPhotos";
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
      <UploadPhotos id='sampleId' />
    </Provider>
  );
});

test("displays upload button when no photo is selected", () => {
  render(
    <Provider store={setupStore}>
      <UploadPhotos id='sampleId' />
    </Provider>
  );
  expect(screen.getByText(/UPLOAD NOW/i)).toBeInTheDocument();
});

test("displays Submit and Reset Button when a report is selected", async () => {
  render(
    <Provider store={setupStore}>
      <UploadPhotos id='sampleId' />
    </Provider>
  );
  const file = new File(["dummy content"], "photo.jpg", {
    type: "image/jpg",
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
