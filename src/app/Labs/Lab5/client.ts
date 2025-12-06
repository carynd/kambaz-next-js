import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER_QUIZZES || process.env.NEXT_PUBLIC_HTTP_SERVER_A6 || process.env.NEXT_PUBLIC_HTTP_SERVER;

export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;
export const fetchAssignment = async () => {
  const response = await axios.get(`${ASSIGNMENT_API}`);
  return response.data;
};

export const updateTitle = async (title: string) => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data;
};

const TODOS_API = `${HTTP_SERVER}/lab5/todos`;
export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data;
};

export const fetchTodoById = async (id: number) => {
  const response = await axios.get(`${TODOS_API}/${id}`);
  return response.data;
};

export const createTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};

export const updateTodoTitle = async (id: number, title: string) => {
  const response = await axios.get(`${TODOS_API}/${id}/title/${title}`);
  return response.data;
};

export const updateTodoDescription = async (id: number, description: string) => {
  const response = await axios.get(`${TODOS_API}/${id}/description/${description}`);
  return response.data;
};

export const updateTodoCompleted = async (id: number, completed: boolean) => {
  const response = await axios.get(`${TODOS_API}/${id}/completed/${completed}`);
  return response.data;
};

export const createNewTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};

export const postNewTodo = async (todo: any) => {
  const response = await axios.post(`${TODOS_API}`, todo);
  return response.data;
};

export const removeTodo = async (todo: any) => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};

export const deleteTodo = async (todo: any) => {
  const response = await axios.delete(`${TODOS_API}/${todo.id}`);
  return response.data;
};

export const updateTodo = async (todo: any) => {
  const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
  return response.data;
};
