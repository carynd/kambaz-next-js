import Link from "next/link";
import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { LuNotebookPen } from "react-icons/lu";
import { FaEllipsisV } from "react-icons/fa";
import AssignmentsControls from "./AssignmentsControls"; 

export default function Assignments() {
  return (
    <div id="wd-assignments">

     <div className="mb-4">
        <AssignmentsControls />
      </div>
      
      
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="p-3 bg-light d-flex justify-content-between align-items-center">
          <div>
            <BsGripVertical className=" fs-3" />
            <span className="fw-bold fs-4 align-items-center">ASSIGNMENTS</span>
          </div>

          <div>
            <Badge pill bg="secondary" className="me-1 fs-5">
              40% of Total
            </Badge>
            <BsPlus className="me-3 fs-3" />
            <FaEllipsisV className=" fs-3" />
          </div>
        </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-2 d-flex align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <LuNotebookPen className="fs-3 me-3 text-success" />
          </div>


          <div className="flex-grow-1">
            <Link href="/Courses/1234/Assignments/A1" className="text-dark text-decoration-none fw-bold">
              A1
            </Link>
            <p className="text-muted small mb-0">
              <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am |
              <br />
              <strong>Due</strong> May 13 at 11:59pm | 100 pts
            </p>
          </div>

 
          <div className="ms-2">
            <LessonControlButtons />
          </div>
        </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-2 d-flex align-items-center">

          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <LuNotebookPen className="fs-3 me-3 text-success" />
          </div>

          <div className="flex-grow-1">
            <Link href="/Courses/1234/Assignments/A1" className="text-dark text-decoration-none fw-bold">
              A2
            </Link>
            <p className="text-muted small mb-0">
              <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 30 at 12:00am |
              <br />
              <strong>Due</strong> April 9 at 11:59pm | 100 pts
            </p>
          </div>


          <div className="ms-2">
            <LessonControlButtons />
          </div>
        </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-2 d-flex align-items-center">
          {/* Left Icons */}
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <LuNotebookPen className="fs-3 me-3 text-success" />
          </div>

          <div className="flex-grow-1">
            <Link href="/Courses/1234/Assignments/A1" className="text-dark text-decoration-none fw-bold">
              A3
            </Link>
            <p className="text-muted small mb-0">
              <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> June 6 at 12:00am |
              <br />
              <strong>Due</strong> July 13 at 11:59pm | 100 pts
            </p>
          </div>
          
          <div className="ms-2">
            <LessonControlButtons />
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>);
}