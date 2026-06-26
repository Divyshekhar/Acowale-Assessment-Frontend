"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryLabels, statusLabels } from "@/constants/feedback";
import type { Analytics } from "@/types/api";

const colors = ["#0f766e", "#f59e0b", "#2563eb", "#dc2626", "#7c3aed"];

export function DashboardCharts({ analytics }: { analytics: Analytics }) {
  const categories = analytics.categoryDistribution.map((item) => ({
    name: categoryLabels[item.category],
    count: item.count,
  }));
  const statuses = analytics.statusDistribution.map((item) => ({
    name: statusLabels[item.status],
    count: item.count,
  }));
  const daily = analytics.feedbackSubmittedLastSevenDays.map((item) => ({
    date: new Date(`${item.date}T00:00:00`).toLocaleDateString("en", { month: "short", day: "numeric" }),
    count: item.count,
  }));

  return (
    <div id="analytics" className="grid gap-4 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Category distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie data={categories} dataKey="count" nameKey="name" outerRadius={90} label>
                {categories.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statuses}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#0f766e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Last 7 days</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
