"use client";
/* eslint-disable react/jsx-key */
import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ListGroup } from "react-bootstrap";
export default function TodoList() {
    const { todos } = useSelector((state: RootState) => state.todosReducer);
    return (
        <div id="wd-todo-list-redux">
            <h2>Todo List</h2>
            <ListGroup>
                <TodoForm />
                {todos.map((todo: { id: string; title: string }) => (
                    <TodoItem todo={todo} />
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}

