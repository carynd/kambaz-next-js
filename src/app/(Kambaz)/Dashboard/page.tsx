"use client"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import * as db from "../Database";
import { useSelector, useDispatch } from "react-redux";
import { enrollCourse, unenrollCourse } from "./enrollmentsReducer";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [courses, setCourses] = useState<any[]>(db.courses);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const addNewCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );
  };

  const handleEnrollment = (courseId: string) => {
    if (!currentUser) return;
    if (isEnrolled(courseId)) {
      dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enrollCourse({ userId: currentUser._id, courseId }));
    }
  };

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) => isEnrolled(c._id));

  if (!currentUser) {
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <hr />
        <p className="text-center">Please sign in to view your courses.</p>
      </div>
    );
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button
          variant="primary"
          className="float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "My Courses" : "All Courses"}
        </Button>
      </h1>
      <hr />


      {currentUser?.role === "FACULTY" && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}> Add </button>
            <button className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={updateCourse}> Update </button>
          </h5><hr />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Published Courses"} ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }} key={c._id}>
              <Card>
                <Link href={`/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {c.description}
                    </CardText>

                    {/* Only show Edit and Delete buttons if user is FACULTY */}
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(c._id);
                          }}
                          variant="danger"
                          className="float-end"
                          id="wd-delete-course-click">
                          Delete
                        </Button>
                        <Button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(c);
                          }}
                          variant="warning"
                          className="me-2 float-end">
                          Edit
                        </Button>
                      </>
                    )}

                    {isEnrolled(c._id) && (
                      <Button variant="primary"> Go </Button>
                    )}

                    {showAllCourses && (
                      <Button
                        variant={isEnrolled(c._id) ? "danger" : "success"}
                        className="w-100 mt-2"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEnrollment(c._id);
                        }}
                      >
                        {isEnrolled(c._id) ? "Unenroll" : "Enroll"}
                      </Button>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
