import { useState } from "react";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import "./App.css";

export type Types = {
  todos: { id: number; name: string; completed: boolean }[];
  todo: { id: number; name: string; completed: boolean };
};

function App() {
  const [todos, setTodos] = useState<Types["todos"]>([
    {
      id: Math.random() * Date.now(),
      name: "Learning TypeScript Today!",
      completed: false,
    },
  ]);

  const [todo, setTodo] = useState<Types["todo"]>({
    id: 1,
    name: "",
    completed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setTodo({
      ...todo,
      id: Math.random() * Date.now(),
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let match: boolean = false;

    todos.forEach((_todo) => (_todo.name === todo.name ? (match = true) : ""));

    if (!match) {
      setTodos([...todos, todo]);
      setTodo({ id: 0, name: "", completed: false });
    } else {
      return toast.warn("Cannot add same todo!");
    }
  };

  return (
    <div className='h-screen'>
      <form className='flex flex-col gap-4' onSubmit={submitForm}>
        <div>
          <div className='mb-2 flex items-center gap-2'>
            <Label htmlFor='task' value='Todo' />
            <TextInput
              id='task'
              name='name'
              type='text'
              placeholder='Code 4 hours today!'
              required={true}
              className='flex-1 max-w-full lg:max-w-xl'
              onChange={handleChange}
              value={todo.name}
            />
          </div>

          <div className='flex items-center gap-2'>
            <Checkbox
              id='completed'
              name='completed'
              checked={todo.completed}
              onChange={(e) =>
                setTodo({ ...todo, [e.target.name]: e.target.checked })
              }
              className='cursor-pointer'
            />
            <Label htmlFor='completed'>Completed</Label>
          </div>
        </div>

        <Button type='submit'>Add</Button>
      </form>

      <div className='border-yellow-600 border-4 rounded-lg mt-2 h-4/6'>
        {todos.map((todo) => (
          <div className='bg-green-200 p-3 -z-1' key={todo.id}>
            <div className='flex items-center justify-between max-w-full lg:max-w-lg'>
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

                <div className='flex items-center cursor-pointer'>
                  <MdDelete color='red' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
