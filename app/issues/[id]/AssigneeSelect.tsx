"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
// import React, { useEffect, useState } from "react";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60 seconds.
    retry: 3
  });

  if (isLoading) return <Skeleton />;

  // After 3 trues, selector disappears.
  if (error) return null;

  // NO LONGER NEEDED. SEE ABOVE.
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <Select.Root
      // Change default value to "unassigned".
      defaultValue={issue.assignedToUserId || "unassigned"}
      onValueChange={(userId) => {
        // UI conveys visual feedback; no await necessary.
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId === "unassigned" ? null : userId
        });
      }}
    >
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value='unassigned'>Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
