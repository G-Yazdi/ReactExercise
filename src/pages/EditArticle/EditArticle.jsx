import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "components/Button";
import { ArticleService } from "components/Article";
import { useForm } from "react-hook-form";

export default function EditArticle(props) {
  const [image, setImage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const { register, errors, reset, handleSubmit } = useForm();

  useEffect(() => {
    const { id: articleId } = props.match.params;
    setIsLoading(true);

    async function fetchData() {
      const article = ArticleService.get(articleId);
      article.once("value").then((data) => {
        if (data.val() !== null) {
          console.log("kkkkkkkkkk", data.val());
          setImage(data.val().imageUrl);
          setTitle(data.val().title);
          setBody(data.val().body);
          setIsLoading(false);
        }
      });
    }
    fetchData();
  }, [props.match.params]);

  const onSubmit = (article) => {
    console.log("article:", article);
    ArticleService.update(article.id, article.val)
      .then((response) => {
        return alert("done");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  if (!isLoading) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          <Grid item xs={12}>
            {image && <img src={image} />}
            <Button variant="contained" component="label">
              Upload Image
              <input
                name="image"
                type="file"
                style={{ display: "none" }}
                ref={register({
                  required: "Image is required",
                })}
                onChange={handleChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              defaultValue={title}
              variant="outlined"
              fullWidth
              inputRef={register({
                required: "Title is required",
                maxLength: {
                  value: 250,
                  message: "Title must be less than 250 characters",
                },
              })}
              error={!!errors.title}
              helperText={!!errors.title && errors.title.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="body"
              label="Body"
              defaultValue={body}
              variant="outlined"
              multiline
              fullWidth
              inputRef={register({ required: "Body is required" })}
              error={!!errors.body}
              helperText={!!errors.body && errors.body.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginRight: 8 }}
            >
              Submit
            </Button>
            <Button variant="contained" type="reset" onClick={() => reset()}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  } else return null;
}
