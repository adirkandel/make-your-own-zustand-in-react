import RenderCounter from "./RenderCounter";
import { Button } from "./ui/button";

export interface TodoFilterProps {
  filter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
}

const TodoFilter = ({ filter, onFilterChange }: TodoFilterProps) => {
  return (
    <RenderCounter componentName="TodoFilter" orientation="horizontal">
      <div className="flex space-x-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => onFilterChange("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => onFilterChange("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </Button>
      </div>
    </RenderCounter>
  );
};

export default TodoFilter;
