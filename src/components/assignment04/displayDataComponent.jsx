import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function DisplayDataComponent(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  console.log("jjjjjjj", props);
  const {
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    title,
    avatar,
    isEmailVisible,
  } = props.values;
  return (
    <Card className={classes.root} style={{ display: "inline-block" }}>
      <CardContent
        style={{
          alignItems: "center",
          padding: "60px &&!important",
        }}
      >
        <Avatar aria-label="recipe" style={{ width: "150px", height: "150px" }}>
          <img src={avatar} style={{ width: "250px" }} />
        </Avatar>
        <Typography variant="h4" component="h2">
          {firstName} {lastName}
        </Typography>
        <Typography variant="h5" component="h2">
          {isEmailVisible ? email : ""}
        </Typography>
        <Typography variant="h5" component="h2">
          {phone}
        </Typography>
        <Typography variant="h5" component="h2">
          {birthDate}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
