import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "components/Button";
import { ArticleService } from "components/Article";
import { useForm } from "react-hook-form";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

export default function EditArticle(props) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { register, errors, reset, handleSubmit } = useForm();
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  useEffect(() => {
    const { id: articleId } = props.match.params;
    setIsLoading(true);
    const article = ArticleService.get(articleId);
    article.once("value").then((data) => {
      if (data.val) {
        setImage(data.val().imageUrl);
        setTitle(data.val().title);
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(data.val().body))
          )
        );
        setIsLoading(false);
      }
    });
  }, [props.match.params]);

  const onSubmit = (article) => {
    const { id: articleId } = props.match.params;
    const newArticle = {
      ...article,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      date: new Date(),
      id: articleId,
    };

    if (!article.imageUrl[0]) {
      //dont need to update image
      newArticle.imageUrl = image;
      ArticleService.update(articleId, newArticle)
        .then((response) => {
          return alert("done");
        })
        .catch((error) => console.log(error));
    } else {
      //need to update image
      ArticleService.updateImage(articleId, article.imageUrl[0])
        .then((snap) => {
          snap.ref.getDownloadURL().then((url) => {
            newArticle.imageUrl = url;
            ArticleService.update(articleId, newArticle)
              .then((response) => {
                return alert("done");
              })
              .catch((error) => console.log(error));
          });
        })
        .catch((error) => console.log(error));
    }
  };

  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const onEditorStateChange = (eState) => {
    setEditorState(eState);
  };

  if (!isLoading) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          <Grid item xs={12}>
            {image && <img src={image} style={{ display: "block" }} />}
            <Button variant="contained" component="label">
              Change Image
              <input
                name="imageUrl"
                type="file"
                style={{ display: "none" }}
                ref={register()}
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
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "inline",
                  "history",
                ],
              }}
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
