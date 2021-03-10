import React from 'react'
import { useStyles } from './Style';
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Grid, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { CardComponent } from '../../components/card/CardComponent';
import { DrawerComponent } from '../../components/drawer/DrawerComponent';
import { AddTodoForm } from '../../components/addTodo/AddTodoForm';
import { useSelector } from 'react-redux';
import { State, Todo } from "../../type";

export const TodoPage = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const todos = useSelector((state: State) => state.todos);
  const [searchTodo, setSearchTodo] = React.useState<string>("");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <DrawerComponent setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                className={classes.searchContainer}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchTodo(e.target.value);
                }}
                id="input-with-icon-grid"
                label="Search"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.cardList}>
          {searchTodo ? (todos.filter(
            (item: Todo) => !item.title.toLowerCase().indexOf(searchTodo.toLowerCase())
          ).map((filteredItem: Todo) => (
            <CardComponent key={filteredItem.id} todo={filteredItem} />
          ))) : todos.length > 0 ?
              (todos.map((todo, i) => (
                <CardComponent key={todo.id} todo={todo} />
              ))) : <p>No Todos to Show!</p>}
        </div>
      </main>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"Add Todo"}</DialogTitle>
        <DialogContent>
          <AddTodoForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
