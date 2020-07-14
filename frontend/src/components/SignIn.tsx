import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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

import { AppState } from '../reducers';
import { authLoginRequestAction } from '../actions/auth';
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

interface ISignInProps extends RouteComponentProps<any> {
  authLoginRequestAction: typeof authLoginRequestAction;
  classes: any;
  fetching: boolean;
  token: string;
}

class SignIn extends React.Component<ISignInProps> {
  public renderForm = (props: FormikProps<any>) => {
    const { fetching, classes } = this.props;
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
          disabled={fetching}
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

  public componentDidUpdate(prevProps: ISignInProps): void {
    if (!prevProps.token && this.props.token) {
      this.props.history.push('/');
    }
  }

  public handleSubmit = (values: FormikValues) => {
    const { authLoginRequestAction } = this.props;
    authLoginRequestAction(values.userName, values.password);
  }

  public render = () => {
    const  { classes } = this.props;
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
            onSubmit={this.handleSubmit}
            render={this.renderForm}
          />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState): any => ({
  fetching: state.auth.fetching,
  token: state.auth.token,
});

const mapDispatchToProps = {
  authLoginRequestAction,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn)));
