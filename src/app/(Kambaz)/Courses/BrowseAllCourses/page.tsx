"use client";
import { useState, useEffect } from "react";
import * as client from "../client";
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function BrowseAllCourses() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentUser || currentUser.role !== "STUDENT") {
          return;
        }

        const allCourses = await client.fetchAllCourses();
        setCourses(allCourses);

        const myCourses = await client.findMyCourses();
        const enrolledIds = myCourses.map((c: any) => c._id);
        setEnrolledCourseIds(enrolledIds);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const isEnrolled = (courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  };

  const handleEnrollment = async (courseId: string) => {
    if (!currentUser) return;
    try {
      if (isEnrolled(courseId)) {
        await client.unenrollFromCourse(currentUser._id, courseId);
        setEnrolledCourseIds(enrolledCourseIds.filter(id => id !== courseId));
      } else {
        await client.enrollIntoCourse(currentUser._id, courseId);
        setEnrolledCourseIds([...enrolledCourseIds, courseId]);
      }
    } catch (error) {
      console.error("Error handling enrollment:", error);
    }
  };

  if (!currentUser || currentUser.role !== "STUDENT") {
    return (
      <div id="wd-browse-courses">
        <h1>Browse Courses</h1>
        <hr />
        <p className="text-center text-danger">This page is only available for students.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div id="wd-browse-courses">
        <h1>Browse Courses</h1>
        <hr />
        <p className="text-center">Loading courses...</p>
      </div>
    );
  }

  return (
    <div id="wd-browse-courses">
      <h1>Browse All Courses</h1>
      <p className="text-muted">Explore and enroll in available courses</p>
      <hr />

      <h2>Available Courses ({courses.length})</h2>
      <hr />

      <div id="wd-courses-list">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c: any) => (
            <Col className="wd-course-card" style={{ width: "300px" }} key={c._id}>
              <Card>
                <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                <CardBody className="card-body">
                  <CardTitle className="wd-course-title text-nowrap overflow-hidden">
                    {c.name}
                  </CardTitle>
                  <p className="text-muted small">
                    {c.number}
                  </p>
                  <CardText className="wd-course-description overflow-hidden" style={{ height: "80px" }}>
                    {c.description}
                  </CardText>

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

                  {isEnrolled(c._id) && (
                    <Link href={`/Courses/${c._id}/Home`}>
                      <Button variant="primary" className="w-100 mt-2">
                        Go to Course
                      </Button>
                    </Link>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {courses.length === 0 && (
        <div className="alert alert-info">
          No courses available at the moment.
        </div>
      )}
    </div>
  );
}
