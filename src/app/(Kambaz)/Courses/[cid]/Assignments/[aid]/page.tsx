"use client";
import { Row, Col, Button, FormGroup, FormLabel, FormControl, FormSelect, FormCheck } from "react-bootstrap";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: any) => a._id === aid);

  if (!assignment) {
    return <div className="p-4">Assignment not found</div>;
  }

  const formatDateTimeForInput = (dateString: string) => {
    if (!dateString) return "";
    return dateString.slice(0, 16); // Gets YYYY-MM-DDTHH:mm from ISO string
  };

  return (
    <div id="wd-assignments-editor" className="p-4">

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl defaultValue={assignment.title} id="wd-name" />
      </FormGroup>


      <FormGroup className="mb-4">
        <FormControl
          as="textarea"
          rows={8}
          id="wd-description"
          defaultValue={assignment.description}
        />
      </FormGroup>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-sm-end">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </Col>
        <Col sm={9}>
          <FormControl type="number" defaultValue={assignment.points} id="wd-points" />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-sm-end">
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
        </Col>
        <Col sm={9}>
          <FormSelect defaultValue="ASSIGNMENTS" id="wd-group">
            <option>ASSIGNMENTS</option>
            <option>EXAMS</option>
            <option>PROJECTS</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-sm-end">
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </Col>
        <Col sm={9}>
          <FormSelect defaultValue="Percentage" id="wd-display-grade-as">
            <option>Percentage</option>
            <option>Points</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3} className="text-sm-end pt-2">
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
        </Col>
        <Col sm={9}>
          <div className="border p-3 rounded">
            <FormSelect defaultValue="Online" id="wd-submission-type" className="mb-3">
              <option>Online</option>
              <option>On Paper</option>
              <option>No Submission</option>
            </FormSelect>
            <div>
              <strong className="d-block mb-2">Online Entry Options</strong>
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
        <Col sm={3} className="text-sm-end pt-2">
          <FormLabel>Assign</FormLabel>
        </Col>
        <Col sm={9}>
          <div className="border p-3 rounded">
            <FormGroup className="mb-3">
              <FormLabel htmlFor="wd-assign-to"><strong>Assign To</strong></FormLabel>
              <FormControl defaultValue="Everyone" id="wd-assign-to" />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="wd-due-date"><strong>Due</strong></FormLabel>
              <FormControl type="date" defaultValue={formatDateTimeForInput(assignment.dueDate)} id="wd-due-date" />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel htmlFor="wd-available-from"><strong>Available from</strong></FormLabel>
                  <FormControl type="date" defaultValue={formatDateTimeForInput(assignment.availableFromDate)} id="wd-available-from" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel htmlFor="wd-available-until"><strong>Until</strong></FormLabel>
                  <FormControl type="date" id="wd-available-until" defaultValue={formatDateTimeForInput(assignment.availableUntilDate)} />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />

      <div className="text-end">
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button id="wd-cancel" variant="light" className="me-2 border">Cancel</Button>
        </Link>
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button id="wd-save" variant="danger">Save</Button>
        </Link>
      </div>

    </div>
  );
}
