"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as courseClient from "../../../../Courses/client";

export default function PeopleTablePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsersForCourse = async () => {
    if (cid) {
      const enrolledUsers = await courseClient.findUsersForCourse(cid as string);
      setUsers(enrolledUsers);
    }
  };

  useEffect(() => {
    fetchUsersForCourse();
  }, [cid]);

  return (
    <PeopleTable
      users={users}
      enrollments={[]}
      cid={cid as string}
      fetchUsers={fetchUsersForCourse}
    />
  );
}
