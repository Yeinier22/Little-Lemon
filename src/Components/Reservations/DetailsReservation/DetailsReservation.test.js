import userEvent from "@testing-library/user-event";
import {
  render,
  act,
  screen,
  waitFor,
  fireEvent,
  getByText,
} from "@testing-library/react";
import FormSection from "./DetailsReservation";
import { AvailableAlert, useAlert } from "../Context/alertContext";
import { UserContext } from "../Reservations";
import { AvailableButton, useButton } from "../Context/SelectButtonContext";
import DateReservation from "./DateReservation";

jest.mock("../Context/SelectButtonContext", () => ({
  ...jest.requireActual("../Context/SelectButtonContext"),
  useButton: jest.fn(),
}));

test("'name should display required validation'", async () => {
  const setOccupation = jest.fn();
  const occupation = [];

  useButton.mockReturnValue({
    selectedButton: {
      hour: "12:00 pm",
      day: "2022-01-01",
      people: "2 people",
    },
    handleClick: jest.fn(),
    setSelectedButton: jest.fn(),
  });

  render(
    <AvailableAlert>
      <UserContext.Provider value={{ setOccupation, occupation }}>
        <AvailableButton>
          <FormSection place="inside" testing={true} />
        </AvailableButton>
      </UserContext.Provider>
    </AvailableAlert>
  );

  const firstNameInput = screen.getByPlaceholderText("First name");
  expect(firstNameInput).toBeInTheDocument();
  const lastNameInput = screen.getByPlaceholderText("Last name");
  expect(lastNameInput).toBeInTheDocument();
  const phoneNumber = screen.getByPlaceholderText("Phone number");
  expect(phoneNumber).toBeInTheDocument();
  const email = screen.getByPlaceholderText("Email");
  expect(email).toBeInTheDocument();
  const btn=screen.getByRole("button", {name: "Submit"})
  expect(btn).toBeInTheDocument();
  expect(screen.queryByText("Required")).toBeNull();

  //Test first name
  fireEvent.change(firstNameInput, { target: { value: "" } });
  fireEvent.blur(firstNameInput);
  await waitFor(() => {
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
  await act(async () => {
    fireEvent.change(firstNameInput, { target: { value: "Jonh" } });
    fireEvent.blur(firstNameInput);
  });
  await waitFor(() => {
    expect(screen.queryByText("Required")).not.toBeInTheDocument();
  });

  //Test Last name
  await act(async () => {
    fireEvent.change(lastNameInput, { target: { value: "" } });
    fireEvent.blur(lastNameInput);
  });
  await waitFor(() => {
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
  await act(async () => {
    fireEvent.change(lastNameInput, { target: { value: "Jhonh" } });
    fireEvent.blur(lastNameInput);
  });
  await waitFor(() => {
    expect(screen.queryByText("Required")).not.toBeInTheDocument();
  });

  //Phone number
  await act(async () => {
    fireEvent.change(phoneNumber, { target: { value: "" } });
    fireEvent.blur(phoneNumber);
  });
  await waitFor(() => {
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
  await act(async () => {
    fireEvent.change(phoneNumber, { target: { value: "666" } });
    fireEvent.blur(phoneNumber);
  });
  await waitFor(() => {
    expect(screen.getByText("Must be a valid phone number")).toBeInTheDocument();
  });

  //Email
  await act(async () => {
    fireEvent.change(email, { target: { value: "" } });
    fireEvent.blur(email);
  });
  await waitFor(() => {
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
  await act(async () => {
    fireEvent.change(email, { target: { value: "fdfasdfa" } });
    fireEvent.blur(email);
  });
  await waitFor(() => {
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  //Fixed phone number
  await act(async () => {
    fireEvent.change(phoneNumber, { target: { value: "6663333333" } });
    fireEvent.blur(phoneNumber);
  });

  //Submit button disabled
    expect(btn).toHaveAttribute('disabled')

  //Fixed email
  await act(async () => {
    fireEvent.change(email, { target: { value: "example@gmail.com" } });
    fireEvent.blur(email);
  });

  //Submit button enable
  expect(btn).not.toHaveAttribute('disabled')
  fireEvent.click(btn);
 

});
