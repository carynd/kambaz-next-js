"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
    const API = `${HTTP_SERVER}/lab5/todos`;
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    return (
        <div id="wd-working-with-arrays">
            <h2>Working with Arrays</h2>

            <h3>Retrieving Arrays</h3>
            <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
                Get Todos
            </a>
            <hr />

            <h3>Retrieving an Item from an Array by ID</h3>
            <a
                id="wd-retrieve-todo-by-id"
                className="btn btn-primary float-end"
                href={`${API}/${todo.id}`}
            >
                Get Todo by ID
            </a>
            <FormControl
                id="wd-todo-id"
                defaultValue={todo.id}
                className="w-25 float-start me-2"
                onChange={(e) => setTodo({ ...todo, id: e.target.value })}
            />
            <br />
            <br />
            <hr />

            <h3>Filtering Array Items</h3>
            <a
                id="wd-retrieve-completed-todos"
                className="btn btn-primary"
                href={`${API}?completed=true`}
            >
                Get Completed Todos
            </a>
            <hr />

            <a
                id="wd-retrieve-incomplete-todos"
                className="btn btn-primary"
                href={`${API}?completed=false`}
            >
                Get Incomplete Todos
            </a>
            <hr />

            <h3>Creating new Items in an Array</h3>
            <a
                id="wd-create-todo"
                className="btn btn-primary"
                href={`${API}/create`}
            >
                Create Todo
            </a>
            <hr />

            <h3>Removing from an Array</h3>
            <a
                id="wd-remove-todo"
                className="btn btn-primary float-end"
                href={`${API}/${todo.id}/delete`}
            >
                Remove Todo with ID = {todo.id}
            </a>
            <FormControl
                id="wd-todo-id-remove"
                defaultValue={todo.id}
                className="w-50"
                onChange={(e) => setTodo({ ...todo, id: e.target.value })}
            />
            <br />
            <br />
            <hr />

            <h3>Updating an Item in an Array</h3>
            <a
                id="wd-update-todo-title"
                href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
                className="btn btn-primary float-end"
            >
                Update Todo
            </a>
            <FormControl
                id="wd-todo-id-update"
                defaultValue={todo.id}
                className="w-25 float-start me-2"
                onChange={(e) => setTodo({ ...todo, id: e.target.value })}
            />
            <FormControl
                id="wd-todo-title-update"
                defaultValue={todo.title}
                className="w-50 float-start"
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <br />
            <br />
            <hr />

            <h3>5.2.4.7: Updating Todo Completed and Description</h3>

            <h4>Complete Todo ID = 1</h4>
            <div className="mb-3">
                <FormControl
                    id="wd-todo-id-completed-7"
                    type="number"
                    defaultValue="1"
                    className="w-50 mb-2"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        id="wd-todo-completed-7"
                        className="form-check-input"
                    />
                    <label htmlFor="wd-todo-completed-7" className="form-check-label">
                        Complete Todo ID = {todo.id}
                    </label>
                </div>
                <a
                    id="wd-update-todo-completed"
                    className="btn btn-primary float-end"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        const checkbox = document.getElementById("wd-todo-completed-7") as HTMLInputElement;
                        const completed = checkbox.checked ? "true" : "false";
                        window.location.href = `${API}/${todo.id}/completed/${completed}`;
                    }}
                >
                    Update Completed
                </a>
                <br />
                <br />
                <hr />
            </div>

            <h4>Describe Todo ID = 1</h4>
            <div className="mb-3">
                <FormControl
                    id="wd-todo-id-description-7"
                    type="number"
                    defaultValue="1"
                    className="w-50 mb-2"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <a
                    id="wd-update-todo-description"
                    className="btn btn-primary float-end"
                    href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description || "")}`}
                >
                    Update Description
                </a>
                <FormControl
                    id="wd-todo-description-7"
                    placeholder="New description"
                    value={todo.description || ""}
                    className="w-50"
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                />
                <br />
                <br />
                <hr />
            </div>
        </div>
    );
}
