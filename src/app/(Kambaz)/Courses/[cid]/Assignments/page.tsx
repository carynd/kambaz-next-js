"use client"
import Link from "next/link";
import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { LuNotebookPen } from "react-icons/lu";
import { FaCaretDown, FaEllipsisV, } from "react-icons/fa";
import AssignmentsControls from "./AssignmentsControls";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  // Helper function to format dates
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
  return (
    <div id="wd-assignments">

      <div className="mb-4">
        <AssignmentsControls />
      </div>


      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="p-3 bg-light d-flex justify-content-between align-items-center">
          <div>
            <BsGripVertical className=" fs-3" /> <FaCaretDown className="me-2" />
            <span className="fw-bold fs-4 align-items-center">
              ASSIGNMENTS</span>
          </div>

          <div>
            <Badge pill bg="secondary" className="me-1 fs-5">
              40% of Total
            </Badge>
            <BsPlus className="me-3 fs-3" />
            <FaEllipsisV className=" fs-3" />
          </div>
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

              <div className="ms-2">
                <LessonControlButtons />
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
