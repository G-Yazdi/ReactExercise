import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ArticleService } from "components/Article";
import { useForm } from "react-hook-form";

export default function AddArticle() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    ArticleService.create(data)
      .then(() => alert("done"))
      .catch((error) => console.log(error));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setArticle((state) => ({ ...state, [name]: value }));
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="title"
        ref={register({ required: true, maxLength: 20 })}
        style={{
          display: "block",
          width: "100%",
          fontSize: "15px",
          height: "42px",
          marginTop: "5px",
        }}
      />
      {errors.title && "Title is required"}
      <input
        name="body"
        ref={register({ required: true, maxLength: 20 })}
        style={{
          display: "block",
          width: "100%",
          fontSize: "15px",
          height: "42px",
          marginTop: "5px",
        }}
      />
      {errors.body && "Body name is required"}
      <input
        type="submit"
        style={{ marginTop: "10px", fontSize: "15px", display: "block" }}
      />
    </form>
  );
}
// const onSubmit = () => {
//   ArticleService.create(article)
//     .then(() => alert("done"))
//     .catch((error) => console.log(error));
// };

// return (
//   <Grid container spacing={2} style={{ marginTop: 16 }}>
//     <Grid item xs={12}>
//       <TextField
//         name="title"
//         fullWidth
//         variant="outlined"
//         label="Title"
//         value={article.title}
//         onChange={handleChange}
//         ref={register({ required: true, maxLength: 20 })}
//       />
//     </Grid>
//     <Grid item xs={12}>
//       <TextField
//         name="body"
//         fullWidth
//         variant="outlined"
//         label="Body"
//         multiline
//         value={article.body}
//         onChange={handleChange}
//         ref={register({ required: true, maxLength: 1000 })}
//       />
//     </Grid>
//     <Grid item xs={12}>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit(onSubmit)}
//       >
//         Submit
//       </Button>
//     </Grid>
//   </Grid>
// );
//}
