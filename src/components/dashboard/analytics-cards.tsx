import { CheckCircle2, Clock3, Inbox, SearchCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  total: number;
  pending: number;
  inReview: number;
  resolved: number;
};

const items = [
  { key: "total", label: "Total feedback", icon: Inbox },
  { key: "pending", label: "Pending", icon: Clock3 },
  { key: "inReview", label: "In review", icon: SearchCheck },
  { key: "resolved", label: "Resolved", icon: CheckCircle2 },
] as const;

export function AnalyticsCards({ total, pending, inReview, resolved }: Props) {
  const values = { total, pending, inReview, resolved };

  return (
    <div id="overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.key}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-semibold text-neutral-500">{item.label}</p>
                <p className="mt-2 text-3xl font-bold">{values[item.key]}</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-teal-50 text-teal-800">
                <Icon className="h-5 w-5" />
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
