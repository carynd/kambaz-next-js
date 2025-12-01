import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import quizzesReducer from "./Courses/[cid]/Quizzes/reducer";
import enrollmentsReducer from "./Dashboard/enrollmentsReducer";

const store = configureStore({
    reducer: {
        coursesReducer,
        accountReducer,
        modulesReducer,
        assignmentsReducer,
        quizzesReducer,
        enrollmentsReducer,
    },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
