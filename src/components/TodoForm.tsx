import { useState } from 'react';
import RenderCounter from './RenderCounter';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <RenderCounter componentName="TodoForm">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1"
            />
            <Button type="submit" variant="default">Add Todo</Button>
          </form>
        </CardContent>
      </Card>
    </RenderCounter>
  );
};

export default TodoForm;
