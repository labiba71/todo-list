import { makeStyles } from '@material-ui/core/styles';

export const useStyles =
  makeStyles({
    root: {
      width: '20rem',
      height: '14rem',
      textAlign: "left",
      backgroundColor: (props: { todo: { color: string } }) => props.todo.color,
      margin: "10px"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    title: {
      fontSize: '12px'
    },
    starSelected: {
      backgroundColor: '#FECD03',
      borderRadius: '50%',
      color: 'black'
    },
    noteDetail: {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',

    },
    noteTitle: {
      width: '15rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  })