import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  // Third value takes user to issues page and filter to open issues.
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" }
  ];

  return (
    <Flex gap='4'>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction='column' gap='1'>
            <Link href={`/issues/list?status=${container.status}`}>
              {container.label}
            </Link>
            <Text size='5' className='text-sm font-bold'>
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
