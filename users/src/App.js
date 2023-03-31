import React, { useState } from "react";

import UserForm from "./UserForm";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    setUsers((users) => [...users, newUser]);
  };

  return (
    <div>
      <UserForm onAddUser={addUser} />
      <hr />
      <UserList users={users} />
    </div>
  );
}

export default App;
