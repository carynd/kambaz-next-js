"use client";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">

      <Form.Group className="mb-3">
        <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
        <Form.Control defaultValue="A1 - ENV + HTML" id="wd-name" />
      </Form.Group>


      <Form.Group className="mb-4">
        <Form.Control 
          as="textarea" 
          rows={6} 
          id="wd-description" 
          defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify..."
        />
      </Form.Group>

      <Row className="mb-3 align-items-center">
        <Col sm={4} className="text-sm-end">
          <Form.Label htmlFor="wd-points">Points</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Control type="number" defaultValue={100} id="wd-points" />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={4} className="text-sm-end">
          <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Select defaultValue="ASSIGNMENTS" id="wd-group">
            <option>ASSIGNMENTS</option>
            <option>EXAMS</option>
            <option>PROJECTS</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={4} className="text-sm-end">
          <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Select defaultValue="Percentage" id="wd-display-grade-as">
            <option>Percentage</option>
            <option>Points</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="text-sm-end pt-2">
          <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
        </Col>
        <Col sm={8}>
          <div className="border p-3 rounded">
            <Form.Select defaultValue="Online" id="wd-submission-type">
              <option>Online</option>
              <option>On Paper</option>
              <option>No Submission</option>
            </Form.Select>
            <div className="mt-3">
              <strong>Online Entry Options</strong>
              <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
              <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked />
              <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
              <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
              <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="text-sm-end pt-2">
          <Form.Label>Assign</Form.Label>
        </Col>
        <Col sm={8}>
          <div className="border p-3 rounded">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-assign-to"><strong>Assign To</strong></Form.Label>
              <Form.Control defaultValue="Everyone" id="wd-assign-to" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-due-date"><strong>Due</strong></Form.Label>
              <Form.Control type="datetime-local" defaultValue="2024-05-13T23:59" id="wd-due-date" />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="wd-available-from"><strong>Available from</strong></Form.Label>
                  <Form.Control type="datetime-local" defaultValue="2024-05-06T00:00" id="wd-available-from" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="wd-available-until"><strong>Until</strong></Form.Label>
                  <Form.Control type="datetime-local" id="wd-available-until" defaultValue="2024-05-08T00:00" />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />
      
      <div className="text-end">
        <Button id="wd-cancel" variant="secondary" className="me-2">Cancel</Button>
        <Button id="wd-save" variant="danger">Save</Button>
      </div>

    </div>
  );
}