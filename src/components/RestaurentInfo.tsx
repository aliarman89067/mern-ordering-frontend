import { Restaurent } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurent: Restaurent;
};

export default function RestaurentInfo({ restaurent }: Props) {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurent.restaurentName}
        </CardTitle>
        <CardDescription>
          {restaurent.city}, {restaurent.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurent.cuisines.map((cuisine, index) => (
          <span className="flex">
            <span>{cuisine}</span>
            {index < restaurent.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}
