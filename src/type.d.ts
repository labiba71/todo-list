export interface Todo {
  id: string;
  title: string;
  details: string;
  color: string;
  date: string;
  done: boolean;
}

export interface State {
  todos: Todo[];
}