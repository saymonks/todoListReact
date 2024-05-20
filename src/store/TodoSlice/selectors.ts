import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectState = (state : RootState) => state.todos

export const todosSelector = createSelector(selectState, (todos) => todos.arr)