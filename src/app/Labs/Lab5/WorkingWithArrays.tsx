"use client";

import React, { useState, useEffect } from "react";
import { FormControl, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import styles from "./WorkingWithArrays.module.css";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

type Todo = {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
};

export default function WorkingWithArrays() {
    const API = `${HTTP_SERVER}/lab5/todos`;
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch todos on component mount
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await fetch(API);
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTodo = async () => {
        try {
            const response = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle, completed: false }),
            });
            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
            setNewTitle("");
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    const handleToggleCompleted = async (todoId: number, currentCompleted: boolean) => {
        try {
            const response = await fetch(`${API}/${todoId}/completed/${!currentCompleted}`);
            const updatedTodos = await response.json();
            setTodos(updatedTodos);
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const handleDeleteTodo = async (todoId: number) => {
        try {
            await fetch(`${API}/${todoId}`, { method: "DELETE" });
            setTodos(todos.filter((t) => t.id !== todoId));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>

            <h4>Todo List with Cancel (Strikethrough) and Delete</h4>
            <div className="mb-3">
                <div className="d-flex gap-2 mb-3">
                    <FormControl
                        id="wd-new-todo-title"
                        placeholder="Enter new todo title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleCreateTodo()}
                    />
                    <Button
                        id="wd-create-todo-button"
                        variant="primary"
                        onClick={handleCreateTodo}
                    >
                        Create Todo
                    </Button>
                </div>

                {loading ? (
                    <p>Loading todos...</p>
                ) : (
                    <ListGroup>
                        {todos.map((todo) => (
                            <ListGroupItem
                                key={todo.id}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div className="d-flex align-items-center flex-grow-1">
                                    <input
                                        type="checkbox"
                                        id={`wd-todo-${todo.id}`}
                                        className="form-check-input me-2"
                                        checked={todo.completed}
                                        onChange={() =>
                                            handleToggleCompleted(todo.id, todo.completed)
                                        }
                                    />
                                    <label
                                        htmlFor={`wd-todo-${todo.id}`}
                                        className={`mb-0 flex-grow-1 ${
                                            todo.completed ? styles.completedTodo : ""
                                        }`}
                                    >
                                        {todo.title}
                                        {todo.description && (
                                            <small className="ms-2 text-muted">
                                                ({todo.description})
                                            </small>
                                        )}
                                    </label>
                                </div>
                                <Button
                                    id={`wd-delete-todo-${todo.id}`}
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    Delete
                                </Button>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </div>

            <hr />

            <h4>API Reference</h4>
            <div className="mb-3">
                <h5>Get All Todos</h5>
                <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
                    Get Todos
                </a>
                <hr />

                <h5>Filter Completed Todos</h5>
                <a
                    id="wd-retrieve-completed-todos"
                    className="btn btn-primary"
                    href={`${API}?completed=true`}
                >
                    Get Completed Todos
                </a>
                <hr />

                <h5>Filter Incomplete Todos</h5>
                <a
                    id="wd-retrieve-incomplete-todos"
                    className="btn btn-primary"
                    href={`${API}?completed=false`}
                >
                    Get Incomplete Todos
                </a>
            </div>
        </div>
    );
}
