"use client"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = link === "People" ? `/Courses/${cid}/People/Table` : `/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link);

        return (
          <Link
            key={link}
            id={`wd-course-${link.toLowerCase()}-link`}
            href={linkPath}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"
              }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
