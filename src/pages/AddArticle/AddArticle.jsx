import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "components/Button";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { ArticleService } from "components/Article";
import { useForm, Controller } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function AddArticle() {
  const [image, setImage] = React.useState("");
  const { register, errors, reset, handleSubmit, control } = useForm();
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const onSubmit = (article) => {
    const enhancedArticle = {
      ...article,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      date: new Date(),
    };
    ArticleService.create(enhancedArticle)
      .then((response) => {
        return alert("done");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const onEditorStateChange = (eState) => {
    setEditorState(eState);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        <Grid item xs={12}>
          {image && <img src={image} style={{ display: "block" }} />}
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
            defaultValue=""
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
          {/* <Controller
            as={ */}
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
          {/* } */}
          {/* name="editor"
            control={control}
          /> */}
          {/* <Controller as={<textarea />} name="editor" control={control} /> */}
          {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          /> */}
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
}
