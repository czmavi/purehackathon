import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import { Formik, Field, FormikValues, FormikProps } from 'formik';

import { AppState } from '../reducers';
import { groupsGetByIdAction, groupsUpdateAction } from '../actions/groups';
import { InputTextComponent } from './formik/InputText';
import { InputCheckboxComponent } from './formik/InputCheckbox';
import { Theme, FormControlLabel } from '@material-ui/core';
import { Group } from '../../../common/model/group';

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

interface GroupComponentProps extends RouteComponentProps<any> {
  groupsGetByIdAction: typeof groupsGetByIdAction;
  groupsUpdateAction: typeof groupsUpdateAction;
  classes: any;
  fetching: boolean;
  group: Group;
}

class GroupComponent extends React.Component<GroupComponentProps> {
  public renderForm = (props: FormikProps<any>) => {
    const { fetching, classes, group } = this.props;
    return (
      <form className={classes.form} onSubmit={props.handleSubmit}>
        <Field name="name" label="Name" component={InputTextComponent} />
        {group.tasks.map((_, i) => (
          <div key={i}>
            <h3>{`Task ${i + 1}`}</h3>
            <Field name={`tasks[${i}].name`} label="Task Name" component={InputTextComponent} />
            <Field name={`tasks[${i}].fileId`} label="File Id" component={InputTextComponent} />
            <FormControlLabel control={
            <Field
              name={`tasks[${i}].isActive`}
              component={InputCheckboxComponent}
              color="primary"
            />}
            label="is active" />
          </div>
        ))}
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
    const { groupsGetByIdAction, match } = this.props;
    groupsGetByIdAction(match.params.id)
  }

  public handleSubmit = (values: FormikValues) => {
    const { groupsUpdateAction } = this.props;
    groupsUpdateAction(values as Group);
  }

  public render = () => {
    const  { classes, group } = this.props;
    if (!group) {
      return null;
    }
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Group detail
          </Typography>
          <Formik
            initialValues={{ ...group }}
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
  group: state.groups.items[ownProps.match.params.id],
});

const mapDispatchToProps = {
  groupsGetByIdAction,
  groupsUpdateAction,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupComponent)));
