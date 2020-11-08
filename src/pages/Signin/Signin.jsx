import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "components/Button";
import { signin } from "services";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    console.log("data", data);
    const { email, password } = data;
    signin(email, password)
      .catch((error) => toast.error(error.message))
      .then(props.history.replace("/"))
      .finally(() => setLoading(false));
  };
  // return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     <TextField
  //       name="email"
  //       error={!!errors.email}
  //       label="Username"
  //       helperText={errors.email ? errors.email.message : ""}
  //       type="email"
  //       inputRef={register}
  //       fullWidth
  //     />
  //     <TextField
  //       name="password"
  //       error={!!errors.password}
  //       label="Password"
  //       inputRef={register}
  //       helperText={errors.password ? errors.password.message : ""}
  //       type="password"
  //       fullWidth
  //     />

  //     <Button color="primary" type="submit" variant="contained" fullWidth>
  //       Submit
  //     </Button>
  //   </form>
  // );
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            error={!!errors.emeil}
            helperText={errors.email ? errors.email.message : ""}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({ required: true })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
          />
          <Button color="primary" type="submit" variant="contained" fullWidth>
            Submit
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
