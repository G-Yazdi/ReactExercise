import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { getPosts } from "../services/fakePostService";
import PostInSingleMode from "./postInSingleMode";
import PostInMultipleMode from "./postInMultipleMode";

const useStyles = (theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

class Posts extends Component {
  state = {
    posts: [],
    singleBlogMode: false,
    post: null,
  };
  componentDidMount() {
    this.setState({ posts: getPosts() });
  }

  handleReadMore = (post) => {
    this.setState({ post, singleBlogMode: true });
  };
  handleBackToList = () => {
    this.setState({ post: null, singleBlogMode: false });
  };
  render() {
    const { classes } = this.props;
    if (this.state.singleBlogMode === false) {
      return (
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {this.state.posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <PostInMultipleMode
                  key={post.id}
                  post={post}
                  onClickReadMore={this.handleReadMore}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    } else {
      return (
        <Container className={classes.cardGrid} maxWidth="md">
          <PostInSingleMode
            post={this.state.post}
            onClickBackToList={this.handleBackToList}
          />
        </Container>
      );
    }
  }
}

export default withStyles(useStyles)(Posts);
