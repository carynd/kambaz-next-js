import { createSlice } from "@reduxjs/toolkit";

const initialState: { quizzes: any[] } = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes.push(action.payload);
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz: any) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz: any) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        }
        return quiz;
      });
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;
