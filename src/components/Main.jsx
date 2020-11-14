import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TopBar from "components/TopBar";
import Articles from "pages/Articles";
import AddArticle from "pages/AddArticle";
import EditArticle from "pages/EditArticle";
import Article from "pages/Article";
import { PrivateRoute } from "helpers";

export default function Main() {
  return (
    <>
      <TopBar />
      <Container maxWidth="md">
        <Switch>
          <Route exact path={["/", "/articles"]} component={Articles} />
          <PrivateRoute exact path="/add" component={AddArticle} />
          <PrivateRoute exact path="/edit/:id" component={EditArticle} />
          <PrivateRoute exact path="/:id" component={Article} />
          <Route component={() => <h1>Not Found</h1>} />
        </Switch>
      </Container>
    </>
  );
}
