"use client";
import React from "react";
import { usePathname } from "next/navigation";


export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
    const pathname = usePathname();
    const parts = pathname.split("/").filter(Boolean);
    let section = "Home";

    if (parts.length >= 3) {
        section = parts[2];

        if (section === "People" && parts[3] === "Table") {
            section = "People";
        }
    }

    return (
        <>
            {course?.name} &gt; {section}
        </>
    );
}
