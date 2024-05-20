import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { State, TaskInfo } from "../../models/models";

const initialState : State = {
  arr: [],
  isLoading: false,
  value: ""
}

export const fetchTodos = createAsyncThunk(
  'todos/getTodos',
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=5`)
    const data = response.json()
    return data
  }
)

export const postTodo = createAsyncThunk(
  'todos/postTodos',
  async (data: {task: TaskInfo, callBack? : () => void } ) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: "POST",
      body: JSON.stringify(data.task),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    // const data = response.json() id постоянно 201
    data.callBack?.()
    return data.task
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTask',
  async (id : number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DElETE",
    })
    
    return id
  }
)

export const putTodo = createAsyncThunk(
  'todos/putTodos',
  async (task : TaskInfo) => {
    const updateTask = {...task, completed: !task.completed}
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(updateTask),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    
    return updateTask
  }
)

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskInfo>) => {
      state.arr.push(action.payload)
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.arr = state.arr.filter((todo) => todo.id !== action.payload)
    },

    toggleTask: (state, action: PayloadAction<number>) => {
      state.arr = state.arr.map((todo) => {
        if (todo.id === action.payload) {
          return {...todo, completed: !todo.completed}
        }
        return todo
      })

    }
  },
  extraReducers: (builder) => {

    builder.addCase(fetchTodos.pending, (state, action) => {
      
      state.isLoading = true;
      console.log("loading");
      
    })
    
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.arr = action.payload;
      state.isLoading = false;
      console.log("success");
    })

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.value = "Ошибка";
      state.isLoading = false;
      console.log('error');
      
    })

    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.arr.unshift(action.payload)
    })

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.arr = state.arr.filter((task) => task.id !== action.payload)
    })

     builder.addCase(putTodo.fulfilled, (state, action) => {
      state.arr = state.arr.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload
        }
        return todo
      })
    })

  },
})

export const {addTask,deleteTask, toggleTask} = todoSlice.actions;
export default todoSlice.reducer;

