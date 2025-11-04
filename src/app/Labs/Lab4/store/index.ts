import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../ReduxExamples/CounterRedux/counterRedux";
import addReducer from "../ReduxExamples/AddRedux/addReducer";
import todosReducer from "../ReduxExamples/todos/todosReducer";

let store: any = null;

const createStore = () => {
  if (!store) {
    store = configureStore({
      reducer: {
        helloReducer,
        counterReducer,
        addReducer,
        todosReducer
      }
    });
  }
  return store;
};

// Only create store on client side
if (typeof window !== 'undefined') {
  createStore();
}

export default store;
export type RootState = ReturnType<typeof store.getState>;

