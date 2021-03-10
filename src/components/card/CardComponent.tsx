import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStyles } from './Style';
import { Todo } from "../../type";
import { EditTodoForm } from '../editTodo/EditTodoForm';
import { remove } from "../../redux-toolkit";
import { useDispatch } from 'react-redux';

export const CardComponent = (props: { todo: Todo }) => {

  const classes = useStyles(props);
  const dispatch = useDispatch();
  const [edit, setEdit] = React.useState(false);

  const handleClickOpen = () => {
    setEdit(true);
  };

  const handleClose = () => {
    setEdit(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={<Typography className={classes.noteTitle} variant="h6">{props.todo.title}</Typography>}
        />
        <CardContent>
          <Typography className={classes.noteDetail} variant="body2" color="textPrimary" component="p">
            {props.todo.details}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardFooter}>
          <Typography variant="body2" color="textPrimary" component="p">
            {props.todo.date}
          </Typography>
          <div>
            <IconButton aria-label="delete" onClick={(e) => {
              e.preventDefault();
              dispatch(remove(props.todo))
            }}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
              <BorderColorRoundedIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
      <Dialog
        open={edit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"Edit Todo"}</DialogTitle>
        <DialogContent>
          <EditTodoForm todo={props.todo} closeDialog={setEdit} />
        </DialogContent>
      </Dialog>
    </>
  )
}
