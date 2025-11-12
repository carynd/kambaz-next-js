"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setCurrentUser } from "../reducer";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const saveProfile = () => {
    dispatch(setCurrentUser(profile));
  };

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    if (!updatedProfile) return;
    dispatch(setCurrentUser(updatedProfile));
    alert("Profile updated successfully!");
  };

  const handleSignout = async () => {
    try {
      console.log("Signing out user...");
      await client.signout();
      dispatch(setCurrentUser(null));
      router.push("/Account/Signin");
    } catch (err) {
      console.error("Signout error:", err);
      dispatch(setCurrentUser(null));
      router.push("/Account/Signin");
    }
  };

  useEffect(() => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  }, [currentUser]);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl id="wd-username" className="mb-2"
            value={profile.username || ""}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            placeholder="Username"
          />
          <FormControl id="wd-password" className="mb-2"
            value={profile.password || ""}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            placeholder="Password"
          />
          <FormControl id="wd-firstname" className="mb-2"
            value={profile.firstName || ""}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            placeholder="First Name"
          />
          <FormControl id="wd-lastname" className="mb-2"
            value={profile.lastName || ""}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            placeholder="Last Name"
          />
          <FormControl id="wd-dob" className="mb-2" type="date"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl id="wd-email" className="mb-2"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="Email"
          />
          <select className="form-control mb-2" id="wd-role"
            value={profile.role || ""}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
            <option value="">-- Select Role --</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update
          </Button>
          <Button onClick={handleSignout} variant="danger" className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
