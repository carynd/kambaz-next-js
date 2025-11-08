"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      alert("Invalid credentials!");
      return;
    }

    dispatch(setCurrentUser(user));
    router.push("/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        value={credentials.username || ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        id="wd-username"
        placeholder="Enter your username"
        className="mb-2"
      />
      <FormControl
        value={credentials.password || ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        id="wd-password"
        placeholder="Enter your password"
        type="password"
        className="mb-2"
      />

      <Button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/Account/Signup">Sign up</Link>
    </div>
  );
}
