import { memo } from "react";
import { Todo } from "../lib/types";
import RenderCounter from "./RenderCounter";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { X, Star } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdatePriority: (id: string, priority: "low" | "medium" | "high") => void;
  onAddTag: (id: string, tag: string) => void;
  onRemoveTag: (id: string, tag: string) => void;
  onAddNote: (id: string, note: string) => void;
}

const TodoItem = ({
  todo,
  onToggle,
  onRemove,
  onUpdatePriority,
  onAddTag,
  onRemoveTag,
  onAddNote,
}: TodoItemProps) => {
  const handleAddTag = () => {
    const tag = prompt("Enter a new tag:");
    if (tag) {
      onAddTag(todo.id, tag);
    }
  };

  const handleAddNote = () => {
    const note = prompt("Enter a note:", todo.metadata.notes || "");
    if (note !== null) {
      onAddNote(todo.id, note);
    }
  };

  return (
    <RenderCounter componentName={`TodoItem: ${todo.text}`}>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
            <div className="flex-1 flex justify-between">
              <span className={todo.completed ? "line-through text-gray-500" : ""}>
                {todo.text}
              </span>

              <div className="flex gap-2">
                {todo.isFavorite ? <Star /> : null}
                <Badge
                  variant={
                    todo.metadata.priority === "high"
                      ? "destructive"
                      : todo.metadata.priority === "medium"
                        ? "secondary"
                        : "default"
                  }
                >
                  {todo.metadata.priority}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-2">
            {todo.metadata.notes && (
              <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                {todo.metadata.notes}
              </div>
            )}

            {todo.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {todo.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <button
                      className="h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-gray-200"
                      onClick={() => onRemoveTag(todo.id, tag)}
                    >
                      <X size={10} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Select
              onValueChange={(value: "low" | "medium" | "high") => onUpdatePriority(todo.id, value)}
              defaultValue={todo.metadata.priority}
            >
              <SelectTrigger className="!h-7">
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleAddTag}>
              Add Tag
            </Button>
            <Button variant="outline" size="sm" onClick={handleAddNote}>
              {todo.metadata.notes ? "Edit Note" : "Add Note"}
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onRemove(todo.id)}>
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </RenderCounter>
  );
};

export default memo(TodoItem);
