import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskInfo } from "../models/models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { todosSelector } from "../store/TodoSlice/selectors";
import {
  deleteTodo,
  fetchTodos,
  putTodo,
  toggleTask,
} from "../store/TodoSlice/todoslice";

export default function LiTasks() {
  const todos = useAppSelector(todosSelector);
  const dispatch = useAppDispatch();

  console.log(todos);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleChecked = (todo: TaskInfo) => {
    // dispatch(toggleTask(id));
    dispatch(putTodo(todo));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="flex flex-col mt-10 items-center">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`w-[830px] h-[50px] border p-[10px] mb-5 relative 0 ${
            todo.completed ? "bg-green-400" : "bg-white"
          }`}
        >
          <input
            className="border mr-2"
            type="checkbox"
            checked={todo.completed}
            onClick={() => {
              handleChecked(todo);
            }}
          />
          <span
            onClick={() => {
              handleChecked(todo);
            }}
          >
            {todo.title}
          </span>
          <button
            className="absolute right-1 border cursor-pointer w-[30px] h-[30px] text-center"
            onClick={() => {
              handleDelete(todo.id);
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
