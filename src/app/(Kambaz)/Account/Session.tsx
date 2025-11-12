"use client";
import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      console.log("Session: Fetching user profile from server");
      const currentUser = await client.profile();
      if (currentUser) {
        console.log("Session: Profile loaded, setting current user");
        dispatch(setCurrentUser(currentUser));
      } else {
        console.log("Session: No user profile found, user not authenticated");
        dispatch(setCurrentUser(null));
      }
    } catch (err: any) {
      console.error("Session: Error fetching profile:", err);
      dispatch(setCurrentUser(null));
    }
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    return <div>Loading...</div>;
  }

  return children;
}
