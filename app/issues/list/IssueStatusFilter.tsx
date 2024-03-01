"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

// Optional value to satisfy "All".
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" }
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      // Keeps filter paramters upon reload.
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        // Allows selection of filter after sort parameter.
        const params = new URLSearchParams();
        // Add key value pairs.
        if (status) params.append("status", status);
        // If query parameter, append value.
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        // Convert to string and make URL look neater.
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value ?? "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
