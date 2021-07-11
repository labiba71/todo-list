import React, { useEffect } from 'react'
import { useStyles } from './Style';
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Grid, GridSpacing, Dialog, DialogContent, DialogTitle, Paper } from '@material-ui/core';
import { CardComponent } from '../../components/card/CardComponent';
import { DrawerComponent } from '../../components/drawer/DrawerComponent';
import { AddTodoForm } from '../../components/addTodo/AddTodoForm';
import { connect } from 'react-redux';
import { Todo } from "../../type";
import InfiniteScroll from 'react-infinite-scroll-component';
import { partialList, get } from "../../redux-toolkit";
import CircularProgress from '@material-ui/core/CircularProgress';

const TodoPageComponent = (props: any) => {


  let todos: Todo[] = [];
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [searchTodo, setSearchTodo] = React.useState<string>("");
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const [localTodo, setLocalTodo] = React.useState([] as Todo[]);

  useEffect(() => {
    const load = () => {
      todos = props.partialList(page);
      console.log("Page no: ", page);
      console.log("New items loaded: ", todos)
      setLocalTodo(localTodo.concat(todos));
    }
    load();
  }, [page])

  const handleMore = () => {
    if (page === 2) {
      setHasMore(false)
    }
  };

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
        <Grid container className={classes.rootDragNDrop} spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={spacing}>
              <Grid  item xl={4}>
                <div className={classes.cardList}>
                  <Paper className={classes.paper}>ToDo</Paper>
                  <InfiniteScroll
                    dataLength={localTodo.length}
                    hasMore={hasMore}
                    next={() => {
                      setPage(page + 1);
                      handleMore();
                    }}
                    loader={<CircularProgress color="secondary" size="60" />}
                  >
                    {searchTodo ? (localTodo.filter(
                      (item: Todo) => !item.title.toLowerCase().indexOf(searchTodo.toLowerCase())
                    ).map((filteredItem: Todo) => (
                      <CardComponent key={filteredItem.id} todo={filteredItem} />
                    ))) : localTodo.length > 0 ?
                      (localTodo.map((todo, i) => (
                        <CardComponent key={todo.id} todo={todo} />
                      ))) : <p>No Todos to Show!</p>}
                  </InfiniteScroll>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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

export const TodoPage = connect(null, {
  partialList, get
})(TodoPageComponent);
