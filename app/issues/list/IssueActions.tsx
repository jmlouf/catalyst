import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";

const IssueActions = () => {
  return (
    <div className='mb-5'>
      <Button>
        <PlusIcon />
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
