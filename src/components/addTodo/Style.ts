import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      padding: "0 0 20px 0"
    },
    date: {
      color: "grey",
    },
    title: {
      marginTop: "15px",
      fontWeight: 600,
    },
    details: {
      marginTop: "15px",
      fontWeight: 600,
    },
    textArea: {
      width: "100%",
    },
    button: {
      backgroundColor: "black",
      color: "white",
      marginRight: "10px",
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    error: {
      color: "red",
    },
    radioGroup: {
      display: "flex",
    },
  })
);
