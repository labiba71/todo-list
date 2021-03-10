import React from 'react'
import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import { useStyles } from './Style';

interface RadioButtonProps {
  colorback: string;
}

export const RadioButton = (props: RadioButtonProps) => {
  const classes = useStyles(props);
  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  )
}
