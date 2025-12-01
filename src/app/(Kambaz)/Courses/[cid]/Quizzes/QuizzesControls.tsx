"use client";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useParams } from "next/navigation";
import * as client from "./client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuizzesControls() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer || { quizzes: [] });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddQuiz = async () => {
    try {
      const newQuiz = await client.createQuiz(cid as string, {
        title: "Untitled Quiz",
        course: cid,
      });
      router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}/Edit`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
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

      <div>
        <Button
          variant="danger"
          onClick={handleAddQuiz}
        >
          <FaPlus className="me-1" />
          Quiz
        </Button>
      </div>
    </div>
  );
}
