import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";
import UserForm from "./UserForm";

test("it shows 2 inputs and a button", () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", () => {
  const mockingOnAddUser = jest.fn();

  render(<UserForm onAddUser={mockingOnAddUser} />);

  const inputName = screen.getByRole("textbox", { name: /name/i });
  // equilavated with
  const inputEmail = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole("button");

  userEvent.click(inputName);
  userEvent.keyboard("Leo");

  userEvent.click(inputEmail);
  userEvent.keyboard("Leo@gmail.com");

  userEvent.click(submitButton);

  expect(mockingOnAddUser).toBeCalledWith({
    name: "Leo",
    email: "Leo@gmail.com",
  });
});

test("it should clear the inputs after clicking AddUser button", async () => {
  render(<UserForm onAddUser={() => {}} />);

  const inputName = screen.getByLabelText(/name/i);
  const inputEmail = screen.getByLabelText(/email/i);

  userEvent.click(inputName);
  userEvent.keyboard("leo");

  userEvent.click(inputEmail);
  userEvent.keyboard("leo@gmail.com");

  const addUserButton = screen.getByRole("button", { name: "Add User" });
  userEvent.click(addUserButton);

  await wait();

  expect(inputName).toHaveValue("");
  expect(inputEmail).toHaveValue("");
});
