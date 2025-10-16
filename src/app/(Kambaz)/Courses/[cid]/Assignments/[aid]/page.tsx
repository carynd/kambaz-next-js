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
    return dateString.slice(0, 16);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl defaultValue={assignment.title} id="wd-name" />
      </FormGroup>

      <FormGroup className="mb-4">
        <div className="border rounded p-3"
          style={{ minHeight: '200px', backgroundColor: '#f8f9fa' }}
          dangerouslySetInnerHTML={{ __html: assignment.description }}
        >
        </div>
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
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </Col>
        <Col sm={9}>
          <FormSelect defaultValue="Percentage" id="wd-display-grade-as">
            <option>Percentage</option>
            <option>Points</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col sm={3} className="text-end">
          <FormLabel className="pt-2">Assign</FormLabel>
        </Col>
        <Col sm={9}>
          <div className="border p-3 rounded">
            <FormGroup className="mb-3">
              <FormLabel htmlFor="wd-assign-to"><strong>Assign to</strong></FormLabel>
              <FormControl defaultValue="Everyone" id="wd-assign-to" />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="wd-due-date"><strong>Due</strong></FormLabel>
              <FormControl
                type="datetime-local"
                defaultValue={formatDateTimeForInput(assignment.dueDate)}
                id="wd-due-date"
              />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel htmlFor="wd-available-from"><strong>Available from</strong></FormLabel>
                  <FormControl
                    type="datetime-local"
                    defaultValue={formatDateTimeForInput(assignment.availableFromDate)}
                    id="wd-available-from"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel htmlFor="wd-available-until"><strong>Until</strong></FormLabel>
                  <FormControl
                    type="datetime-local"
                    id="wd-available-until"
                    defaultValue={formatDateTimeForInput(assignment.availableUntilDate)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <hr />
      <div className="d-flex justify-content-end gap-2 mb-4">
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="light" className="border px-4">Cancel</Button>
        </Link>
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="danger" className="px-4">Save</Button>
        </Link>
      </div>

    </div>
  );
}
