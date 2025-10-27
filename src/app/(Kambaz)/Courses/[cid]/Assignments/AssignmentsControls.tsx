"use client";
import { FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";

export default function AssignmentsControls() {
  const { cid } = useParams();
  const router = useRouter();

  return (
    <div id="wd-assignments-controls" className="d-flex align-items-center">
      <div className="flex-grow-1 me-2">
        <InputGroup>
          <InputGroupText>
            <FaSearch />
          </InputGroupText>
          <FormControl
            placeholder="Search for Assignment"
            aria-label="Search for Assignment"
          />
        </InputGroup>
      </div>

      <div>
        <Button variant="secondary" className="me-2">
          <FaPlus className="me-1" />
          Group
        </Button>
        <Button
          variant="danger"
          onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
        >
          <FaPlus className="me-1" />
          Assignment
        </Button>
      </div>
    </div>
  );
}
