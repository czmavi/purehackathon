import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import { Formik, Field, FormikValues, FormikProps } from 'formik';

import { AppState } from '../reducers';
import { usersGetByIdAction } from '../actions/users';
import { InputTextComponent } from './formik/InputText';
import { Theme } from '@material-ui/core';
import { User } from '../../../common/model/user';

const styles = (theme: Theme) => createStyles({
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

interface UserComponentProps extends RouteComponentProps<any> {
  usersGetByIdAction: typeof usersGetByIdAction;
  classes: any;
  fetching: boolean;
  user: User;
}

class UserComponent extends React.Component<UserComponentProps> {
  public renderForm = (props: FormikProps<any>) => {
    const { fetching, classes } = this.props;
    return (
      <form className={classes.form} onSubmit={props.handleSubmit}>
        <Field name="firstName" label="First Name" component={InputTextComponent} />
        <Field name="lastName" label="Last Name" component={InputTextComponent} />
        <Field name="email" label="Email" component={InputTextComponent} />
        <Button
          disabled={fetching}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save
        </Button>
      </form>
    );
  }

  public componentDidMount() {
    const { usersGetByIdAction, match } = this.props;
    usersGetByIdAction(match.params.id)
  }

  public handleSubmit = (values: FormikValues) => {
    //const { usersGetByIdAction } = this.props;
    //usersGetByIdAction(values.userName, values.password);
  }

  public render = () => {
    const  { classes, user } = this.props;
    if (!user) {
      return null;
    }
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            User detail
          </Typography>
          <Formik
            initialValues={{ ...user }}
            onSubmit={this.handleSubmit}
            render={this.renderForm}
          />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: any): any => ({
  fetching: state.users.fetching,
  user: state.users.items[ownProps.match.params.id],
});

const mapDispatchToProps = {
  usersGetByIdAction,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(UserComponent)));
