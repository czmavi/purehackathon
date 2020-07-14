import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import { Formik, Field, FormikValues, FormikProps } from 'formik';

import { InputTextComponent } from './formik/InputText';
import { Theme } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%', // Fix IE 11 issue.
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

interface IFormProps {
  classes: any;
  fetching: boolean;
  handleSubmit(values: FormikValues): void;
  renderForm(props: FormikProps<any>): void;
}

class Form extends React.Component<IFormProps> {
  public renderForm = (props: FormikProps<any>) => {
    const { classes, handleSubmit } = this.props;
    return (
      <form className={classes.form} onSubmit={props.handleSubmit}>
        <Field name="userName" label="Username" component={InputTextComponent} />
        <Field
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          component={InputTextComponent}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          disabled={this.props.fetching}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
                </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  }

  public render = () => {
    const  { classes, handleSubmit } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ userName: '', password: '' }}
            onSubmit={handleSubmit}
            render={this.renderForm}
          />
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Form);
