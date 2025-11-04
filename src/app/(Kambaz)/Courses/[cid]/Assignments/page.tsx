"use client"
import Link from "next/link";
import { Badge, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { LuNotebookPen } from "react-icons/lu";
import { FaCaretDown, FaEllipsisV, FaTrash, } from "react-icons/fa";
import AssignmentsControls from "./AssignmentsControls";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
      setShowDeleteDialog(false);
      setAssignmentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments">
      {currentUser?.role === "FACULTY" && (
        <div className="mb-4">
          <AssignmentsControls />
        </div>
      )}

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="p-3 bg-light d-flex justify-content-between align-items-center">
          <div>
            <BsGripVertical className=" fs-3" /> <FaCaretDown className="me-2" />
            <span className="fw-bold fs-4 align-items-center">
              ASSIGNMENTS</span>
          </div>

          {currentUser?.role === "FACULTY" && (
            <div>
              <Badge pill bg="secondary" className="me-1 fs-5">
                40% of Total
              </Badge>
              <BsPlus className="me-3 fs-3" />
              <FaEllipsisV className=" fs-3" />
            </div>
          )}
        </ListGroupItem>

        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <ListGroupItem
              key={assignment._id}
              className="wd-lesson p-3 ps-2 d-flex align-items-center"
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="fs-3 me-3 text-success" />
              </div>

              <div className="flex-grow-1">
                <Link
                  href={`/Courses/${cid}/Assignments/${assignment._id}`}
                  className="text-dark text-decoration-none fw-bold"
                >
                  {assignment.title}
                </Link>
                <p className="text-muted small mb-0">
                  <span className="text-danger">Multiple Modules</span> |
                  <strong> Not available until</strong> {formatDate(assignment.availableFromDate)} at {formatTime(assignment.availableFromDate)} |
                  <br />
                  <strong>Due</strong> {formatDate(assignment.dueDate)} at {formatTime(assignment.dueDate)} | {assignment.points} pts
                </p>
              </div>

              {currentUser?.role === "FACULTY" && (
                <div className="ms-2 d-flex gap-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(assignment._id)}
                  >
                    <FaTrash />
                  </Button>
                  <LessonControlButtons />
                </div>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>


      {showDeleteDialog && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Assignment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove this assignment?</p>
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

