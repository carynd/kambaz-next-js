import { createSlice } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";

const getInitialEnrollments = () => {
  if (typeof window === "undefined") {
    return [];
  }
  const saved = localStorage.getItem("enrollments");
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  enrollments: getInitialEnrollments(),
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
      }
    },
    enrollCourse: (state, { payload: { userId, courseId } }) => {
      const newEnrollment = {
        _id: `${Date.now()}`,
        user: userId,
        course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
      if (typeof window !== "undefined") {
        localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
      }
    },
    unenrollCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === userId && e.course === courseId)
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
      }
    },
  },
});

export const { setEnrollments, enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
