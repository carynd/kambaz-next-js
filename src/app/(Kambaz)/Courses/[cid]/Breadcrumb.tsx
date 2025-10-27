"use client";
import React from "react";
import { usePathname } from "next/navigation";


export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);
    const currentSection = pathSegments[pathSegments.length - 1];
    const section = currentSection === "Table" ? "People" : currentSection;

    return (
        <span className="text-danger">
            {course?.name} &gt; {section}
        </span>
    );
}
