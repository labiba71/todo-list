export interface Todo {
  id: string;
  title: string;
  details: string;
  color: string;
  date: string;
}

export interface State {
  todos: Todo[];
}