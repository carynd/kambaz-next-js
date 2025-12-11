"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { updateQuiz as updateQuizAction } from "../reducer";
import { Button, Nav, Tab } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash, FaTimes, FaCheck, FaQuestionCircle } from "react-icons/fa";
import * as client from "../client";
import TiptapEditor from "./TiptapEditor";

interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-blank";
  title: string;
  points: number;
  question: string;
  correctAnswer?: string;
  choices?: string[];
  possibleAnswers?: string[];
}

export default function QuizDetailsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>({
    _id: "",
    title: "",
    description: "",
    points: 0,
    dueDate: "",
    availableDate: "",
    availableUntilDate: "",
    published: false,
    numQuestions: 0,
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: false,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
  });

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);

  // Preview Mode State
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Student View State
  const [isStudentTakingQuiz, setIsStudentTakingQuiz] = useState(false);
  const [studentAttemptCount, setStudentAttemptCount] = useState(0);
  const [lastStudentAttempt, setLastStudentAttempt] = useState<any>(null);
  const [studentAnswers, setStudentAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [studentQuizSubmitted, setStudentQuizSubmitted] = useState(false);
  const [studentCurrentQuestionIndex, setStudentCurrentQuestionIndex] = useState(0);
  const [quizAvailability, setQuizAvailability] = useState<any>({ status: "Available", canAccess: true });

  useEffect(() => {
    if (qid && quizzes.length > 0) {
      const foundQuiz = quizzes.find((q: any) => q._id === qid);
      if (foundQuiz) {
        const formattedQuiz = {
          ...foundQuiz,
          dueDate: foundQuiz.dueDate
            ? new Date(foundQuiz.dueDate).toISOString().slice(0, 10)
            : "",
          availableDate: foundQuiz.availableDate
            ? new Date(foundQuiz.availableDate).toISOString().slice(0, 10)
            : "",
          availableUntilDate: foundQuiz.availableUntilDate
            ? new Date(foundQuiz.availableUntilDate).toISOString().slice(0, 10)
            : "",
        };
        setQuiz(formattedQuiz);

        // Load questions from the quiz
        if (foundQuiz.questions && foundQuiz.questions.length > 0) {
          setQuestions(foundQuiz.questions);
        }

        // Fetch availability from backend
        loadQuizAvailability(qid as string);
      }
    }
    setLoading(false);
  }, [qid, quizzes]);

  const loadQuizAvailability = async (quizId: string) => {
    try {
      const availability = await client.getQuizAvailability(quizId);
      setQuizAvailability(availability);
    } catch (error) {
      console.error("Error loading quiz availability:", error);
    }
  };

  // Load student attempt data on mount
  useEffect(() => {
    if (currentUser?.role !== "FACULTY" && qid && currentUser) {
      loadStudentAttemptData();
    }
  }, [qid, currentUser]);

  const loadStudentAttemptData = async () => {
    try {
      const [attemptCount, lastAttempt] = await Promise.all([
        client.getAttemptCount(qid as string),
        client.getLastStudentAttempt(qid as string),
      ]);
      setStudentAttemptCount(attemptCount.count);
      setLastStudentAttempt(lastAttempt);
    } catch (error) {
      console.error("Error loading student attempt data:", error);
    }
  };


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditingQuestionId(null);
    setEditingQuestion(null);
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleSave = async () => {
    try {
      const quizData = {
        ...quiz,
        points: calculateTotalPoints(),
        numQuestions: questions.length,
        questions: questions,
        dueDate: quiz.dueDate ? new Date(quiz.dueDate).toISOString() : null,
        availableDate: quiz.availableDate
          ? new Date(quiz.availableDate).toISOString()
          : null,
        availableUntilDate: quiz.availableUntilDate
          ? new Date(quiz.availableUntilDate).toISOString()
          : null,
      };

      await client.updateQuiz(qid as string, quizData);
      dispatch(updateQuizAction(quizData));
      setIsEditing(false);
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleSaveAndPublish = async () => {
    try {
      const quizData = {
        ...quiz,
        published: true,
        points: calculateTotalPoints(),
        numQuestions: questions.length,
        questions: questions,
        dueDate: quiz.dueDate ? new Date(quiz.dueDate).toISOString() : null,
        availableDate: quiz.availableDate
          ? new Date(quiz.availableDate).toISOString()
          : null,
        availableUntilDate: quiz.availableUntilDate
          ? new Date(quiz.availableUntilDate).toISOString()
          : null,
      };

      await client.updateQuiz(qid as string, quizData);
      dispatch(updateQuizAction(quizData));
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quiz:", error);
    }
  };

  const calculateTotalPoints = () => {
    return questions.reduce((sum, q) => sum + (q.points || 0), 0);
  };

  const addNewQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      type: "multiple-choice",
      title: "",
      points: 1,
      question: "",
      choices: ["", "", "", ""],
      correctAnswer: "0",
    };
    // Don't add to questions array yet - only add when user clicks Save
    setEditingQuestionId("new");
    setEditingQuestion(newQuestion);
  };

  const startEditingQuestion = (question: QuizQuestion) => {
    setEditingQuestionId(question.id);
    setEditingQuestion({ ...question });
  };

  const cancelEditingQuestion = () => {
    // If canceling a new question, don't add it to the array
    setEditingQuestionId(null);
    setEditingQuestion(null);
  };

  const saveQuestion = () => {
    if (editingQuestion) {
      if (editingQuestionId === "new") {
        // This is a new question, add it to the array
        setQuestions([...questions, editingQuestion]);
      } else {
        // This is an existing question, update it
        const updatedQuestions = questions.map((q) =>
          q.id === editingQuestion.id ? editingQuestion : q
        );
        setQuestions(updatedQuestions);
      }
      cancelEditingQuestion();
    }
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
    if (editingQuestionId === questionId) {
      cancelEditingQuestion();
    }
  };

  // Preview Mode Helper Functions
  const startPreview = () => {
    setIsPreviewing(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  const retakePreview = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  // Calculate partial points for a question with multiple parts
  const calculatePartialPoints = (question: QuizQuestion, userAnswer: string | string[]): number => {
    const totalPoints = question.points || 0;

    if (question.type === "multiple-choice") {
      const correctAnswers = question.correctAnswer ? question.correctAnswer.split(",") : [];

      // If only one correct answer, it's all or nothing
      if (correctAnswers.length === 1) {
        return checkAnswer(question, userAnswer) ? totalPoints : 0;
      }

      // Multiple correct answers - partial credit
      const userAnswerStr = typeof userAnswer === 'string' ? userAnswer : userAnswer.join(",");
      const userAnswers = userAnswerStr ? userAnswerStr.split(",") : [];

      const pointsPerChoice = totalPoints / correctAnswers.length;
      let earnedPoints = 0;

      // Add points for each correct selection
      userAnswers.forEach((ans) => {
        if (correctAnswers.includes(ans)) {
          earnedPoints += pointsPerChoice;
        }
      });

      // Deduct points for each incorrect selection
      userAnswers.forEach((ans) => {
        if (!correctAnswers.includes(ans)) {
          earnedPoints -= pointsPerChoice;
        }
      });

      // Ensure points don't go below 0
      return Math.max(0, earnedPoints);
    } else if (question.type === "fill-blank") {
      const numBlanks = question.possibleAnswers?.length || 0;

      // If single blank, it's all or nothing
      if (numBlanks === 1) {
        return checkAnswer(question, userAnswer) ? totalPoints : 0;
      }

      // Multiple blanks - partial credit
      if (Array.isArray(userAnswer)) {
        const pointsPerBlank = totalPoints / numBlanks;
        let earnedPoints = 0;

        userAnswer.forEach((ans, idx) => {
          const correctAnswer = question.possibleAnswers?.[idx]?.toLowerCase().trim();
          const userAns = ans.toLowerCase().trim();
          if (correctAnswer === userAns) {
            earnedPoints += pointsPerBlank;
          }
        });

        return earnedPoints;
      }
    } else if (question.type === "true-false") {
      // True/false is always all or nothing
      return checkAnswer(question, userAnswer) ? totalPoints : 0;
    }

    return 0;
  };

  const checkAnswer = (question: QuizQuestion, userAnswer: string | string[]): boolean => {
    if (question.type === "multiple-choice") {
      // For multiple choice, check if user's answer matches the correct answers
      const correctAnswers = question.correctAnswer ? question.correctAnswer.split(",").sort() : [];
      const userAnswerStr = typeof userAnswer === 'string' ? userAnswer : userAnswer.join(",");
      const userAnswers = userAnswerStr ? userAnswerStr.split(",").sort() : [];

      // For multiple correct answers, user must select ALL correct answers and ONLY correct answers
      if (correctAnswers.length !== userAnswers.length) return false;
      return correctAnswers.every((ans, idx) => ans === userAnswers[idx]);
    } else if (question.type === "true-false") {
      const userAnswerStr = typeof userAnswer === 'string' ? userAnswer : '';
      return userAnswerStr === question.correctAnswer;
    } else if (question.type === "fill-blank") {
      const numBlanks = question.possibleAnswers?.length || 0;

      // If multiple blanks (array of answers)
      if (Array.isArray(userAnswer)) {
        if (userAnswer.length !== numBlanks) return false;

        // Check if each blank answer matches the corresponding correct answer
        // The correct answer for each blank is at the same index in possibleAnswers
        return userAnswer.every((ans, idx) => {
          const correctAnswer = question.possibleAnswers?.[idx]?.toLowerCase().trim();
          const userAns = ans.toLowerCase().trim();
          return correctAnswer === userAns;
        });
      } else {
        // Single blank - check if answer matches any of the possible answers
        const userAnswerLower = userAnswer.toLowerCase().trim();
        return question.possibleAnswers?.some((correctAnswer) => {
          return correctAnswer?.toLowerCase().trim() === userAnswerLower;
        }) || false;
      }
    }
    return false;
  };

  const calculateScore = () => {
    let correctCount = 0;
    let totalPoints = 0;

    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id] || "";
      totalPoints += question.points || 0;
      // Use partial scoring instead of all-or-nothing
      const earnedPoints = calculatePartialPoints(question, userAnswer);
      correctCount += earnedPoints;
    });

    return { correctCount, totalPoints, correctQuestions: Object.keys(userAnswers).filter((qId) => checkAnswer(questions.find((q) => q.id === qId)!, userAnswers[qId])).length };
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const canTakeQuiz = () => {
    if (!quiz.published) return false;

    // Check availability from backend
    if (!quizAvailability.canAccess) return false;

    // Check attempt limits
    if (!quiz.multipleAttempts && studentAttemptCount > 0) return false;
    if (quiz.multipleAttempts && studentAttemptCount >= quiz.howManyAttempts) return false;

    return true;
  };

  const startStudentQuiz = () => {
    setIsStudentTakingQuiz(true);
    setStudentCurrentQuestionIndex(0);
    setStudentAnswers({});
    setStudentQuizSubmitted(false);
  };

  const handleStudentAnswerChange = (questionId: string, answer: string | string[]) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleStudentNextQuestion = () => {
    if (studentCurrentQuestionIndex < questions.length - 1) {
      setStudentCurrentQuestionIndex(studentCurrentQuestionIndex + 1);
    }
  };

  const handleStudentPreviousQuestion = () => {
    if (studentCurrentQuestionIndex > 0) {
      setStudentCurrentQuestionIndex(studentCurrentQuestionIndex - 1);
    }
  };

  const submitStudentQuiz = async () => {
    try {
      // Calculate score based on studentAnswers (not userAnswers) with partial credit
      let correctCount = 0;
      let totalPoints = 0;

      const answers = questions.map((question) => {
        const userAnswer = studentAnswers[question.id] || (question.type === 'fill-blank' && question.possibleAnswers && question.possibleAnswers.length > 1 ? [] : "");
        const isCorrect = checkAnswer(question, userAnswer);
        const earnedPoints = calculatePartialPoints(question, userAnswer);
        totalPoints += question.points || 0;
        correctCount += earnedPoints;

        return {
          questionId: question.id,
          questionType: question.type,
          userAnswer: userAnswer,
          isCorrect: isCorrect,
          pointsEarned: earnedPoints,
        };
      });

      await client.submitQuizAttempt(
        cid as string,
        qid as string,
        answers,
        correctCount,
        totalPoints
      );

      setStudentQuizSubmitted(true);
      await loadStudentAttemptData();
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const retakeStudentQuiz = () => {
    setStudentCurrentQuestionIndex(0);
    setStudentAnswers({});
    setStudentQuizSubmitted(false);
  };

  const backToStudentView = () => {
    setIsStudentTakingQuiz(false);
    setStudentCurrentQuestionIndex(0);
    setStudentAnswers({});
    setStudentQuizSubmitted(false);
  };

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (!quiz._id) {
    return (
      <div className="p-4">
        <p>Quiz not found.</p>
      </div>
    );
  }

  // Student View
  if (currentUser?.role !== "FACULTY") {
    // Student is taking the quiz
    if (isStudentTakingQuiz) {
      if (studentQuizSubmitted) {
        // Show student results - calculate score from studentAnswers with partial credit
        let correctCount = 0;
        let totalPoints = 0;
        let correctQuestions = 0;

        questions.forEach((question) => {
          const userAnswer = studentAnswers[question.id] || "";
          totalPoints += question.points || 0;
          const earnedPoints = calculatePartialPoints(question, userAnswer);
          correctCount += earnedPoints;
          if (checkAnswer(question, userAnswer)) {
            correctQuestions += 1;
          }
        });

        const score = { correctCount, totalPoints, correctQuestions };
        const percentage = score.totalPoints > 0 ? (score.correctCount / score.totalPoints) * 100 : 0;

        // Check if student has exhausted all attempts
        const hasMoreAttempts = canTakeQuiz();
        const showCorrectAnswers = !hasMoreAttempts;

        return (
          <div className="p-4">
            <h5 className="mb-4">Quiz Results</h5>
            <div className="alert alert-info mb-4">
              <div className="row">
                <div className="col-md-4 text-center">
                  <h6 className="text-muted mb-2">Your Score</h6>
                  <h3 className="fw-bold text-success">{score.correctCount}/{score.totalPoints}</h3>
                  <p className="text-muted">{percentage.toFixed(1)}%</p>
                </div>
                <div className="col-md-4 text-center">
                  <h6 className="text-muted mb-2">Questions</h6>
                  <h3 className="fw-bold">{score.correctQuestions}/{questions.length}</h3>
                  <p className="text-muted">Correct</p>
                </div>
                <div className="col-md-4">
                  {hasMoreAttempts ? (
                    <>
                      <Button variant="primary" onClick={retakeStudentQuiz} className="w-100 mb-2">
                        Retake Quiz
                      </Button>
                      <p className="text-muted text-center small mb-2">
                        Attempts: {studentAttemptCount}/{quiz.howManyAttempts || 1}
                      </p>
                    </>
                  ) : (
                    <div className="alert alert-warning mb-2 text-center">
                      <small>
                        {!quiz.multipleAttempts
                          ? "Only one attempt allowed"
                          : `Maximum attempts (${quiz.howManyAttempts}) reached`}
                      </small>
                    </div>
                  )}
                  <Button variant="secondary" onClick={backToStudentView} className="w-100">
                    Back to Quiz
                  </Button>
                </div>
              </div>
            </div>

            {/* Review Questions */}
            {showCorrectAnswers ? (
              <>
                <h6 className="fw-bold mb-3">Review Your Answers</h6>
                {questions.map((question, index) => {
                  const userAnswer = studentAnswers[question.id] || "";
                  const isCorrect = checkAnswer(question, userAnswer);
                  const pointsEarned = calculatePartialPoints(question, userAnswer);
                  return (
                    <div
                      key={question.id}
                      className={`border rounded p-3 mb-3 ${isCorrect ? "border-success bg-success bg-opacity-10" : "border-danger bg-danger bg-opacity-10"}`}
                      style={{ borderWidth: "2px" }}
                    >
                      <div className="mb-2">
                        <span className={`badge ${isCorrect ? "bg-success" : "bg-danger"} me-2`}>
                          {isCorrect ? "✓" : "✗"} Q{index + 1}
                        </span>
                        <strong>{question.title}</strong>
                        <span className={`ms-3 ${isCorrect ? "text-success" : "text-danger"} fw-bold fs-5`}>
                          {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </span>
                      </div>
                      <div className="mb-2" dangerouslySetInnerHTML={{ __html: question.question }} />

                      {question.type === "multiple-choice" && (
                        <div className="mb-2">
                          <small className="text-muted">Your Answer:</small>
                          <p className="mb-1 ms-3">
                            {question.choices?.[parseInt(typeof userAnswer === 'string' ? userAnswer : '')] || "Not answered"}
                            {isCorrect && <span className="text-success ms-2">✓</span>}
                          </p>
                          {!isCorrect && (
                            <>
                              <small className="text-muted">Correct Answer:</small>
                              <p className="mb-0 ms-3 text-success fw-bold">{question.choices?.[parseInt(question.correctAnswer || "")]}</p>
                            </>
                          )}
                        </div>
                      )}

                      {question.type === "true-false" && (
                        <div className="mb-2">
                          <small className="text-muted">Your Answer:</small>
                          <p className="mb-1 ms-3">
                            {typeof userAnswer === 'string' && userAnswer === "true" ? "True" : typeof userAnswer === 'string' && userAnswer === "false" ? "False" : "Not answered"}
                            {isCorrect && <span className="text-success ms-2">✓</span>}
                          </p>
                          {!isCorrect && (
                            <>
                              <small className="text-muted">Correct Answer:</small>
                              <p className="mb-0 ms-3 text-success fw-bold">{question.correctAnswer === "true" ? "True" : "False"}</p>
                            </>
                          )}
                        </div>
                      )}

                      {question.type === "fill-blank" && (
                        <div className="mb-2">
                          <small className="text-muted">Your Answer:</small>
                          {Array.isArray(userAnswer) ? (
                            <div className="ms-3">
                              {userAnswer.map((ans, idx) => {
                                const correctAns = question.possibleAnswers?.[idx] || '';
                                const isBlankCorrect = ans.toLowerCase().trim() === correctAns?.toLowerCase().trim();
                                return (
                                  <div key={idx} className="mb-1">
                                    <strong>Blank {idx + 1}:</strong> &quot;{ans || "Not answered"}&quot;
                                    {isBlankCorrect ? (
                                      <span className="text-success ms-2">✓</span>
                                    ) : (
                                      <span className="text-danger ms-2">
                                        ✗ (Correct: &quot;{correctAns}&quot;)
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="mb-1 ms-3">
                              &quot;{userAnswer || "Not answered"}&quot;
                              {isCorrect && <span className="text-success ms-2">✓</span>}
                            </p>
                          )}
                          {!isCorrect && !Array.isArray(userAnswer) && (
                            <>
                              <small className="text-muted">Acceptable Answers:</small>
                              <ul className="mb-0 ms-3 small text-success fw-bold">
                                {question.possibleAnswers?.map((ans, idx) => (
                                  <li key={idx}>{ans}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      )}

                      <small className="text-muted">Points Earned: {pointsEarned} / {question.points}</small>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="alert alert-info">
                <p className="mb-0">
                  <strong>Note:</strong> Correct answers will be shown after you have used all your attempts.
                  You have {(quiz.howManyAttempts || 1) - studentAttemptCount} attempt(s) remaining.
                </p>
              </div>
            )}

            <hr />
            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={backToStudentView}>
                Back to Quiz
              </Button>
            </div>
          </div>
        );
      } else {
        // Show quiz taking screen
        const currentQuestion = questions[studentCurrentQuestionIndex];
        const userAnswer = studentAnswers[currentQuestion?.id] || "";

        return (
          <div className="container-fluid">
            <div className="row">
              {/* Main Content */}
              <div className="col-lg-9 p-4">
                {/* Quiz Header */}
                <div className="mb-4">
                  <h4 className="mb-2">{quiz.title}</h4>
                  <small className="text-muted">Started: {new Date().toLocaleDateString()}</small>
                </div>

                {/* Quiz Instructions */}
                {quiz.description && (
                  <div className="alert alert-warning mb-4">
                    <strong>Quiz Instructions</strong>
                    <p className="mb-0 mt-2">{quiz.description}</p>
                  </div>
                )}

                {/* Question Card */}
                {currentQuestion && (
                  <div className="border rounded mb-4" style={{ backgroundColor: "#f9f9f9" }}>
                    <div className="border-bottom p-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: "#fff" }}>
                      <h6 className="mb-0">Question {studentCurrentQuestionIndex + 1}</h6>
                      <span className="text-muted">{currentQuestion.points} pts</span>
                    </div>

                    <div className="p-4">
                      <div className="mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

                      {/* Multiple Choice */}
                      {currentQuestion.type === "multiple-choice" && (() => {
                        const correctAnswers = currentQuestion.correctAnswer ? currentQuestion.correctAnswer.split(",") : [];
                        const isMultipleAnswer = correctAnswers.length > 1;
                        const userAnswerStr = typeof userAnswer === 'string' ? userAnswer : '';
                        const selectedAnswers = userAnswerStr ? userAnswerStr.split(",") : [];

                        return (
                          <div>
                            <small className="text-muted mb-2 d-block">
                              {isMultipleAnswer ? "Select all that apply" : "Select one answer"}
                            </small>
                            {currentQuestion.choices?.map((choice, idx) => (
                              <div key={idx} className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type={isMultipleAnswer ? "checkbox" : "radio"}
                                  name={isMultipleAnswer ? undefined : `answer-${currentQuestion.id}`}
                                  id={`answer-${currentQuestion.id}-${idx}`}
                                  value={idx.toString()}
                                  checked={isMultipleAnswer ? selectedAnswers.includes(idx.toString()) : userAnswerStr === idx.toString()}
                                  onChange={(e) => {
                                    if (isMultipleAnswer) {
                                      const newAnswers = e.target.checked
                                        ? [...selectedAnswers, idx.toString()]
                                        : selectedAnswers.filter((a) => a !== idx.toString());
                                      handleStudentAnswerChange(currentQuestion.id, newAnswers.join(","));
                                    } else {
                                      handleStudentAnswerChange(currentQuestion.id, e.target.value);
                                    }
                                  }}
                                />
                                <label className="form-check-label" htmlFor={`answer-${currentQuestion.id}-${idx}`}>
                                  {choice}
                                </label>
                              </div>
                            ))}
                          </div>
                        );
                      })()}

                      {/* True/False */}
                      {currentQuestion.type === "true-false" && (
                        <div>
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`answer-${currentQuestion.id}`}
                              id={`answer-${currentQuestion.id}-true`}
                              value="true"
                              checked={userAnswer === "true"}
                              onChange={(e) => handleStudentAnswerChange(currentQuestion.id, e.target.value)}
                            />
                            <label className="form-check-label" htmlFor={`answer-${currentQuestion.id}-true`}>
                              True
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`answer-${currentQuestion.id}`}
                              id={`answer-${currentQuestion.id}-false`}
                              value="false"
                              checked={userAnswer === "false"}
                              onChange={(e) => handleStudentAnswerChange(currentQuestion.id, e.target.value)}
                            />
                            <label className="form-check-label" htmlFor={`answer-${currentQuestion.id}-false`}>
                              False
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Fill in the Blank */}
                      {currentQuestion.type === "fill-blank" && (
                        <div>
                          {currentQuestion.possibleAnswers && currentQuestion.possibleAnswers.length > 0 ? (
                            currentQuestion.possibleAnswers.map((_, blankIdx) => {
                              const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [];
                              return (
                                <div key={blankIdx} className="mb-2">
                                  <label className="form-label small">Blank {blankIdx + 1}:</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={userAnswerArray[blankIdx] || ''}
                                    onChange={(e) => {
                                      const newAnswers = [...userAnswerArray];
                                      newAnswers[blankIdx] = e.target.value;
                                      // Ensure array has correct length
                                      while (newAnswers.length < (currentQuestion.possibleAnswers?.length || 0)) {
                                        newAnswers.push('');
                                      }
                                      handleStudentAnswerChange(currentQuestion.id, newAnswers);
                                    }}
                                    placeholder={`Enter answer for blank ${blankIdx + 1}`}
                                  />
                                </div>
                              );
                            })
                          ) : (
                            <input
                              type="text"
                              className="form-control"
                              value={typeof userAnswer === 'string' ? userAnswer : ''}
                              onChange={(e) => handleStudentAnswerChange(currentQuestion.id, e.target.value)}
                              placeholder="Enter your answer here"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="d-flex justify-content-end mb-4">
                  {studentCurrentQuestionIndex < questions.length - 1 && (
                    <Button variant="outline-secondary" onClick={handleStudentNextQuestion}>
                      Next <span>&gt;</span>
                    </Button>
                  )}
                </div>

                {/* Footer */}
                <div className="border-top pt-3 mt-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <FaCheck className="me-2" />
                      Keep Working This Quiz
                    </small>
                    <Button variant="outline-secondary" onClick={submitStudentQuiz}>
                      Submit Quiz
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar - Questions List */}
              <div className="col-lg-3 p-4 border-start" style={{ backgroundColor: "#fff" }}>
                <h6 className="mb-3">Questions</h6>
                <div className="list-group">
                  {questions.map((q, idx) => {
                    const answer = studentAnswers[q.id];
                    const answered = answer !== undefined && (Array.isArray(answer) ? answer.some(a => a !== "") : answer !== "");
                    const isActive = idx === studentCurrentQuestionIndex;
                    return (
                      <button
                        key={q.id}
                        className="list-group-item list-group-item-action d-flex align-items-center"
                        onClick={() => setStudentCurrentQuestionIndex(idx)}
                        style={{
                          border: "none",
                          borderRadius: "0",
                          backgroundColor: "transparent",
                          color: "#dc3545",
                          fontWeight: isActive ? "bold" : "normal",
                        }}
                      >
                        <FaQuestionCircle className="me-2" size={14} style={{ color: "#6c757d" }} />
                        {answered && <FaCheck className="me-2" size={12} />}
                        Question {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    // Show quiz overview for students
    return (
      <div className="text-center p-5">
        <h2>{quiz.title}</h2>
        <p className="text-muted mt-3">{quiz.description}</p>

        {/* Availability Status */}
        <div className="alert alert-info mt-4">
          <p className={`mb-0 ${quizAvailability.status === "Closed" ? "text-danger" :
            quizAvailability.status.includes("Not available") ? "text-warning" :
              "text-success"
            }`}>
            <strong>{quizAvailability.status}</strong>
          </p>
        </div>

        {quiz.published && quizAvailability.canAccess ? (
          <>
            {lastStudentAttempt && (
              <div className="alert alert-info mt-4">
                <p className="mb-2">
                  <strong>Last Attempt:</strong> {new Date(lastStudentAttempt.submittedAt).toLocaleDateString()}
                </p>
                <p className="mb-0">
                  <strong>Score:</strong> {lastStudentAttempt.score}/{lastStudentAttempt.totalPoints} ({lastStudentAttempt.percentageScore?.toFixed(1)}%)
                </p>
              </div>
            )}

            <div className="mt-4">
              {studentAttemptCount > 0 && (
                <p className="text-muted mb-3">
                  Attempts: {studentAttemptCount}/{quiz.howManyAttempts}
                </p>
              )}
              <Button
                variant="primary"
                size="lg"
                className="mt-2"
                onClick={startStudentQuiz}
                disabled={!canTakeQuiz()}
              >
                {studentAttemptCount > 0 ? "Retake Quiz" : "Take Quiz"}
              </Button>
              {!canTakeQuiz() && studentAttemptCount > 0 && (
                <p className="text-danger mt-3">You have used all available attempts.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-danger mt-4">
            {!quiz.published
              ? "This quiz is not yet available."
              : `Quiz is ${quizAvailability.status.toLowerCase()}`}
          </p>
        )}

        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
          >
            Back to Quizzes
          </Button>
        </div>
      </div>
    );
  }

  // Faculty View
  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0">{quiz.title || "Unnamed Quiz"}</h4>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <span className="text-muted">
            <strong>Points:</strong> {calculateTotalPoints() || 0}
          </span>
          <span className={quiz.published ? "text-success" : "text-danger"}>
            <strong>Status:</strong> {quiz.published ? "Published" : "Not Published"}
          </span>
        </div>
      </div>

      {/* Preview/Edit Buttons */}
      <div className="d-flex justify-content-center mb-3">
        <div className="d-flex gap-2">
          {!isEditing && !isPreviewing && (
            <>
              <Button
                variant="light"
                size="sm"
                onClick={startPreview}
                disabled={questions.length === 0}
                title={questions.length === 0 ? "Add questions to preview" : "Preview this quiz"}
                style={{
                  backgroundColor: "#f8f9fa",
                  color: "#000",
                  border: "1px solid #dee2e6",
                  padding: "0.375rem 0.75rem",
                }}
              >
                Preview
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={handleEdit}
                style={{
                  backgroundColor: "#f8f9fa",
                  color: "#dc3545",
                  border: "1px solid #dee2e6",
                  padding: "0.375rem 0.75rem",
                }}
              >
                <FaEdit className="me-1" /> Edit
              </Button>
            </>
          )}
        </div>
      </div>

      <hr />

      {isPreviewing ? (
        // Quiz Taking/Results Screen
        quizSubmitted ? (
          // Results Screen
          <div>
            <h5 className="mb-4">Quiz Results</h5>
            {(() => {
              const score = calculateScore();
              const percentage = score.totalPoints > 0 ? (score.correctCount / score.totalPoints) * 100 : 0;
              return (
                <>
                  <div className="alert alert-info mb-4">
                    <div className="row">
                      <div className="col-md-4 text-center">
                        <h6 className="text-muted mb-2">Your Score</h6>
                        <h3 className="fw-bold text-success">{score.correctCount}/{score.totalPoints}</h3>
                        <p className="text-muted">{percentage.toFixed(1)}%</p>
                      </div>
                      <div className="col-md-4 text-center">
                        <h6 className="text-muted mb-2">Questions</h6>
                        <h3 className="fw-bold">{score.correctQuestions}/{questions.length}</h3>
                        <p className="text-muted">Correct</p>
                      </div>
                      <div className="col-md-4">
                        <Button variant="primary" onClick={retakePreview} className="w-100 mb-2">
                          Retake Preview
                        </Button>
                        <Button variant="warning" onClick={() => setIsPreviewing(false)} className="w-100">
                          Back to Quiz
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Review Questions */}
                  <h6 className="fw-bold mb-3">Review Your Answers</h6>
                  {questions.map((question, index) => {
                    const userAnswer = userAnswers[question.id] || "";
                    const isCorrect = checkAnswer(question, userAnswer);
                    const pointsEarned = calculatePartialPoints(question, userAnswer);
                    return (
                      <div key={question.id} className={`border rounded p-3 mb-3 ${isCorrect ? "border-success" : "border-danger"}`}>
                        <div className="mb-2">
                          <span className={`badge ${isCorrect ? "bg-success" : "bg-danger"} me-2`}>Q{index + 1}</span>
                          <strong>{question.title}</strong>
                          <span className={`ms-3 ${isCorrect ? "text-success" : "text-danger"} fw-bold`}>
                            {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                          </span>
                        </div>
                        <div className="mb-2" dangerouslySetInnerHTML={{ __html: question.question }} />

                        {question.type === "multiple-choice" && (
                          <div className="mb-2">
                            <small className="text-muted">Your Answer:</small>
                            <p className="mb-1 ms-3">
                              {question.choices?.[parseInt(typeof userAnswer === 'string' ? userAnswer : '')] || "Not answered"}
                              {isCorrect && <span className="text-success ms-2">✓</span>}
                            </p>
                            {!isCorrect && (
                              <>
                                <small className="text-muted">Correct Answer(s):</small>
                                <div className="ms-3 text-success fw-bold">
                                  {question.correctAnswer?.split(",").map((idx) => (
                                    <div key={idx}>{question.choices?.[parseInt(idx)]}</div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        {question.type === "true-false" && (
                          <div className="mb-2">
                            <small className="text-muted">Your Answer:</small>
                            <p className="mb-1 ms-3">
                              {typeof userAnswer === 'string' && userAnswer === "true" ? "True" : typeof userAnswer === 'string' && userAnswer === "false" ? "False" : "Not answered"}
                              {isCorrect && <span className="text-success ms-2">✓</span>}
                            </p>
                            {!isCorrect && (
                              <>
                                <small className="text-muted">Correct Answer:</small>
                                <p className="mb-0 ms-3 text-success fw-bold">{question.correctAnswer === "true" ? "True" : "False"}</p>
                              </>
                            )}
                          </div>
                        )}

                        {question.type === "fill-blank" && (
                          <div className="mb-2">
                            <small className="text-muted">Your Answer:</small>
                            {Array.isArray(userAnswer) ? (
                              <div className="ms-3">
                                {userAnswer.map((ans, idx) => {
                                  const correctAns = question.possibleAnswers?.[idx] || '';
                                  const isBlankCorrect = ans.toLowerCase().trim() === correctAns?.toLowerCase().trim();
                                  return (
                                    <div key={idx} className="mb-1">
                                      <strong>Blank {idx + 1}:</strong> &quot;{ans || "Not answered"}&quot;
                                      {isBlankCorrect ? (
                                        <span className="text-success ms-2">✓</span>
                                      ) : (
                                        <span className="text-danger ms-2">
                                          ✗ (Correct: &quot;{correctAns}&quot;)
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="mb-1 ms-3">
                                &quot;{typeof userAnswer === 'string' ? userAnswer : "Not answered"}&quot;
                                {isCorrect && <span className="text-success ms-2">✓</span>}
                              </p>
                            )}
                            {!isCorrect && !Array.isArray(userAnswer) && (
                              <>
                                <small className="text-muted">Acceptable Answers:</small>
                                <ul className="mb-0 ms-3 small text-success fw-bold">
                                  {question.possibleAnswers?.map((ans, idx) => (
                                    <li key={idx}>{ans}</li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        )}

                        <small className="text-muted">Points Earned: {pointsEarned} / {question.points}</small>
                      </div>
                    );
                  })}

                  <hr />
                  <div className="d-flex gap-2 justify-content-between">
                    <Button variant="secondary" onClick={() => setIsPreviewing(false)}>
                      Back to Quiz
                    </Button>
                    <Button variant="warning" href={`/Courses/${cid}/Quizzes/${qid}`} onClick={() => setIsEditing(true)}>
                      Edit Quiz
                    </Button>
                  </div>
                </>
              );
            })()}
          </div>
        ) : (
          // Quiz Taking Screen
          <div>
            <h5 className="mb-4">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h5>
            <div className="progress mb-4">
              <div
                className="progress-bar"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {questions.length > 0 && (
              <div className="border rounded p-4 mb-4 bg-light">
                {(() => {
                  const question = questions[currentQuestionIndex];
                  const userAnswer = userAnswers[question.id] || "";

                  return (
                    <>
                      <h6 className="fw-bold mb-3">{question.title}</h6>
                      <div className="mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />

                      {question.type === "multiple-choice" && (() => {
                        const correctAnswers = question.correctAnswer ? question.correctAnswer.split(",") : [];
                        const isMultipleAnswer = correctAnswers.length > 1;
                        const userAnswerStr = typeof userAnswer === 'string' ? userAnswer : '';
                        const selectedAnswers = userAnswerStr ? userAnswerStr.split(",") : [];

                        return (
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              {isMultipleAnswer ? "Select all that apply:" : "Select your answer:"}
                            </label>
                            {question.choices?.map((choice, idx) => (
                              <div key={idx} className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type={isMultipleAnswer ? "checkbox" : "radio"}
                                  name={isMultipleAnswer ? undefined : `answer-${question.id}`}
                                  id={`answer-${question.id}-${idx}`}
                                  value={idx.toString()}
                                  checked={isMultipleAnswer ? selectedAnswers.includes(idx.toString()) : userAnswerStr === idx.toString()}
                                  onChange={(e) => {
                                    if (isMultipleAnswer) {
                                      const newAnswers = e.target.checked
                                        ? [...selectedAnswers, idx.toString()]
                                        : selectedAnswers.filter((a: string) => a !== idx.toString());
                                      handleAnswerChange(question.id, newAnswers.join(","));
                                    } else {
                                      handleAnswerChange(question.id, e.target.value);
                                    }
                                  }}
                                />
                                <label className="form-check-label" htmlFor={`answer-${question.id}-${idx}`}>
                                  {choice}
                                </label>
                              </div>
                            ))}
                          </div>
                        );
                      })()}

                      {question.type === "true-false" && (
                        <div className="mb-3">
                          <label className="form-label fw-bold">Select your answer:</label>
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`answer-${question.id}`}
                              id={`answer-${question.id}-true`}
                              value="true"
                              checked={userAnswer === "true"}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            />
                            <label className="form-check-label" htmlFor={`answer-${question.id}-true`}>
                              True
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`answer-${question.id}`}
                              id={`answer-${question.id}-false`}
                              value="false"
                              checked={userAnswer === "false"}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            />
                            <label className="form-check-label" htmlFor={`answer-${question.id}-false`}>
                              False
                            </label>
                          </div>
                        </div>
                      )}

                      {question.type === "fill-blank" && (
                        <div className="mb-3">
                          <label className="form-label fw-bold">Type your answer:</label>
                          {question.possibleAnswers && question.possibleAnswers.length > 0 ? (
                            question.possibleAnswers.map((_, blankIdx) => {
                              const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [];
                              return (
                                <div key={blankIdx} className="mb-2">
                                  <label className="form-label small">Blank {blankIdx + 1}:</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={userAnswerArray[blankIdx] || ''}
                                    onChange={(e) => {
                                      const newAnswers = [...userAnswerArray];
                                      newAnswers[blankIdx] = e.target.value;
                                      // Ensure array has correct length
                                      while (newAnswers.length < (question.possibleAnswers?.length || 0)) {
                                        newAnswers.push('');
                                      }
                                      handleAnswerChange(question.id, newAnswers);
                                    }}
                                    placeholder={`Enter answer for blank ${blankIdx + 1}`}
                                  />
                                </div>
                              );
                            })
                          ) : (
                            <input
                              type="text"
                              className="form-control"
                              value={typeof userAnswer === 'string' ? userAnswer : ''}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              placeholder="Enter your answer here"
                            />
                          )}
                        </div>
                      )}

                      <small className="text-muted">Points: {question.points}</small>
                    </>
                  );
                })()}
              </div>
            )}

            <div className="d-flex justify-content-between gap-2 mt-4">
              <Button
                variant="secondary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <div className="flex-grow-1" />
              {currentQuestionIndex < questions.length - 1 ? (
                <Button variant="primary" onClick={handleNextQuestion}>
                  Next
                </Button>
              ) : (
                <Button variant="success" onClick={submitQuiz}>
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>
        )
      ) : !isEditing ? (
        // Preview Mode (Normal Quiz Details)
        <div>
          {/* Quiz Details Section */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">Details</h6>

            <div className="mb-3">
              <strong>Quiz Type</strong>
              <p className="mb-0">{quiz.quizType || "Graded Quiz"}</p>
            </div>

            <div className="mb-3">
              <strong>Description</strong>
              <div
                className="mb-0"
                dangerouslySetInnerHTML={{ __html: quiz.description || "" }}
              />
            </div>

            <div className="mb-3">
              <strong>Assignment Group</strong>
              <p className="mb-0">{quiz.assignmentGroup || "Quizzes"}</p>
            </div>

            <div className="mb-3">
              <strong>Shuffle Answers</strong>
              <p className="mb-0">{quiz.shuffleAnswers ? "Yes" : "No"}</p>
            </div>

            <div className="mb-3">
              <strong>Time Limit</strong>
              <p className="mb-0">{quiz.timeLimit || 20} Minutes</p>
            </div>

            <div className="mb-3">
              <strong>Multiple Attempts</strong>
              <p className="mb-0">{quiz.multipleAttempts ? "Yes" : "No"}</p>
            </div>

            {quiz.multipleAttempts && (
              <div className="mb-3">
                <strong>How Many Attempts</strong>
                <p className="mb-0">{quiz.howManyAttempts || 1}</p>
              </div>
            )}

            <div className="mb-3">
              <strong>Show Correct Answers</strong>
              <p className="mb-0">{quiz.showCorrectAnswers || "Immediately"}</p>
            </div>

            <div className="mb-3">
              <strong>Access Code</strong>
              <p className="mb-0">{quiz.accessCode ? "Yes" : "No"}</p>
            </div>

            <div className="mb-3">
              <strong>One Question at a Time</strong>
              <p className="mb-0">{quiz.oneQuestionAtATime ? "Yes" : "No"}</p>
            </div>

            <div className="mb-3">
              <strong>Webcam Required</strong>
              <p className="mb-0">{quiz.webcamRequired ? "Yes" : "No"}</p>
            </div>

            <div className="mb-3">
              <strong>Lock Questions After Answering</strong>
              <p className="mb-0">
                {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <hr />

          {/* Dates Section */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">Assignment</h6>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Due</th>
                  <th>For</th>
                  <th>Available from</th>
                  <th>Until</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatDate(quiz.dueDate) || "—"}</td>
                  <td>Everyone</td>
                  <td>{formatDate(quiz.availableDate) || "—"}</td>
                  <td>{formatDate(quiz.availableUntilDate) || "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />

          {/* Questions Section */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">Questions ({questions.length})</h6>
            {questions.length === 0 ? (
              <p className="text-muted">No questions added yet.</p>
            ) : (
              <div>
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded p-3 mb-3">
                    <div className="mb-2">
                      <span className="badge bg-secondary me-2">Q{index + 1}</span>
                      <strong>{question.title}</strong>
                      <span className="ms-3 text-muted small">{question.points} points</span>
                    </div>
                    <div className="mb-2" dangerouslySetInnerHTML={{ __html: question.question }} />
                    {question.type === "multiple-choice" && (
                      <div>
                        <small className="text-muted">Choices (✓ = correct answer):</small>
                        <ul className="mb-0 ps-3 small">
                          {question.choices?.map((choice, idx) => {
                            const correctAnswers = question.correctAnswer ? question.correctAnswer.split(",") : [];
                            const isCorrect = correctAnswers.includes(idx.toString());
                            return (
                              <li key={idx} className={isCorrect ? "fw-bold text-success" : ""}>
                                {choice}
                                {isCorrect && " ✓"}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                    {question.type === "true-false" && (
                      <div>
                        <small className="text-muted">
                          Correct Answer: <strong className="text-success">{question.correctAnswer === "true" ? "True" : "False"}</strong> ✓
                        </small>
                      </div>
                    )}
                    {question.type === "fill-blank" && (
                      <div>
                        <small className="text-muted">Possible Answers (✓ = correct):</small>
                        <ul className="mb-0 ps-3 small">
                          {question.possibleAnswers?.map((answer, idx) => {
                            const correctAnswers = question.correctAnswer ? question.correctAnswer.split(",") : [];
                            const isCorrect = correctAnswers.includes(idx.toString());
                            return (
                              <li key={idx} className={isCorrect ? "fw-bold text-success" : ""}>
                                {answer}
                                {isCorrect && " ✓"}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr />

          {/* Back Button */}
          <div>
            <Button
              variant="secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
            >
              Back to Quizzes
            </Button>
          </div>
        </div>
      ) : (
        // Edit Mode with Tabs
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")}>
          <Nav variant="tabs" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="details" className={activeTab === "details" ? "text-danger fw-bold" : ""}>
                Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="questions" className={activeTab === "questions" ? "text-danger fw-bold" : ""}>
                Questions
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* Details Tab */}
            <Tab.Pane eventKey="details">
              <div>
                {/* Quiz Type */}
                <div className="mb-4">
                  <label htmlFor="quizType" className="form-label fw-bold">
                    Quiz Type
                  </label>
                  <select
                    id="quizType"
                    className="form-control"
                    value={quiz.quizType || "Graded Quiz"}
                    onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                  >
                    <option>Graded Quiz</option>
                    <option>Practice Quiz</option>
                    <option>Graded Survey</option>
                    <option>Ungraded Survey</option>
                  </select>
                </div>

                {/* Quiz Title */}
                <div className="mb-4">
                  <label htmlFor="title" className="form-label fw-bold">
                    Quiz Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="form-control"
                    value={quiz.title || ""}
                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                    placeholder="Unnamed Quiz"
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-bold">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows={5}
                    value={quiz.description || ""}
                    onChange={(e) =>
                      setQuiz({ ...quiz, description: e.target.value })
                    }
                    placeholder="Enter quiz description"
                  />
                </div>

                {/* Points */}
                <div className="mb-4">
                  <label htmlFor="points" className="form-label fw-bold">
                    Points
                  </label>
                  <input
                    id="points"
                    type="number"
                    className="form-control"
                    value={calculateTotalPoints() || 0}
                    disabled
                    style={{ maxWidth: "200px" }}
                  />
                  <small className="text-muted">Sum of all question points</small>
                </div>

                {/* Assignment Group */}
                <div className="mb-4">
                  <label htmlFor="assignmentGroup" className="form-label fw-bold">
                    Assignment Group
                  </label>
                  <select
                    id="assignmentGroup"
                    className="form-control"
                    value={quiz.assignmentGroup || "Quizzes"}
                    onChange={(e) =>
                      setQuiz({ ...quiz, assignmentGroup: e.target.value })
                    }
                    style={{ maxWidth: "300px" }}
                  >
                    <option>Quizzes</option>
                    <option>Exams</option>
                    <option>Assignments</option>
                    <option>Project</option>
                  </select>
                </div>

                {/* Shuffle Answers */}
                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="shuffle-answers"
                      checked={quiz.shuffleAnswers === true}
                      onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                    />
                    <label className="form-check-label fw-bold" htmlFor="shuffle-answers">
                      Shuffle Answers
                    </label>
                  </div>
                </div>

                {/* Time Limit */}
                <div className="mb-4">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="time-limit-enabled"
                      checked={quiz.timeLimit > 0}
                      onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })}
                    />
                    <label className="form-check-label fw-bold" htmlFor="time-limit-enabled">
                      Time Limit
                    </label>
                  </div>
                  {quiz.timeLimit > 0 && (
                    <div className="ms-4">
                      <input
                        id="timeLimit"
                        type="number"
                        className="form-control"
                        value={quiz.timeLimit || 20}
                        onChange={(e) =>
                          setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 20 })
                        }
                        style={{ maxWidth: "200px" }}
                        placeholder="Minutes"
                      />
                      <small className="text-muted">Minutes</small>
                    </div>
                  )}
                </div>

                {/* Multiple Attempts */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Multiple Attempts</label>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="attempts"
                        id="attempts-yes"
                        checked={quiz.multipleAttempts === true}
                        onChange={() => setQuiz({ ...quiz, multipleAttempts: true })}
                      />
                      <label className="form-check-label" htmlFor="attempts-yes">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="attempts"
                        id="attempts-no"
                        checked={quiz.multipleAttempts === false}
                        onChange={() =>
                          setQuiz({ ...quiz, multipleAttempts: false })
                        }
                      />
                      <label className="form-check-label" htmlFor="attempts-no">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* How Many Attempts */}
                {quiz.multipleAttempts && (
                  <div className="mb-4">
                    <label htmlFor="howManyAttempts" className="form-label fw-bold">
                      How Many Attempts
                    </label>
                    <input
                      id="howManyAttempts"
                      type="number"
                      className="form-control"
                      value={quiz.howManyAttempts || 1}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          howManyAttempts: parseInt(e.target.value) || 1,
                        })
                      }
                      style={{ maxWidth: "200px" }}
                    />
                  </div>
                )}

                {/* Show Correct Answers */}
                <div className="mb-4">
                  <label htmlFor="showCorrectAnswers" className="form-label fw-bold">
                    Show Correct Answers
                  </label>
                  <select
                    id="showCorrectAnswers"
                    className="form-control"
                    value={quiz.showCorrectAnswers || "Immediately"}
                    onChange={(e) =>
                      setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                    }
                    style={{ maxWidth: "300px" }}
                  >
                    <option>Immediately</option>
                    <option>After Due Date</option>
                    <option>Later</option>
                    <option>Never</option>
                  </select>
                </div>

                {/* Access Code */}
                <div className="mb-4">
                  <label htmlFor="accessCode" className="form-label fw-bold">
                    Access Code
                  </label>
                  <input
                    id="accessCode"
                    type="text"
                    className="form-control"
                    value={quiz.accessCode || ""}
                    onChange={(e) =>
                      setQuiz({ ...quiz, accessCode: e.target.value })
                    }
                    placeholder="Leave blank for no code"
                    style={{ maxWidth: "300px" }}
                  />
                </div>

                {/* One Question at a Time */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    One Question at a Time
                  </label>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="oneQuestion"
                        id="oneQuestion-yes"
                        checked={quiz.oneQuestionAtATime === true}
                        onChange={() =>
                          setQuiz({ ...quiz, oneQuestionAtATime: true })
                        }
                      />
                      <label className="form-check-label" htmlFor="oneQuestion-yes">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="oneQuestion"
                        id="oneQuestion-no"
                        checked={quiz.oneQuestionAtATime === false}
                        onChange={() =>
                          setQuiz({ ...quiz, oneQuestionAtATime: false })
                        }
                      />
                      <label className="form-check-label" htmlFor="oneQuestion-no">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* Webcam Required */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Webcam Required</label>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="webcam"
                        id="webcam-yes"
                        checked={quiz.webcamRequired === true}
                        onChange={() => setQuiz({ ...quiz, webcamRequired: true })}
                      />
                      <label className="form-check-label" htmlFor="webcam-yes">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="webcam"
                        id="webcam-no"
                        checked={quiz.webcamRequired === false}
                        onChange={() => setQuiz({ ...quiz, webcamRequired: false })}
                      />
                      <label className="form-check-label" htmlFor="webcam-no">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* Lock Questions After Answering */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Lock Questions After Answering
                  </label>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="lockQuestions"
                        id="lockQuestions-yes"
                        checked={quiz.lockQuestionsAfterAnswering === true}
                        onChange={() =>
                          setQuiz({ ...quiz, lockQuestionsAfterAnswering: true })
                        }
                      />
                      <label className="form-check-label" htmlFor="lockQuestions-yes">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="lockQuestions"
                        id="lockQuestions-no"
                        checked={quiz.lockQuestionsAfterAnswering === false}
                        onChange={() =>
                          setQuiz({ ...quiz, lockQuestionsAfterAnswering: false })
                        }
                      />
                      <label className="form-check-label" htmlFor="lockQuestions-no">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* Dates Section */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Dates</h6>

                  <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">
                      Due Date
                    </label>
                    <input
                      id="dueDate"
                      type="date"
                      className="form-control"
                      value={quiz.dueDate || ""}
                      onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="availableDate" className="form-label">
                      Available From
                    </label>
                    <input
                      id="availableDate"
                      type="date"
                      className="form-control"
                      value={quiz.availableDate || ""}
                      onChange={(e) =>
                        setQuiz({ ...quiz, availableDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="availableUntilDate" className="form-label">
                      Until
                    </label>
                    <input
                      id="availableUntilDate"
                      type="date"
                      className="form-control"
                      value={quiz.availableUntilDate || ""}
                      onChange={(e) =>
                        setQuiz({ ...quiz, availableUntilDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <hr />

                {/* Action Buttons */}
                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={handleCancel} className="px-4">
                    Cancel
                  </Button>
                  <Button variant="outline-danger" onClick={handleSave} className="px-4">
                    Save
                  </Button>
                  <Button variant="danger" onClick={handleSaveAndPublish} className="px-4">
                    Save and Publish
                  </Button>
                </div>
              </div>
            </Tab.Pane>

            {/* Questions Tab */}
            <Tab.Pane eventKey="questions">
              <div>
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Questions ({questions.length})</h6>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={addNewQuestion}
                    >
                      <FaPlus className="me-1" /> New Question
                    </Button>
                  </div>
                </div>

                <div>
                  {questions.map((question, index) =>
                    editingQuestionId === question.id && editingQuestion ? (
                      // Edit Mode
                      <div key={question.id} className="border rounded p-4 mb-4 bg-light">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="fw-bold mb-0">Question {index + 1}</h6>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={cancelEditingQuestion}
                          >
                            <FaTimes /> Close
                          </Button>
                        </div>

                        {/* Question Type */}
                        <div className="mb-3">
                          <label className="form-label fw-bold">Question Type</label>
                          <select
                            className="form-control"
                            title="Select question type"
                            value={editingQuestion.type}
                            onChange={(e) =>
                              setEditingQuestion({
                                ...editingQuestion,
                                type: e.target.value as "multiple-choice" | "true-false" | "fill-blank",
                              })
                            }
                          >
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="true-false">True/False</option>
                            <option value="fill-blank">Fill in the Blank</option>
                          </select>
                        </div>

                        {/* Question Title */}
                        <div className="mb-3">
                          <label className="form-label">Question Title</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editingQuestion.title || ""}
                            onChange={(e) =>
                              setEditingQuestion({
                                ...editingQuestion,
                                title: e.target.value,
                              })
                            }
                            placeholder="Enter question title"
                          />
                        </div>

                        {/* Points */}
                        <div className="mb-3">
                          <label className="form-label">Points</label>
                          <input
                            type="number"
                            className="form-control"
                            title="Enter points for this question"
                            value={editingQuestion.points || 0}
                            onChange={(e) =>
                              setEditingQuestion({
                                ...editingQuestion,
                                points: parseInt(e.target.value) || 0,
                              })
                            }
                            style={{ maxWidth: "150px" }}
                          />
                        </div>

                        {/* Question Text */}
                        <div className="mb-3">
                          <label className="form-label">Question</label>
                          <TiptapEditor
                            value={editingQuestion.question || ""}
                            onChange={(value) =>
                              setEditingQuestion({
                                ...editingQuestion,
                                question: value,
                              })
                            }
                            placeholder="Enter your question here"
                          />
                        </div>

                        {/* Multiple Choice Specific */}
                        {editingQuestion.type === "multiple-choice" && (
                          <div className="mb-3">
                            <label className="form-label fw-bold">Choices</label>
                            <p className="small text-muted mb-2">Select the correct answer(s) - you can select multiple:</p>
                            {editingQuestion.choices?.map((choice, choiceIdx) => (
                              <div key={choiceIdx} className="mb-2 d-flex gap-2 align-items-center">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`choice-${question.id}-${choiceIdx}`}
                                    checked={editingQuestion.correctAnswer?.includes(choiceIdx.toString())}
                                    onChange={(e) => {
                                      const currentCorrect = editingQuestion.correctAnswer ? editingQuestion.correctAnswer.split(",") : [];
                                      let newCorrect: string[];
                                      if (e.target.checked) {
                                        newCorrect = [...currentCorrect, choiceIdx.toString()];
                                      } else {
                                        newCorrect = currentCorrect.filter(idx => idx !== choiceIdx.toString());
                                      }
                                      setEditingQuestion({
                                        ...editingQuestion,
                                        correctAnswer: newCorrect.join(","),
                                      });
                                    }}
                                    title="Mark as correct answer"
                                  />
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={choice}
                                  onChange={(e) => {
                                    const newChoices = [...(editingQuestion.choices || [])];
                                    newChoices[choiceIdx] = e.target.value;
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      choices: newChoices,
                                    });
                                  }}
                                  placeholder={`Choice ${choiceIdx + 1}`}
                                />
                                {editingQuestion.choices && editingQuestion.choices.length > 1 && (
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => {
                                      const newChoices = editingQuestion.choices?.filter(
                                        (_, idx) => idx !== choiceIdx
                                      );
                                      setEditingQuestion({
                                        ...editingQuestion,
                                        choices: newChoices,
                                      });
                                    }}
                                    title="Delete this choice"
                                  >
                                    <FaTrash />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => {
                                setEditingQuestion({
                                  ...editingQuestion,
                                  choices: [...(editingQuestion.choices || []), ""],
                                });
                              }}
                            >
                              <FaPlus className="me-2" /> Add Choice
                            </Button>
                          </div>
                        )}

                        {/* True/False Specific */}
                        {editingQuestion.type === "true-false" && (
                          <div className="mb-3">
                            <label className="form-label fw-bold">Correct Answer</label>
                            <div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`tf-${question.id}`}
                                  id={`tf-true-${question.id}`}
                                  checked={editingQuestion.correctAnswer === "true"}
                                  onChange={() =>
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      correctAnswer: "true",
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`tf-true-${question.id}`}
                                >
                                  True
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`tf-${question.id}`}
                                  id={`tf-false-${question.id}`}
                                  checked={editingQuestion.correctAnswer === "false"}
                                  onChange={() =>
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      correctAnswer: "false",
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`tf-false-${question.id}`}
                                >
                                  False
                                </label>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Fill in the Blank Specific */}
                        {editingQuestion.type === "fill-blank" && (
                          <div className="mb-3">
                            <label className="form-label fw-bold">Possible Answers</label>
                            <p className="small text-muted mb-2">Add all acceptable answers. Check the correct ones. Matching will be case-insensitive.</p>
                            {editingQuestion.possibleAnswers?.map((answer, answerIdx) => (
                              <div key={answerIdx} className="mb-2 d-flex gap-2 align-items-center">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`answer-${question.id}-${answerIdx}`}
                                    checked={editingQuestion.correctAnswer?.includes(answerIdx.toString())}
                                    onChange={(e) => {
                                      const currentCorrect = editingQuestion.correctAnswer ? editingQuestion.correctAnswer.split(",") : [];
                                      let newCorrect: string[];
                                      if (e.target.checked) {
                                        newCorrect = [...currentCorrect, answerIdx.toString()];
                                      } else {
                                        newCorrect = currentCorrect.filter(idx => idx !== answerIdx.toString());
                                      }
                                      setEditingQuestion({
                                        ...editingQuestion,
                                        correctAnswer: newCorrect.join(","),
                                      });
                                    }}
                                    title="Mark as correct answer"
                                  />
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={answer}
                                  onChange={(e) => {
                                    const newAnswers = [...(editingQuestion.possibleAnswers || [])];
                                    newAnswers[answerIdx] = e.target.value;
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      possibleAnswers: newAnswers,
                                    });
                                  }}
                                  placeholder={`Answer ${answerIdx + 1}`}
                                />
                                {editingQuestion.possibleAnswers && editingQuestion.possibleAnswers.length > 1 && (
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => {
                                      const newAnswers = editingQuestion.possibleAnswers?.filter(
                                        (_, idx) => idx !== answerIdx
                                      );
                                      setEditingQuestion({
                                        ...editingQuestion,
                                        possibleAnswers: newAnswers,
                                      });
                                    }}
                                    title="Delete this answer"
                                  >
                                    <FaTrash />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => {
                                setEditingQuestion({
                                  ...editingQuestion,
                                  possibleAnswers: [...(editingQuestion.possibleAnswers || []), ""],
                                });
                              }}
                            >
                              <FaPlus className="me-2" /> Add Another Answer
                            </Button>
                          </div>
                        )}

                        <hr />

                        {/* Action Buttons */}
                        <div className="d-flex justify-content-end gap-2">
                          <Button
                            variant="secondary"
                            onClick={cancelEditingQuestion}
                            className="px-3"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="danger"
                            onClick={saveQuestion}
                            className="px-3"
                          >
                            Save Question
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Preview Mode
                      <div
                        key={question.id}
                        className="border rounded p-3 mb-3 d-flex justify-content-between align-items-start"
                      >
                        <div className="flex-grow-1">
                          <strong>
                            Question {index + 1}: {question.title || "Untitled"}
                          </strong>
                          <div className="mb-1 text-muted" dangerouslySetInnerHTML={{ __html: question.question }} />
                          <small className="text-secondary">
                            Type: {question.type === "multiple-choice"
                              ? "Multiple Choice"
                              : question.type === "true-false"
                                ? "True/False"
                                : "Fill in the Blank"}{" "}
                            | Points: {question.points}
                          </small>
                        </div>
                        <div className="d-flex gap-2 ms-3">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => startEditingQuestion(question)}
                          >
                            <FaEdit /> Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteQuestion(question.id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    )
                  )}

                  {/* New Question Form - rendered at the bottom when editingQuestionId === "new" */}
                  {editingQuestionId === "new" && editingQuestion && (
                    <div className="border rounded p-4 mb-4 bg-light">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold mb-0">New Question</h6>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={cancelEditingQuestion}
                        >
                          <FaTimes /> Close
                        </Button>
                      </div>

                      {/* Question Type */}
                      <div className="mb-3">
                        <label className="form-label fw-bold">Question Type</label>
                        <select
                          className="form-control"
                          title="Select question type"
                          value={editingQuestion.type}
                          onChange={(e) =>
                            setEditingQuestion({
                              ...editingQuestion,
                              type: e.target.value as "multiple-choice" | "true-false" | "fill-blank",
                            })
                          }
                        >
                          <option value="multiple-choice">Multiple Choice</option>
                          <option value="true-false">True/False</option>
                          <option value="fill-blank">Fill in the Blank</option>
                        </select>
                      </div>

                      {/* Question Title */}
                      <div className="mb-3">
                        <label className="form-label">Question Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editingQuestion.title || ""}
                          onChange={(e) =>
                            setEditingQuestion({
                              ...editingQuestion,
                              title: e.target.value,
                            })
                          }
                          placeholder="Enter question title"
                        />
                      </div>

                      {/* Points */}
                      <div className="mb-3">
                        <label className="form-label">Points</label>
                        <input
                          type="number"
                          className="form-control"
                          title="Enter points for this question"
                          value={editingQuestion.points || 0}
                          onChange={(e) =>
                            setEditingQuestion({
                              ...editingQuestion,
                              points: parseInt(e.target.value) || 0,
                            })
                          }
                          style={{ maxWidth: "150px" }}
                        />
                      </div>

                      {/* Question Text */}
                      <div className="mb-3">
                        <label className="form-label">Question</label>
                        <TiptapEditor
                          value={editingQuestion.question || ""}
                          onChange={(value) =>
                            setEditingQuestion({
                              ...editingQuestion,
                              question: value,
                            })
                          }
                          placeholder="Enter your question here"
                        />
                      </div>

                      {/* Multiple Choice Specific */}
                      {editingQuestion.type === "multiple-choice" && (
                        <div className="mb-3">
                          <label className="form-label fw-bold">Choices</label>
                          <p className="small text-muted mb-2">Select the correct answer(s) - you can select multiple:</p>
                          {editingQuestion.choices?.map((choice, choiceIdx) => (
                            <div key={choiceIdx} className="mb-2 d-flex gap-2 align-items-center">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`choice-new-${choiceIdx}`}
                                  checked={editingQuestion.correctAnswer?.includes(choiceIdx.toString())}
                                  onChange={(e) => {
                                    const currentCorrect = editingQuestion.correctAnswer ? editingQuestion.correctAnswer.split(",") : [];
                                    let newCorrect: string[];
                                    if (e.target.checked) {
                                      newCorrect = [...currentCorrect, choiceIdx.toString()];
                                    } else {
                                      newCorrect = currentCorrect.filter(idx => idx !== choiceIdx.toString());
                                    }
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      correctAnswer: newCorrect.join(","),
                                    });
                                  }}
                                  title="Mark as correct answer"
                                />
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                value={choice}
                                onChange={(e) => {
                                  const newChoices = [...(editingQuestion.choices || [])];
                                  newChoices[choiceIdx] = e.target.value;
                                  setEditingQuestion({
                                    ...editingQuestion,
                                    choices: newChoices,
                                  });
                                }}
                                placeholder={`Choice ${choiceIdx + 1}`}
                              />
                              {editingQuestion.choices && editingQuestion.choices.length > 1 && (
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => {
                                    const newChoices = editingQuestion.choices?.filter(
                                      (_, idx) => idx !== choiceIdx
                                    );
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      choices: newChoices,
                                    });
                                  }}
                                  title="Delete this choice"
                                >
                                  <FaTrash />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => {
                              setEditingQuestion({
                                ...editingQuestion,
                                choices: [...(editingQuestion.choices || []), ""],
                              });
                            }}
                          >
                            <FaPlus className="me-2" /> Add Choice
                          </Button>
                        </div>
                      )}

                      {/* True/False Specific */}
                      {editingQuestion.type === "true-false" && (
                        <div className="mb-3">
                          <label className="form-label fw-bold">Correct Answer</label>
                          <div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="tf-new"
                                id="tf-true-new"
                                checked={editingQuestion.correctAnswer === "true"}
                                onChange={() =>
                                  setEditingQuestion({
                                    ...editingQuestion,
                                    correctAnswer: "true",
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="tf-true-new"
                              >
                                True
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="tf-new"
                                id="tf-false-new"
                                checked={editingQuestion.correctAnswer === "false"}
                                onChange={() =>
                                  setEditingQuestion({
                                    ...editingQuestion,
                                    correctAnswer: "false",
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="tf-false-new"
                              >
                                False
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Fill in the Blank Specific */}
                      {editingQuestion.type === "fill-blank" && (
                        <div className="mb-3">
                          <label className="form-label fw-bold">Possible Answers</label>
                          <p className="small text-muted mb-2">Add all acceptable answers. Check the correct ones. Matching will be case-insensitive.</p>
                          {editingQuestion.possibleAnswers?.map((answer, answerIdx) => (
                            <div key={answerIdx} className="mb-2 d-flex gap-2 align-items-center">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`answer-new-${answerIdx}`}
                                  checked={editingQuestion.correctAnswer?.includes(answerIdx.toString())}
                                  onChange={(e) => {
                                    const currentCorrect = editingQuestion.correctAnswer ? editingQuestion.correctAnswer.split(",") : [];
                                    let newCorrect: string[];
                                    if (e.target.checked) {
                                      newCorrect = [...currentCorrect, answerIdx.toString()];
                                    } else {
                                      newCorrect = currentCorrect.filter(idx => idx !== answerIdx.toString());
                                    }
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      correctAnswer: newCorrect.join(","),
                                    });
                                  }}
                                  title="Mark as correct answer"
                                />
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                value={answer}
                                onChange={(e) => {
                                  const newAnswers = [...(editingQuestion.possibleAnswers || [])];
                                  newAnswers[answerIdx] = e.target.value;
                                  setEditingQuestion({
                                    ...editingQuestion,
                                    possibleAnswers: newAnswers,
                                  });
                                }}
                                placeholder={`Answer ${answerIdx + 1}`}
                              />
                              {editingQuestion.possibleAnswers && editingQuestion.possibleAnswers.length > 1 && (
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => {
                                    const newAnswers = editingQuestion.possibleAnswers?.filter(
                                      (_, idx) => idx !== answerIdx
                                    );
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      possibleAnswers: newAnswers,
                                    });
                                  }}
                                  title="Delete this answer"
                                >
                                  <FaTrash />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => {
                              setEditingQuestion({
                                ...editingQuestion,
                                possibleAnswers: [...(editingQuestion.possibleAnswers || []), ""],
                              });
                            }}
                          >
                            <FaPlus className="me-2" /> Add Another Answer
                          </Button>
                        </div>
                      )}

                      <hr />

                      {/* Action Buttons */}
                      <div className="d-flex justify-content-end gap-2">
                        <Button
                          variant="secondary"
                          onClick={cancelEditingQuestion}
                          className="px-3"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="danger"
                          onClick={saveQuestion}
                          className="px-3"
                        >
                          Save Question
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <hr />

                {/* Action Buttons */}
                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={handleCancel} className="px-4">
                    Cancel
                  </Button>
                  <Button variant="outline-danger" onClick={handleSave} className="px-4">
                    Save
                  </Button>
                  <Button variant="danger" onClick={handleSaveAndPublish} className="px-4">
                    Save and Publish
                  </Button>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      )}
    </div>
  );
}
