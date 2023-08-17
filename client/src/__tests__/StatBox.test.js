import { render, screen } from "@testing-library/react";
import StatBox from "../components/StatBox";
import "intersection-observer";

test("should render StatBox without crashing", () => {
  const title = "Total Users";
  const value = "1000";
  const description = "Active users";
  const mockIcon = <svg data-testid='mock-icon' />;
  render(
    <StatBox
      title={title}
      value={value}
      icon={mockIcon}
      description={description}
    />
  );
});

it("renders the component with provided props", () => {
  const title = "Total Users";
  const value = "1000";
  const description = "Active users";
  const mockIcon = <svg data-testid='mock-icon' />;

  render(
    <StatBox
      title={title}
      value={value}
      icon={mockIcon}
      description={description}
    />
  );

  const titleElement = screen.getByText(title);
  const valueElement = screen.getByText(value);
  const descriptionElement = screen.getByText(description);
  const iconElement = screen.getByTestId("mock-icon");

  expect(titleElement).toBeInTheDocument();
  expect(valueElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
  expect(iconElement).toBeInTheDocument();
});
