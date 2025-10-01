"use client";
import { Row, Col, Button, FormGroup, FormLabel, FormControl, FormSelect, FormCheck } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl defaultValue="A1 - ENV + HTML" id="wd-name" />
      </FormGroup>


      <FormGroup className="mb-4">
        <FormControl 
          as="textarea" 
          rows={6} 
          id="wd-description" 
          defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify..."
        />
      </FormGroup>

      <Row className="mb-3 align-items-center">
        <Col sm={4} className="text-sm-end">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </Col>
        <Col sm={8}>
          <FormControl type="number" defaultValue={100} id="wd-points" />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={4} className="text-sm-end">
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
        </Col>
        <Col sm={8}>
          <FormSelect defaultValue="ASSIGNMENTS" id="wd-group">
            <option>ASSIGNMENTS</option>
            <option>EXAMS</option>
            <option>PROJECTS</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={4} className="text-sm-end">
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </Col>
        <Col sm={8}>
          <FormSelect defaultValue="Percentage" id="wd-display-grade-as">
            <option>Percentage</option>
            <option>Points</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="text-sm-end pt-2">
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
        </Col>
        <Col sm={8}>
          <div className="border p-3 rounded">
            <FormSelect defaultValue="Online" id="wd-submission-type">
              <option>Online</option>
              <option>On Paper</option>
              <option>No Submission</option>
            </FormSelect>
            <div className="mt-3">
              <strong>Online Entry Options</strong>
              <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" />
              <FormCheck type="checkbox" id="wd-website-url" label="Website URL" defaultChecked />
              <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" />
              <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" />
              <FormCheck type="checkbox" id="wd-file-upload" label="File Uploads" />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="text-sm-end pt-2">
          <FormLabel>Assign</FormLabel>
        </Col>
        <Col sm={8}>
          <div className="border p-3 rounded">
            <FormGroup className="mb-3">
              <FormLabel htmlFor="wd-assign-to"><strong>Assign To</strong></FormLabel>
              <FormControl defaultValue="Everyone" id="wd-assign-to" />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="wd-due-date"><strong>Due</strong></FormLabel>
              <FormControl type="date" defaultValue="2024-05-13" id="wd-due-date" />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel htmlFor="wd-available-from"><strong>Available from</strong></FormLabel>
                  <FormControl type="date" defaultValue="2024-05-06" id="wd-available-from" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel htmlFor="wd-available-until"><strong>Until</strong></FormLabel>
                   <FormControl type="date" id="wd-available-until" defaultValue="2024-05-08" />
                </FormGroup>
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