"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: 1,
    name: "CS 5610 - Web Development",
    description: "Learn full stack web development",
    course: "CS 5610",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Assignment</h4>

      <h5>Retrieving Objects</h5>
      <a
        className="btn btn-primary"
        id="wd-retrieve-assignments"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <hr />

      <h5>Retrieving Properties</h5>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />

      <h5>Modifying Properties</h5>

      <div className="mb-3">
        <label htmlFor="wd-assignment-title" className="form-label">
          Assignment Title:
        </label>
        <FormControl
          className="w-75"
          id="wd-assignment-title"
          type="text"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a
          id="wd-update-assignment-title"
          className="btn btn-primary mt-2"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Title
        </a>
      </div>
      <hr />

      <div className="mb-3">
        <label htmlFor="wd-assignment-score" className="form-label">
          Assignment Score:
        </label>
        <FormControl
          className="w-75"
          id="wd-assignment-score"
          type="number"
          value={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })
          }
        />
        <a
          id="wd-update-assignment-score"
          className="btn btn-primary mt-2"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
      </div>
      <hr />

      <div className="mb-3">
        <label htmlFor="wd-assignment-completed" className="form-check-label">
          <input
            className="form-check-input"
            id="wd-assignment-completed"
            type="checkbox"
            checked={assignment.completed}
            onChange={(e) =>
              setAssignment({ ...assignment, completed: e.target.checked })
            }
          />
          Completed
        </label>
        <a
          id="wd-update-assignment-completed"
          className="btn btn-primary ms-2"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>
      <hr />

      {/* ===== MODULE SECTION ===== */}
      <h4>Module</h4>

      <h5>Retrieving Objects</h5>
      <a
        className="btn btn-primary"
        id="wd-retrieve-module"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <hr />

      <h5>Retrieving Properties</h5>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />

      <h5>Modifying Properties</h5>

      <div className="mb-3">
        <label htmlFor="wd-module-name" className="form-label">
          Module Name:
        </label>
        <FormControl
          className="w-75"
          id="wd-module-name"
          type="text"
          value={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
        <a
          id="wd-update-module-name"
          className="btn btn-primary mt-2"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Module Name
        </a>
      </div>
      <hr />

      <div className="mb-3">
        <label htmlFor="wd-module-description" className="form-label">
          Module Description:
        </label>
        <FormControl
          className="w-75"
          id="wd-module-description"
          type="text"
          value={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
        <a
          id="wd-update-module-description"
          className="btn btn-primary mt-2"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Module Description
        </a>
      </div>
      <hr />
    </div>
  );
}
