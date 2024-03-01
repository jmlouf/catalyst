"use client";

import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

// Gets own Props to avoid dpendency on IssueSummary component.
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed }
  ];

  return (
    <Card>
      {/* Chart adapts to container size. */}
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar
            dataKey='value'
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
