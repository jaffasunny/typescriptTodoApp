import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { IProps } from "../App";
import { toast } from "react-toastify";

const Form: React.FC<IProps> = ({ todo, setTodo, todos, setTodos }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setTodo &&
      todo &&
      setTodo({
        ...todo,
        id: Math.random() * Date.now(),
        [e.target.name]: e.target.value,
      });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let match: boolean = false;

    todos?.forEach((_todo) =>
      _todo.name === todo?.name ? (match = true) : ""
    );

    if (!match && todos && todo && setTodos) {
      setTodos([...todos, todo]);
      setTodo && setTodo({ id: 0, name: "", completed: false });
    } else {
      return toast.warn("Cannot add same todo!");
    }
  };

  return (
    <div>
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
              value={todo?.name}
            />
          </div>

          <div className='flex items-center gap-2'>
            <Checkbox
              id='completed'
              name='completed'
              checked={todo?.completed}
              onChange={(e) =>
                setTodo &&
                todo &&
                setTodo({ ...todo, [e.target.name]: e.target.checked })
              }
              className='cursor-pointer'
            />
            <Label htmlFor='completed'>Completed</Label>
          </div>
        </div>

        <Button type='submit'>Add</Button>
      </form>
    </div>
  );
};

export default Form;
