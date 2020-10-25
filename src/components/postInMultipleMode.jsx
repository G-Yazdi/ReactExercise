import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const formatText = (text, maxLength) => {
  const length = text.length;
  let prefix = text;
  if (length > maxLength) {
    prefix = text.substring(0, maxLength) + "...";
  }
  return prefix;
};
const PostInMultipleMode = (props) => {
  const classes = useStyles();
  const { post, onClickReadMore } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={formatText(post.title, 49)}
        subheader="September 14, 2016"
      />

      <CardMedia
        className={classes.media}
        image={require("../fakePostImages/" + post.cover).default}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {formatText(post.description, 377)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onClickReadMore(post)}
          size="small"
          color="primary"
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostInMultipleMode;
