"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setAssignments } from "../reducer";
import { FormControl, Button } from "react-bootstrap";
import { FaCalendar } from "react-icons/fa";
import * as client from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

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
    // Only FACULTY can edit assignments
    if (currentUser?.role !== "FACULTY") {
      router.push(`/Courses/${cid}/Assignments`);
      return;
    }

    if (aid !== "new") {
      const existingAssignment = assignments.find((a: any) => a._id === aid);
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }

  }, [aid, assignments, currentUser, cid, router]);

  const handleSave = async () => {
    try {
      if (aid === "new") {
        const newAssignment = await client.createAssignmentForCourse(cid as string, assignment);
        const allAssignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(allAssignments));
      } else {
        const updatedAssignment = await client.updateAssignment(assignment);
        const allAssignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(allAssignments));
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <h3>{aid === "new" ? "New Assignment" : "Edit Assignment"}</h3>
      <hr />

      {/* Assignment Name */}
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label fw-bold">Assignment Name</label>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          placeholder="Enter assignment name"
          className="border"
        />
      </div>

      {/* Assignment Description */}
      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label fw-bold">New Assignment Description</label>
        <FormControl
          as="textarea"
          id="wd-description"
          rows={4}
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          placeholder="Enter assignment description"
          className="border"
        />
      </div>

      {/* Points */}
      <div className="mb-4">
        <label htmlFor="wd-points" className="form-label fw-bold">Points</label>
        <FormControl
          id="wd-points"
          type="number"
          value={assignment.points}
          onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
          className="border"
          style={{ maxWidth: "200px" }}
        />
      </div>

      {/* Assignment Section */}
      <div className="mb-4">
        <label className="form-label fw-bold">Assign</label>
        
        {/* Due Date */}
        <div className="mb-3">
          <label className="form-label">Due</label>
          <div className="d-flex align-items-center gap-2">
            <FormControl
              id="wd-due-date"
              type="datetime-local"
              value={assignment.dueDate}
              onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
              className="border"
              style={{ maxWidth: "300px" }}
            />
            <FaCalendar className="fs-5 text-muted" />
          </div>
        </div>

        {/* Available From and Until Row */}
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Available from</label>
            <div className="d-flex align-items-center gap-2">
              <FormControl
                id="wd-available-from"
                type="datetime-local"
                value={assignment.availableFromDate}
                onChange={(e) => setAssignment({ ...assignment, availableFromDate: e.target.value })}
                className="border"
              />
              <FaCalendar className="fs-5 text-muted" />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Until</label>
            <div className="d-flex align-items-center gap-2">
              <FormControl
                id="wd-available-until"
                type="datetime-local"
                value={assignment.availableUntilDate}
                onChange={(e) => setAssignment({ ...assignment, availableUntilDate: e.target.value })}
                className="border"
              />
              <FaCalendar className="fs-5 text-muted" />
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel} className="px-4">
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave} className="px-4">
          Save
        </Button>
      </div>
    </div>
  );
}
