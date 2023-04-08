import { useState } from "react";

import "./App.css";
import Form from "./components/Form";
import Todolist from "./components/Todolist";

export type Types = {
  todos: { id: number; name: string; completed: boolean }[];
  todo: { id: number; name: string; completed: boolean };
};

export type IProps = {
  todo?: Types["todo"];
  todos?: Types["todos"];

  setTodo?: React.Dispatch<React.SetStateAction<Types["todo"]>>;
  setTodos?: React.Dispatch<React.SetStateAction<Types["todos"]>>;
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

  return (
    <div className='h-screen max-w-full lg:max-w-lg mx-auto'>
      <Form todo={todo} setTodo={setTodo} todos={todos} setTodos={setTodos} />
      <Todolist todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
