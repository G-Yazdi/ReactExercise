import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { ArticleService } from "components/Article";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cover: {
    height: 400,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginBottom: 16,
  },
}));

export default function Article(props) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  const handleBackToList = () => {
    props.history.push("/");
  };

  useEffect(() => {
    const { id: articleId } = props.match.params;
    setIsLoading(true);
    const article = ArticleService.get(articleId);
    article.once("value").then((data) => {
      if (data.val) {
        setImage(data.val().imageUrl);
        setTitle(data.val().title);
        setBody(convertFromRaw(JSON.parse(data.val().body)));
        setDate(data.val().date);
        setIsLoading(false);
      }
    });
  }, [props.match.params]);

  if (!isLoading) {
    console.log("date:", date);
    return (
      <div className={classes.root}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color="textSecondary"
        >
          date: {moment(date).format("dddd, MMMM Do YYYY")}
        </Typography>
        <div
          className={classes.cover}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <Typography
          gutterBottom
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: stateToHTML(body),
          }}
        ></Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToList}
          >
            Back to list
          </Button>
        </div>
      </div>
    );
  } else return null;
}
