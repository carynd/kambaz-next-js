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

export const submitQuizAttempt = async (
  courseId: string,
  quizId: string,
  answers: any[],
  score: number,
  totalPoints: number
) => {
  const response = await fetch(
    `${QUIZZES_API}/${courseId}/quizzes/${quizId}/submit`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, score, totalPoints }),
    }
  );
  return response.json();
};

export const getStudentAttempts = async (quizId: string) => {
  const response = await fetch(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts`,
    {
      credentials: "include",
    }
  );
  return response.json();
};

export const getLastStudentAttempt = async (quizId: string) => {
  const response = await fetch(
    `${HTTP_SERVER}/api/quizzes/${quizId}/last-attempt`,
    {
      credentials: "include",
    }
  );
  return response.json();
};

export const getAttemptCount = async (quizId: string) => {
  const response = await fetch(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempt-count`,
    {
      credentials: "include",
    }
  );
  return response.json();
};

export const getQuizAvailability = async (quizId: string) => {
  const response = await fetch(
    `${HTTP_SERVER}/api/quizzes/${quizId}/availability`,
    {
      credentials: "include",
    }
  );
  return response.json();
};
