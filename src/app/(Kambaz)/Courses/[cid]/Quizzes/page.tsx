"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button, ListGroup, ListGroupItem, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown, FaEllipsisV, FaTrash, FaQuestion, FaEdit, FaCopy, FaSortAmountDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { setQuizzes, deleteQuiz as deleteQuizAction, updateQuiz as updateQuizAction } from "./reducer";
import QuizzesControls from "./QuizzesControls";

export default function QuizzesPage() {
  const { cid } = useParams() as { cid: string };
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer || { quizzes: [] });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesList = await client.fetchQuizzesForCourse(cid);
        dispatch(setQuizzes(quizzesList));
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cid) {
      fetchQuizzes();
    }
  }, [cid, dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };


  const handleDeleteClick = (quizId: string) => {
    setQuizToDelete(quizId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (quizToDelete) {
      try {
        await client.deleteQuiz(quizToDelete);
        dispatch(deleteQuizAction(quizToDelete));
        setShowDeleteDialog(false);
        setQuizToDelete(null);
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setQuizToDelete(null);
  };

  const handlePublishQuiz = async (quizId: string) => {
    try {
      const updatedQuiz = await client.publishQuiz(quizId);
      dispatch(updateQuizAction(updatedQuiz));
    } catch (error) {
      console.error("Error publishing quiz:", error);
    }
  };

  const handleUnpublishQuiz = async (quizId: string) => {
    try {
      const updatedQuiz = await client.unpublishQuiz(quizId);
      dispatch(updateQuizAction(updatedQuiz));
    } catch (error) {
      console.error("Error unpublishing quiz:", error);
    }
  };

  const getAvailabilityStatus = (quiz: any) => {
    if (!quiz.availableDate) return "Available";

    const now = new Date();
    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = quiz.availableUntilDate
      ? new Date(quiz.availableUntilDate)
      : null;

    if (now < availableDate) {
      return `Not available until ${availableDate.toLocaleDateString()}`;
    } else if (availableUntilDate && now > availableUntilDate) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  if (loading) {
    return (
      <div className="p-3">
        <p>Loading quizzes...</p>
      </div>
    );
  }

  return (
    <div id="wd-quizzes">
      {currentUser?.role === "FACULTY" && (
        <div className="mb-4">
          <QuizzesControls />
        </div>
      )}

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-3 bg-light d-flex justify-content-between align-items-center">
          <div>
            <BsGripVertical className="fs-3" /> <FaCaretDown className="me-2" />
            <span className="fw-bold fs-4 align-items-center">QUIZZES</span>
          </div>
        </ListGroupItem>

        {quizzes.length === 0 ? (
          <ListGroupItem className="p-3">
            <p className="text-muted">
              {currentUser?.role === "FACULTY"
                ? "Click the + button to create your first quiz."
                : "No quizzes available."}
            </p>
          </ListGroupItem>
        ) : (
          quizzes
            .filter((quiz: any) => {
              // Faculty sees all quizzes, students only see published quizzes
              if (currentUser?.role === "FACULTY") {
                return true;
              }
              return quiz.published;
            })
            .map((quiz: any) => (
            <ListGroupItem
              key={quiz._id}
              className="wd-lesson p-3 ps-2 d-flex align-items-center"
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <FaQuestion className="fs-3 me-3 text-primary" />
              </div>

              <div className="flex-grow-1">
                <Link
                  href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                  className="text-dark text-decoration-none fw-bold"
                >
                  {quiz.title}
                </Link>
                <p className="text-muted small mb-0">
                  <span
                    className={
                      getAvailabilityStatus(quiz) === "Closed"
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {getAvailabilityStatus(quiz)}
                  </span>
                  {quiz.dueDate && (
                    <>
                      {" "}
                      | <strong>Due</strong> {formatDate(quiz.dueDate)} at{" "}
                      {formatTime(quiz.dueDate)}
                    </>
                  )}
                  {" "}| {quiz.points || 0} pts | {quiz.numQuestions || 0}{" "}
                  Questions
                </p>
              </div>

              <div className="ms-2 d-flex gap-2 align-items-center">
                {/* Published/Unpublished Indicator - Clickable */}
                {currentUser?.role === "FACULTY" ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (quiz.published) {
                        handleUnpublishQuiz(quiz._id);
                      } else {
                        handlePublishQuiz(quiz._id);
                      }
                    }}
                    style={{
                      fontSize: "18px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      padding: "0",
                    }}
                    title={
                      quiz.published
                        ? "Click to unpublish quiz"
                        : "Click to publish quiz"
                    }
                  >
                    {quiz.published ? "✅" : "🚫"}
                  </button>
                ) : (
                  <span style={{ fontSize: "18px" }}>
                    {quiz.published ? "✅" : "🚫"}
                  </span>
                )}

                {/* Dropdown Menu */}
                {currentUser?.role === "FACULTY" && (
                  <Dropdown className="ms-2">
                    <DropdownToggle
                      variant="link"
                      size="sm"
                      className="text-dark p-0"
                      id={`dropdown-${quiz._id}`}
                      style={{ textDecoration: "none", color: "#666" }}
                    >
                      <FaEllipsisV className="fs-6" />
                    </DropdownToggle>
                    <DropdownMenu align="end">
                      <Link href={`/Courses/${cid}/Quizzes/${quiz._id}`}>
                        <DropdownItem as="div" className="cursor-pointer">
                          <FaEdit className="me-2" /> Edit
                        </DropdownItem>
                      </Link>
                      <DropdownItem onClick={() => handleDeleteClick(quiz._id)}>
                        <FaTrash className="me-2 text-danger" /> Delete
                      </DropdownItem>
                      <Dropdown.Divider />
                      <DropdownItem
                        onClick={() => {
                          if (quiz.published) {
                            handleUnpublishQuiz(quiz._id);
                          } else {
                            handlePublishQuiz(quiz._id);
                          }
                        }}
                      >
                        {quiz.published ? "🚫 Unpublish" : "✅ Publish"}
                      </DropdownItem>
                      <DropdownItem>
                        <FaCopy className="me-2" /> Copy
                      </DropdownItem>
                      <DropdownItem>
                        <FaSortAmountDown className="me-2" /> Sort
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>

      {showDeleteDialog && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Quiz</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                  title="Close dialog"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this quiz?</p>
              </div>
              <div className="modal-footer">
                <Button variant="secondary" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                  Yes, Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
