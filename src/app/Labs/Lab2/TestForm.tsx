"use client";
import { FormGroup, FormLabel } from "react-bootstrap";

export default function TestForm() {
  return (
    <div style={{ border: "2px solid red", padding: "10px", margin: "20px" }}>
      <h3>This is the Test Component</h3>
      <p>If you can see this, the import is working.</p>
      <FormGroup>
        <FormLabel>Test Label</FormLabel>
      </FormGroup>
    </div>
  );
}