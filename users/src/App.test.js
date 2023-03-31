import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

test("can receive a new user and show it on a list", async () => {
  render(<App />);

  const nameInput = screen.getByLabelText("Name");
  userEvent.click(nameInput);
  userEvent.keyboard("Leo");

  const emailInput = screen.getByLabelText("Email");
  userEvent.click(emailInput);
  userEvent.keyboard("Leo@gmail.com");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const name = await screen.findByRole("cell", { name: /^leo$/i });
  const email = await screen.findByRole("cell", { name: /^leo@gmail.com$/i });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
