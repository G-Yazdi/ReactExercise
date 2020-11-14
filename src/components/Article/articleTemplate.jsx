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
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
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

const ArticleTemplate = (props) => {
  const classes = useStyles();
  const { article, onClickEdit, onClickReadMore } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={article.title}
      />
      <CardMedia className={classes.media} image={article.imageUrl}></CardMedia>
      <CardContent>
        <Typography
          dangerouslySetInnerHTML={{
            __html: stateToHTML(convertFromRaw(JSON.parse(article.body))),
          }}
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onClickEdit(article)}
          size="small"
          color="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => onClickReadMore(article)}
          size="small"
          color="primary"
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleTemplate;
