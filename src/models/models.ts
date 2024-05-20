export interface TaskInfo {
  title: string,
  id: number,
  completed: boolean
}

export interface State {
arr: TaskInfo[]
isLoading: boolean
value: string
}