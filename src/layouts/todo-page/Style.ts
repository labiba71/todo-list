import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    searchContainer: {
      width: "100%",
    },
    cardList: {
      margin: "40px 0",
      display: "flex",
      flexWrap: "wrap",
    },
  })
);
