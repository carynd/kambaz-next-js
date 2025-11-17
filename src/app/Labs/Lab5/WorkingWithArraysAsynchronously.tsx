"use client";

import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  editing?: boolean;
};

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    const fetchedTodos = await client.fetchTodos();
    setTodos(fetchedTodos);
  };

  const createNewTodo = async () => {
    try {
      const fetchedTodos = await client.createNewTodo();
      setTodos(fetchedTodos);
      setErrorMessage(null);
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(axiosError.response?.data?.message || "Error creating todo");
      console.error("Error creating todo:", error);
    }
  };

  const postNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
      });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setErrorMessage(null);
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(axiosError.response?.data?.message || "Error creating todo");
      console.error("Error creating todo:", error);
    }
  };

  const editTodo = (todo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...todo, editing: true } : t
      )
    );
  };

  const updateTodo = async (todo: Todo) => {
    try {
      await client.updateTodo(todo);
      setTodos((prevTodos) => prevTodos.map((t) => (t.id === todo.id ? todo : t)));
      setErrorMessage(null);
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(axiosError.response?.data?.message || "Error updating todo");
    }
  };

  const removeTodo = async (todo: Todo) => {
    try {
      const removedTodos = await client.removeTodo(todo);
      setTodos(removedTodos);
      setErrorMessage(null);
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(axiosError.response?.data?.message || "Error removing todo");
    }
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
      setErrorMessage(null);
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(axiosError.response?.data?.message || "Error deleting todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3 ms-2"
          id="wd-create-todo"
          style={{ cursor: "pointer" }}
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3"
          id="wd-post-todo"
          style={{ cursor: "pointer" }}
        />
      </h4>
      {errorMessage && (
        <div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem
            key={todo.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center flex-grow-1 gap-2">
              <input
                type="checkbox"
                id={`wd-todo-checkbox-${todo.id}`}
                className="form-check-input"
                checked={todo.completed}
                onChange={(e) =>
                  updateTodo({ ...todo, completed: e.target.checked })
                }
              />
              {!todo.editing ? (
                <label
                  htmlFor={`wd-todo-checkbox-${todo.id}`}
                  className="mb-0"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#888" : "#000",
                  }}
                >
                  {todo.title}
                </label>
              ) : (
                <FormControl
                  id={`wd-edit-todo-title-${todo.id}`}
                  value={todo.title}
                  className="w-50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo({ ...todo, editing: false });
                    }
                  }}
                  onChange={(e) =>
                    setTodos((prevTodos) =>
                      prevTodos.map((t) =>
                        t.id === todo.id ? { ...todo, title: e.target.value } : t
                      )
                    )
                  }
                  autoFocus
                />
              )}
            </div>
            <div className="d-flex gap-2">
              <FaPencil
                onClick={() => editTodo(todo)}
                className="text-primary"
                id={`wd-edit-todo-${todo.id}`}
                style={{ cursor: "pointer" }}
              />
              <FaTrash
                onClick={() => removeTodo(todo)}
                className="text-danger"
                id={`wd-remove-todo-${todo.id}`}
                style={{ cursor: "pointer" }}
              />
              <TiDelete
                onClick={() => deleteTodo(todo)}
                className="text-danger fs-4"
                id={`wd-delete-todo-${todo.id}`}
                style={{ cursor: "pointer" }}
              />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
