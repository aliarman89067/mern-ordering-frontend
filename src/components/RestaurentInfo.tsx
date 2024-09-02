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
      <CardContent className="flex flex-wrap">
        {restaurent.cuisines.map((cuisine, index) => (
          <div className="flex">
            {cuisine}

            {index < restaurent.cuisines.length - 1 && <Dot />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
