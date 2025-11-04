"use client";
import dynamicImport from "next/dynamic";

const TodoList = dynamicImport(() => import("./todos/TodoList"), { ssr: false });
const CounterRedux = dynamicImport(() => import("./CounterRedux"), { ssr: false });
const HelloRedux = dynamicImport(() => import("./HelloRedux"), { ssr: false });
const AddRedux = dynamicImport(() => import("./AddRedux"), { ssr: false });

export default function ReduxExamples() {
    return (
        <div>
            <h2>Redux Examples</h2>
            <HelloRedux />
            <CounterRedux />
            <AddRedux />
            <TodoList />
        </div>
    );
};
