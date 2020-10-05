import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Box from "@material-ui/core/Box";
import Moment from "moment";
import CardMedia from "@material-ui/core/CardMedia";
import { flexbox } from "@material-ui/system";

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #846bfe, #846bfe)",
    border: 0,
    color: "white",
    height: 30,
    size: "small",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 1000,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "40.25%", // 16:9
  },
}));

const PostInSingleMode = (props) => {
  const classes = useStyles();
  const { post, onClickBackToList } = props;
  let str = post.created;
  let formatedDate = Moment(str).format("ddd MMM DD HH:mm:ss zz YYYY");
  return (
    <flexbox className={classes.card}>
      <flexbox my={2}>
        <Typography variant="h5" component="h1" gutterBottom align="left">
          {post.title}
        </Typography>
        <Typography component="h1" gutterBottom align="left">
          by: {post.author}
        </Typography>
        <Typography component="h1" gutterBottom align="left">
          date: {formatedDate}
        </Typography>
      </flexbox>
      <CardMedia
        className={classes.media}
        image={require("../fakePostImages/" + post.cover).default}
      />
      <flexbox my={1}>
        <Typography variant="h6" component="h1" gutterBottom align="left">
          {post.description}
        </Typography>
        <Typography component="h1" gutterBottom align="left">
          {post.body}
        </Typography>
      </flexbox>
      <flexbox>
        <StyledButton onClick={() => onClickBackToList()}>
          Back To List
        </StyledButton>
      </flexbox>
    </flexbox>
  );
};

export default PostInSingleMode;
