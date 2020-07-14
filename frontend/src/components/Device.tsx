import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import { Formik, Field, FormikValues, FormikProps } from 'formik';

import { AppState } from '../reducers';
import { devicesGetByIdAction } from '../actions/devices';
import { InputTextComponent } from './formik/InputText';
import { Theme } from '@material-ui/core';
import { Device } from '../../../common/model/device';

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

interface DeviceComponentProps extends RouteComponentProps<any> {
  devicesGetByIdAction: typeof devicesGetByIdAction;
  classes: any;
  fetching: boolean;
  device: Device;
}

class DeviceComponent extends React.Component<DeviceComponentProps> {
  public renderForm = (props: FormikProps<any>) => {
    const { fetching, classes } = this.props;
    return (
      <form className={classes.form} onSubmit={props.handleSubmit}>
        <Field name="deviceId" label="Device Id" component={InputTextComponent} />
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
    const { devicesGetByIdAction, match } = this.props;
    devicesGetByIdAction(match.params.id)
  }

  public handleSubmit = (values: FormikValues) => {
    //const { usersGetByIdAction } = this.props;
    //usersGetByIdAction(values.userName, values.password);
  }

  public render = () => {
    const  { classes, device } = this.props;
    if (!device) {
      return null;
    }
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Device detail
          </Typography>
          <Formik
            initialValues={{ ...device }}
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
  device: state.devices.items[ownProps.match.params.id],
});

const mapDispatchToProps = {
  devicesGetByIdAction,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceComponent)));
