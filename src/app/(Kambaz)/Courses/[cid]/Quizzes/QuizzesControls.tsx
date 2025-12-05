"use client";
import { FormControl, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch, FaEllipsisV, FaCog, FaPrint } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuizzesControls() {
  const { cid } = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddQuiz = () => {
    // Navigate to Edit page with "new" as the quiz ID
    // The quiz will only be created when user clicks Save or Save and Publish
    router.push(`/Courses/${cid}/Quizzes/new/Edit`);
  };

  const handleImportQuiz = () => {
    // Placeholder for import functionality
    console.log("Import quiz clicked");
  };

  const handleQuizSettings = () => {
    // Placeholder for settings functionality
    console.log("Quiz settings clicked");
  };

  const handlePrintQuizzes = () => {
    // Placeholder for print functionality
    window.print();
  };

  return (
    <div id="wd-quizzes-controls" className="d-flex align-items-center">
      <div className="flex-grow-1 me-2">
        <InputGroup>
          <InputGroupText>
            <FaSearch />
          </InputGroupText>
          <FormControl
            placeholder="Search for Quiz"
            aria-label="Search for Quiz"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="d-flex gap-2 align-items-center">
        <Button
          variant="danger"
          onClick={handleAddQuiz}
        >
          <FaPlus className="me-1" />
          Quiz
        </Button>

        {/* 3-Dot Dropdown Menu */}
        <Dropdown>
          <DropdownToggle
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            id="quiz-menu-dropdown"
            style={{ border: "1px solid #dee2e6", padding: "0.375rem 0.75rem" }}
          >
            <FaEllipsisV />
          </DropdownToggle>
          <DropdownMenu align="end">
            <DropdownItem onClick={handleImportQuiz}>
              Import Quiz
            </DropdownItem>
            <DropdownItem onClick={handleQuizSettings}>
              <FaCog className="me-2" /> Quiz Settings
            </DropdownItem>
            <DropdownItem onClick={handlePrintQuizzes}>
              <FaPrint className="me-2" /> Print
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
