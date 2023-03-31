import { screen, render, within } from "@testing-library/react";

import UserList from "./UserList";

describe("UserList", () => {
  test("render one row per user by testid", () => {
    const users = [
      { name: "Leo", email: "Leo@gmail.com" },
      { name: "John", email: "John@gmail.com" },
    ];
    render(<UserList users={users} />);

    const rows = within(screen.getByTestId("users")).getAllByRole("row");

    expect(rows).toHaveLength(2);
  });

  test("render one row per user by querySelector", () => {
    const users = [
      { name: "Leo", email: "Leo@gmail.com" },
      { name: "John", email: "John@gmail.com" },
    ];
    const { container } = render(<UserList users={users} />);

    // eslint-disable-next-line
    const rows = container.querySelectorAll("tbody tr");

    expect(rows).toHaveLength(2);
  });

  test("render the name and email of each user", () => {
    const users = [
      { name: "Leo", email: "Leo@gmail.com" },
      { name: "John", email: "John@gmail.com" },
    ];

    render(<UserList users={users} />);

    for (const user of users) {
      const name = screen.getByRole("cell", { name: user.name });
      const email = screen.getByRole("cell", { name: user.email });

      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
    }
  });
});
