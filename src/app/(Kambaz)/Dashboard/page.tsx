"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import * as client from "../Courses/client";
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { enrollCourse, unenrollCourse, setEnrollments } from "./enrollmentsReducer";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [allAvailableCourses, setAllAvailableCourses] = useState<any[]>([]);
  const [loadingAllCourses, setLoadingAllCourses] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  };

  const handleBrowseAllCourses = async () => {
    if (!showAllCourses && currentUser?.role === "STUDENT") {
      // Load all available courses when switching to browse mode
      if (allAvailableCourses.length === 0) {
        try {
          setLoadingAllCourses(true);
          const allCourses = await client.fetchAllCourses();
          setAllAvailableCourses(allCourses);
        } catch (error) {
          console.error("Error loading all courses:", error);
        } finally {
          setLoadingAllCourses(false);
        }
      }
    }
    setShowAllCourses(!showAllCourses);
  };

  const handleEnrollment = async (courseId: string) => {
    if (!currentUser) return;
    try {
      if (isEnrolled(courseId)) {
        await client.unenrollFromCourse(currentUser._id, courseId);
        setEnrolledCourseIds(enrolledCourseIds.filter(id => id !== courseId));
        // Update Redux state
        dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
      } else {
        await client.enrollIntoCourse(currentUser._id, courseId);
        const newEnrolledIds = [...enrolledCourseIds, courseId];
        setEnrolledCourseIds(newEnrolledIds);
        // Update Redux state
        dispatch(enrollCourse({ userId: currentUser._id, courseId }));
        setShowAllCourses(false);
      }
    } catch (error) {
      console.error("Error handling enrollment:", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (currentUser?.role === "FACULTY") {
          // Faculty sees only their created courses
          const facultyCourses = await client.findMyFacultyCourses();
          dispatch(setCourses(facultyCourses));
        } else if (currentUser?.role === "STUDENT") {
          // Students see only their enrolled courses in Redux
          // All courses are fetched separately when browsing
          const myCourses = await client.findMyCourses();
          dispatch(setCourses(myCourses));
          const enrolledIds = myCourses.map((c: any) => c._id);
          setEnrolledCourseIds(enrolledIds);

          const enrollmentsData = enrolledIds.map((courseId: string) => ({
            _id: `${currentUser._id}-${courseId}`,
            user: currentUser._id,
            course: courseId,
          }));
          dispatch(setEnrollments(enrollmentsData));
        } else {
          // Admin or other roles see all courses
          const allCourses = await client.fetchAllCourses();
          dispatch(setCourses(allCourses));
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser, dispatch]);

  const displayedCourses = currentUser?.role === "STUDENT" && showAllCourses
    ? allAvailableCourses
    : courses.filter((c: any) => isEnrolled(c._id) || currentUser?.role === "FACULTY");

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
        {currentUser?.role === "STUDENT" && (
          <div className="float-end" style={{ display: "flex", gap: "10px" }}>
            <Link href="/Courses/BrowseAllCourses">
              <Button variant="success">
                Browse All Courses
              </Button>
            </Link>
            <Button
              variant="primary"
              onClick={handleBrowseAllCourses}
              disabled={loadingAllCourses}
            >
              {loadingAllCourses ? "Loading..." : showAllCourses ? "My Enrollments" : "Browse All Courses"}
            </Button>
          </div>
        )}
      </h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h5 style={{ margin: 0 }}>New Course</h5>
            <div>
              <Button variant="primary"
                id="wd-add-new-course-click"
                onClick={onAddNewCourse}> Add </Button>
              <Button variant="warning" className="ms-2"
                id="wd-update-course-click"
                onClick={onUpdateCourse}> Update </Button>
            </div>
          </div>
          <hr />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {currentUser?.role === "STUDENT" 
          ? (showAllCourses ? "Available Courses" : "Enrolled Courses")
          : "Published Courses"
        } ({displayedCourses.length})
      </h2>
      <hr />

      {!showAllCourses && currentUser?.role === "STUDENT" && displayedCourses.length === 0 && (
        <div className="alert alert-info" role="alert">
          <p>You are not enrolled in any courses yet.</p>
          <p>Click "Browse All Courses" above to find and enroll in available courses.</p>
          <Link href="/Courses/BrowseAllCourses">
            <Button variant="success" size="sm">
              Browse All Courses
            </Button>
          </Link>
        </div>
      )}

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => (
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

                    {currentUser?.role === "FACULTY" && (
                      <>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(c._id);
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
                        <Button variant="primary" className="float-start"> Go </Button>
                      </>
                    )}

                    {!showAllCourses && isEnrolled(c._id) && (
                      <Button variant="primary" className="float-start"> Go </Button>
                    )}

                    {currentUser?.role === "STUDENT" && showAllCourses && (
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
