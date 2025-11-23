"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as db from "../../../../Database";
import * as client from "../../../../Account/client";

export default function PeopleTablePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [enrollments] = useState(db.enrollments);

  const fetchUsers = async () => {
    const allUsers = await client.findAllUsers();
    setUsers(allUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <PeopleTable
      users={users}
      enrollments={enrollments}
      cid={cid as string}
      fetchUsers={fetchUsers}
    />
  );
}
