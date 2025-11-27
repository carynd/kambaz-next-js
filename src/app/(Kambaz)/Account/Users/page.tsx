"use client";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    const allUsers = await client.findAllUsers();
    setUsers(allUsers);
  };

  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    setName("");
    if (selectedRole) {
      const filteredUsers = await client.findUsersByRole(selectedRole);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (searchName: string) => {
    setName(searchName);
    setRole("");
    if (searchName) {
      const filteredUsers = await client.findUsersByPartialName(searchName);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const newUser = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, newUser]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people mb-3"
      >
        <FaPlus className="me-2" />
        Users
      </button>
      <div className="mb-3" style={{ display: "flex", gap: "10px" }}>
        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select"
          style={{ width: "200px" }}
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>

        <FormControl
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search by name..."
          style={{ width: "200px" }}
        />
      </div>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
