import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex justify='between'>
      <IssueStatusFilter />
      <Button>
        <PlusIcon />
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
