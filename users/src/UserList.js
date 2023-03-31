import React, { useMemo } from "react";

const UserList = ({ users }) => {
  const renderUsers = useMemo(
    () =>
      users.map((user) => (
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      )),
    [users]
  );

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
      <tbody data-testid="users">{renderUsers}</tbody>
    </table>
  );
};

export default UserList;
