"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({ role: "STUDENT" });
  const dispatch = useDispatch();
  const router = useRouter();
  const signup = async () => {
    const currentUser = await client.signup(user);
    if (!currentUser) return;
    dispatch(setCurrentUser(currentUser));
    router.push("/Account/Profile");
  };
  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username b-2" placeholder="username" />
      <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2" placeholder="password" type="password" />
      <div className="mb-2">
        <label className="d-block mb-2">Role:</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="roleStudent"
            value="STUDENT"
            checked={user.role === "STUDENT"}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          />
          <label className="form-check-label" htmlFor="roleStudent">
            Student
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="roleFaculty"
            value="FACULTY"
            checked={user.role === "FACULTY"}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          />
          <label className="form-check-label" htmlFor="roleFaculty">
            Faculty
          </label>
        </div>
      </div>
      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
      <Link href="/Account/Signin" className="wd-signin-link">Sign in</Link>
    </div>
  );
}

