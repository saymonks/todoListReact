import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addTask, postTodo } from "../store/TodoSlice/todoslice";
import { TaskInfo } from "../models/models";
import { useAppDispatch } from "../store/store";

export default function AddTask() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAddTask = () => {
    const newTask = {
      title: value,
      id: Date.now(),
      completed: false,
    };

    const data = {
      task: newTask,
      callBack: () => {
        setValue("");
      },
    };

    dispatch(postTodo(data));
  };

  return (
    <div className="flex justify-center mt-10">
      <input
        className="w-[800px] h-[50px] border pl-5"
        onChange={changeValue}
        placeholder="Add new task..."
        value={value}
      ></input>
      <button className="border" onClick={handleAddTask}>
        add
      </button>
    </div>
  );
}
