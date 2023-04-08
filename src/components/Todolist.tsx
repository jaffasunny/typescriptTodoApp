import { Label, Checkbox } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { IProps } from "../App";

const Todolist: React.FC<IProps> = ({ todos, setTodos }) => {
  const handleDelete = (id: number) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();

      setTodos &&
        todos &&
        setTodos(todos.filter((_todo: IProps["todo"]) => _todo?.id !== id));

      toast.success(`Todo id: ${id} deleted!`);
    };
  };

  return (
    <div className='border-yellow-600 border-4 rounded-lg mt-2 h-4/6'>
      {todos?.map((todo) => (
        <div className='bg-green-200 p-3 -z-1' key={todo.id}>
          <div className='flex items-center justify-between'>
            <span
              className={`text-lg font-medium text-gray-900 ${
                todo.completed && "line-through"
              }`}>
              {todo.name}
            </span>

            <div className='flex gap-2'>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='completed text-brown-200'
                  defaultChecked={todo.completed}
                  className='cursor-pointer'
                />
                <Label htmlFor='completed'>Completed</Label>
              </div>

              <div
                className='flex items-center cursor-pointer'
                onClick={handleDelete(todo.id)}>
                <MdDelete color='red' />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todolist;
