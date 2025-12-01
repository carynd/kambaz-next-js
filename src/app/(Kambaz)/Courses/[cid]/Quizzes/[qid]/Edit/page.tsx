"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { updateQuiz as updateQuizAction } from "../../reducer";
import { FormControl, Button } from "react-bootstrap";
import { FaCalendar } from "react-icons/fa";
import * as client from "../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);

  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    points: 0,
    dueDate: "",
    availableDate: "",
    availableUntilDate: "",
    course: cid,
  });

  useEffect(() => {
    // Only FACULTY can edit quizzes
    if (currentUser?.role !== "FACULTY") {
      router.push(`/Courses/${cid}/Quizzes`);
      return;
    }

    if (qid !== "new") {
      const existingQuiz: any = quizzes.find((q: any) => q._id === qid);
      if (existingQuiz) {
        // Convert dates to datetime-local format if needed
        setQuiz({
          ...(existingQuiz as any),
          dueDate: existingQuiz.dueDate
            ? new Date(existingQuiz.dueDate).toISOString().slice(0, 16)
            : "",
          availableDate: existingQuiz.availableDate
            ? new Date(existingQuiz.availableDate).toISOString().slice(0, 16)
            : "",
          availableUntilDate: existingQuiz.availableUntilDate
            ? new Date(existingQuiz.availableUntilDate).toISOString().slice(0, 16)
            : "",
        });
      }
    }
  }, [qid, quizzes, currentUser, cid, router]);

  const handleSave = async () => {
    try {
      const quizData = {
        ...quiz,
        dueDate: quiz.dueDate ? new Date(quiz.dueDate).toISOString() : null,
        availableDate: quiz.availableDate
          ? new Date(quiz.availableDate).toISOString()
          : null,
        availableUntilDate: quiz.availableUntilDate
          ? new Date(quiz.availableUntilDate).toISOString()
          : null,
      };

      if (qid === "new") {
        await client.createQuiz(cid as string, quizData);
      } else {
        await client.updateQuiz(qid as string, quizData);
        dispatch(updateQuizAction(quizData));
      }
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-quizzes-editor" className="p-4">
      <h3>{qid === "new" ? "New Quiz" : "Edit Quiz"}</h3>
      <hr />

      {/* Quiz Name */}
      <div className="mb-4">
        <label htmlFor="wd-quiz-name" className="form-label fw-bold">
          Quiz Name
        </label>
        <FormControl
          id="wd-quiz-name"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          placeholder="Enter quiz name"
          className="border"
        />
      </div>

      {/* Quiz Description */}
      <div className="mb-4">
        <label htmlFor="wd-quiz-description" className="form-label fw-bold">
          Quiz Description
        </label>
        <FormControl
          as="textarea"
          id="wd-quiz-description"
          rows={4}
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          placeholder="Enter quiz description"
          className="border"
        />
      </div>

      {/* Points */}
      <div className="mb-4">
        <label htmlFor="wd-quiz-points" className="form-label fw-bold">
          Points
        </label>
        <FormControl
          id="wd-quiz-points"
          type="number"
          value={quiz.points}
          onChange={(e) =>
            setQuiz({ ...quiz, points: parseInt(e.target.value) || 0 })
          }
          className="border"
          style={{ maxWidth: "200px" }}
        />
      </div>

      {/* Quiz Section */}
      <div className="mb-4">
        <label className="form-label fw-bold">Quiz Settings</label>

        {/* Due Date */}
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <div className="d-flex align-items-center gap-2">
            <FormControl
              id="wd-quiz-due-date"
              type="datetime-local"
              value={quiz.dueDate}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
              className="border"
              style={{ maxWidth: "300px" }}
            />
            <FaCalendar className="fs-5 text-muted" />
          </div>
        </div>

        {/* Available From and Until Row */}
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Available From</label>
            <div className="d-flex align-items-center gap-2">
              <FormControl
                id="wd-quiz-available-from"
                type="datetime-local"
                value={quiz.availableDate}
                onChange={(e) =>
                  setQuiz({ ...quiz, availableDate: e.target.value })
                }
                className="border"
              />
              <FaCalendar className="fs-5 text-muted" />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Until</label>
            <div className="d-flex align-items-center gap-2">
              <FormControl
                id="wd-quiz-available-until"
                type="datetime-local"
                value={quiz.availableUntilDate}
                onChange={(e) =>
                  setQuiz({ ...quiz, availableUntilDate: e.target.value })
                }
                className="border"
              />
              <FaCalendar className="fs-5 text-muted" />
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel} className="px-4">
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave} className="px-4">
          Save
        </Button>
      </div>
    </div>
  );
}
