import { FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentsControls() {
  return (
    <div id="wd-assignments-controls" className="d-flex align-items-center">

      {/* Search Bar on the left, taking up available space */}
      <div className="flex-grow-1 me-">
        
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

      {/* Buttons on the right */}
      <div>
        <Button variant="secondary" className="me-1">
          <FaPlus className="me-1" />
          Group
        </Button>
        <Button variant="danger">
          <FaPlus className="me-1" />
          Assignment
        </Button>
      </div>
      
    </div>
  );
}