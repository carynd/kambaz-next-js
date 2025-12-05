"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);

    // Get the section (e.g., "Quizzes", "Assignments", "Home")
    // pathSegments: ["Courses", "cid", "Quizzes", "qid", "Edit"]
    // or ["Courses", "cid", "Quizzes"]

    let breadcrumbText = "";

    // Find the main section (Quizzes, Assignments, Home, etc.)
    const cidIndex = pathSegments.indexOf("Courses") + 1;
    const sectionIndex = cidIndex + 1;
    const section = pathSegments[sectionIndex];

    if (!section || section === "Courses") {
        breadcrumbText = course?.name || "";
    } else {
        // Handle special cases
        const displaySection = section === "Table" ? "People" : section;

        // Check if we're viewing a specific item (quiz, assignment, etc.)
        const itemId = pathSegments[sectionIndex + 1];

        if (itemId && section === "Quizzes" && itemId !== "new") {
            // We're viewing a specific quiz
            const quiz = quizzes.find((q: any) => q._id === itemId);
            if (quiz) {
                breadcrumbText = `${course?.name} > ${displaySection} > ${quiz.title}`;
            } else {
                breadcrumbText = `${course?.name} > ${displaySection}`;
            }
        } else if (itemId === "new") {
            // Creating a new item
            breadcrumbText = `${course?.name} > ${displaySection} > New ${section.slice(0, -1)}`;
        } else {
            // Just viewing the section
            breadcrumbText = `${course?.name} > ${displaySection}`;
        }
    }

    return (
        <span className="text-danger">
            {breadcrumbText}
        </span>
    );
}
