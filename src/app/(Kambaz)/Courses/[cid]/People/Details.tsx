"use client";
import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";
import * as client from "../../../Account/client";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    try {
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");
      const updatedUser = { ...user, firstName, lastName, email, role };
      console.log("Updating user:", updatedUser);
      const result = await client.updateUser(updatedUser);
      console.log("Update result:", result);
      setUser(result || updatedUser);
      setEditing(false);
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user. Check console for details.");
    }
  };


  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  const [user, setUser] = useState<any>({});

  const fetchUser = async () => {
    if (!uid) return;
    const userData = await client.findUserById(uid);
    setUser(userData);
  };

  useEffect(() => {
    if (uid) {
      fetchUser();
    }
  }, [uid]);

  useEffect(() => {
    if (user) {
      setName(`${user.firstName || ""} ${user.lastName || ""}`);
      setEmail(user.email || "");
      setRole(user.role || "");
    }
  }, [user]);

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit" />)}
        {editing && (
          <FaCheck onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save" />)}
        {!editing && (
          <div className="wd-name"
            onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && editing && (
          <FormControl className="w-50 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }
            }} />)}
      </div>
      <b>Email:</b>
      {!editing && <span className="wd-email">{user.email}</span>}
      {editing && (
        <FormControl
          type="email"
          className="wd-edit-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { saveUser(); }
          }}
        />
      )}
      <br />
      <b>Roles:</b>
      {!editing && <span className="wd-roles">{user.role}</span>}
      {editing && (
        <select
          className="form-select wd-edit-role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="FACULTY">FACULTY</option>
          <option value="STUDENT">STUDENT</option>
        </select>
      )}
      <br />
      <b>Login ID:</b>
      <span className="wd-login-id">{user.loginId}</span>
      <br />
      <b>Section:</b>
      <span className="wd-section">{user.section}</span>
      <br />
      <b>Total Activity:</b>
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel" > Cancel </button>
    </div>
  );
}
