import axios, { AxiosError } from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  try {
    console.log("Attempting signin with credentials:", { username: credentials.username });
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    console.log("Signin successful:", response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Signin error status:", axiosError.response?.status);
    console.error("Signin error data:", axiosError.response?.data);
    console.error("Signin error message:", axiosError.message);
    alert(`Signin failed: ${axiosError.response?.data?.message || axiosError.message}`);
    return null;
  }
};

export const profile = async () => {
  try {
    console.log("Fetching user profile from server");
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    console.log("Profile fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Profile fetch error status:", axiosError.response?.status);
    console.error("Profile fetch error data:", axiosError.response?.data);
    console.error("Profile fetch error message:", axiosError.message);
    return null;
  }
};

export const signup = async (user: any) => {
  try {
    console.log("Attempting signup with username:", user.username);
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    console.log("Signup successful:", response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Signup error status:", axiosError.response?.status);
    console.error("Signup error data:", axiosError.response?.data);
    console.error("Signup error message:", axiosError.message);
    alert(`Signup failed: ${axiosError.response?.data?.message || axiosError.message}`);
    return null;
  }
};

export const signout = async () => {
  try {
    console.log("Logging out user");
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    console.log("Logout successful:", response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Logout error status:", axiosError.response?.status);
    console.error("Logout error data:", axiosError.response?.data);
    console.error("Logout error message:", axiosError.message);
    return null;
  }
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const logout = async () => {
  try {
    console.log("Logging out user");
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    console.log("Logout successful:", response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Logout error status:", axiosError.response?.status);
    console.error("Logout error data:", axiosError.response?.data);
    console.error("Logout error message:", axiosError.message);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}/me`);
    return response.data;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};

export const updateProfile = async (userId: string, updates: any) => {
  try {
    const response = await axiosWithCredentials.put(`${USERS_API}/${userId}`, updates);
    return response.data;
  } catch (error) {
    console.error("Update profile error:", error);
    return null;
  }
};

export const findAllUsers = async () => {
  try {
    const response = await axiosWithCredentials.get(USERS_API);
    return response.data;
  } catch (error) {
    console.error("Find all users error:", error);
    return [];
  }
};

export const findUserById = async (id: string) => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Find user by ID error:", error);
    return null;
  }
};

export const findUsersByRole = async (role: string) => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
    return response.data;
  } catch (error) {
    console.error("Find users by role error:", error);
    return [];
  }
};

export const findUsersByPartialName = async (name: string) => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
    return response.data;
  } catch (error) {
    console.error("Find users by partial name error:", error);
    return [];
  }
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete( `${USERS_API}/${userId}` );
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}`, user);
  return response.data;
};

