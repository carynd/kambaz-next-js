import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>

                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5001" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5001 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 2
                  </CardText>
                  <Button variant="primary">Go</Button>

                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5900" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5900 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 3
                  </CardText>
                  <Button variant="primary">Go</Button>

                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5200" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5200 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 4
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5300" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5300 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 5
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5400" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5400 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 6
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5500" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5500 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 7
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5600" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5600 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 8
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5700" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5700 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 9
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5800" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5800 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 10
                  </CardText>
                  <Button variant="primary">Go</Button>

                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5880" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5880 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 11
                  </CardText>
                  <Button variant="primary">Go</Button>

                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5889" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5889 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 12
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5890" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5890 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 13
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5877" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top"
                  src="/images/reactjs.jpg" width="100%" height="160"
                  alt="Image of the React JS course" />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5877 React JS </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Course 14
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}