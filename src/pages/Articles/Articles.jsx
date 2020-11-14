import React, { useState, useEffect } from "react";
import { ArticleService } from "components/Article";
import { ArticleTemplate } from "components/Article";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Articles(props) {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (article) => {
    props.history.push({
      pathname: `/edit/${article.id}`,
      state: { id: article.id },
    });
  };

  const handleReadMore = (article) => {
    props.history.push({
      pathname: `/${article.id}`,
      state: { id: article.id },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    function fetchData() {
      const articlesRef = ArticleService.getAll();
      if (articlesRef) {
        articlesRef.once("value").then((snapshot) => {
          if (snapshot.val()) {
            const articlesArray = Object.values(snapshot.val());
            setArticles(articlesArray);
            setIsLoading(false);
          }
        });
      }
    }
    fetchData();
  }, []);

  if (!isLoading) {
    console.log("articles", articles);
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <ArticleTemplate
                article={article}
                onClickEdit={handleEdit}
                onClickReadMore={handleReadMore}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else return null;
}
