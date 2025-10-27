"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { FormControl, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFromDate: "",
    availableUntilDate: "",
    course: cid,
  });

  useEffect(() => {

    if (aid !== "new") {
      const existingAssignment = assignments.find((a: any) => a._id === aid);
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }

  }, [aid, assignments]);

  const handleSave = () => {
    if (aid === "new") {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <h3>{aid === "new" ? "New Assignment" : "Edit Assignment"}</h3>
      <hr />

      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label fw-bold">Assignment Name</label>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          placeholder="Enter assignment name"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label fw-bold">Description</label>
        <FormControl
          as="textarea"
          id="wd-description"
          rows={5}
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          placeholder="Enter assignment description"
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="wd-points" className="form-label fw-bold">Points</label>
          <FormControl
            id="wd-points"
            type="number"
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="wd-due-date" className="form-label fw-bold">Due Date</label>
          <FormControl
            id="wd-due-date"
            type="datetime-local"
            value={assignment.dueDate}
            onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="wd-available-from" className="form-label fw-bold">Available From</label>
          <FormControl
            id="wd-available-from"
            type="datetime-local"
            value={assignment.availableFromDate}
            onChange={(e) => setAssignment({ ...assignment, availableFromDate: e.target.value })}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="wd-available-until" className="form-label fw-bold">Available Until</label>
          <FormControl
            id="wd-available-until"
            type="datetime-local"
            value={assignment.availableUntilDate}
            onChange={(e) => setAssignment({ ...assignment, availableUntilDate: e.target.value })}
          />
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
