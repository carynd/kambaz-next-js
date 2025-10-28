"use client";

import { Provider } from "react-redux";
import { ReactNode, useEffect, useState } from "react";
import { configureStore } from "@reduxjs/toolkit";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Create store only on client
    async function initStore() {
      try {
        const helloReducer = (await import("./Lab4/ReduxExamples/HelloRedux/helloReducer")).default;
        const counterReducer = (await import("./Lab4/ReduxExamples/CounterRedux/counterReducer")).default;
        const addReducer = (await import("./Lab4/ReduxExamples/AddRedux/addReducer")).default;
        const todosReducer = (await import("./Lab4/ReduxExamples/todos/todosReducer")).default;

        const newStore = configureStore({
          reducer: {
            helloReducer,
            counterReducer,
            addReducer,
            todosReducer
          }
        });
        setStore(newStore);
      } catch (error) {
        console.error("Failed to initialize store:", error);
      }
      setMounted(true);
    }
    initStore();
  }, []);

  if (!mounted || !store) {
    return <>{children}</>;
  }

  return <Provider store={store}>{children}</Provider>;
}
