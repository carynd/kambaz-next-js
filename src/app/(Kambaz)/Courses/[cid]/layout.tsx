"use client";
import { ReactNode, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const params = useParams();
  const cid = params.cid as string;
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const router = useRouter();

  const course = courses.find((course: any) => course._id === cid);

  const isEnrolled = () => {
    if (!currentUser) return false;
    return enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === cid
    );
  };

  useEffect(() => {
    if (!currentUser || !isEnrolled()) {
      router.push("/Dashboard");
    }
  }, [currentUser, enrollments, cid, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-none d-md-block mt-3">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <Breadcrumb course={course} />
      </h2>
      <hr className="d-none d-md-block" />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>

  );
}
