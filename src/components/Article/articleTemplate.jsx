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
const ArticleTemplate = (props) => {
  const classes = useStyles();
  const { article, onClickEdit } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={formatText(article.title, 49)}
      />
      <CardMedia
        className={classes.media}
        // image={require(`${article.imageUrl}`).default}
      >
        <img src={article.imageUrl}></img>
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {formatText(article.body, 377)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onClickEdit(article)}
          size="small"
          color="primary"
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleTemplate;
