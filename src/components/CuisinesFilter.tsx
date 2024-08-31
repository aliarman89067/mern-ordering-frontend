import { cuisineList } from "@/config/restaurent-options";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClicked: () => void;
};
export default function CuisinesFilter({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClicked,
}: Props) {
  const handleCuisinesReset = () => onChange([]);

  const handleCuisineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetCuisine = e.target.value;
    const isChecked = e.target.checked;
    const newCuisinesList = isChecked
      ? [...selectedCuisines, targetCuisine]
      : selectedCuisines.filter((items) => items !== targetCuisine);

    onChange(newCuisinesList);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div className="text-md font-semibold mb-2">Filter by cuisines</div>
        <div
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
          onClick={handleCuisinesReset}
        >
          Reset filters
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
      </div>
      <Button
        variant="outline"
        className="flex mt-4"
        onClick={onExpandedClicked}
      >
        {isExpanded ? (
          <span className="flex flex-row items-center">
            View Less <ChevronUp />
          </span>
        ) : (
          <span className="flex flex-row items-center">
            View More <ChevronDown />
          </span>
        )}
      </Button>
    </>
  );
}
