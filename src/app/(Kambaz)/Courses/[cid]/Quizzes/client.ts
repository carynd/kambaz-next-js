import { HTTP_SERVER } from "../../../Account/client";

const QUIZZES_API = `${HTTP_SERVER}/api/courses`;

export const fetchQuizzesForCourse = async (courseId: string) => {
  const response = await fetch(`${QUIZZES_API}/${courseId}/quizzes`, {
    credentials: "include",
  });
  return response.json();
};

export const fetchQuizById = async (quizId: string) => {
  const response = await fetch(`${HTTP_SERVER}/api/quizzes/${quizId}`, {
    credentials: "include",
  });
  return response.json();
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await fetch(`${QUIZZES_API}/${courseId}/quizzes`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quiz),
  });
  return response.json();
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await fetch(`${HTTP_SERVER}/api/quizzes/${quizId}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quiz),
  });
  return response.json();
};

export const deleteQuiz = async (quizId: string) => {
  const response = await fetch(`${HTTP_SERVER}/api/quizzes/${quizId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

export const publishQuiz = async (quizId: string) => {
  const response = await fetch(`${HTTP_SERVER}/api/quizzes/${quizId}/publish`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const unpublishQuiz = async (quizId: string) => {
  const response = await fetch(`${HTTP_SERVER}/api/quizzes/${quizId}/unpublish`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
