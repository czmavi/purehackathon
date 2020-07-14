import React, { useEffect, useRef, useState } from 'react';
import { AppState } from '../reducers';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Theme } from '@material-ui/core';
import { Device } from '../../../common/model/device';

interface DashboardProps {
  token: string
  classes: any;
}

interface DashboardState {
  devices: Device[]
}

const styles = (theme: Theme) => createStyles({
  button: {
    margin: theme.spacing(3, 2, 2),
  },
});

const Dashboard: React.FC<DashboardProps> = ({ classes, token }) => {
  const socketRef = useRef<WebSocket>();
  const intervalRef = useRef<any>(null);
  const [state, setState] = useState<DashboardState>({
    devices: [],
  });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (socketRef.current?.OPEN) {
        socketRef.current.send(JSON.stringify({
          command: 'GET_DEVICES',
        }))
      }
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://127.0.0.1:8999/');
    socketRef.current.onopen = () => {
      socketRef.current?.send(JSON.stringify({
        command: 'SET_TOKEN',
        payload: token,
      }));
    };

    socketRef.current.onmessage = (message: MessageEvent) => {
      const msg = JSON.parse(message.data);
      if (msg.devices) {
        setState({
          devices: msg.devices,
        });
      }
    };

    return () => {
      if (socketRef.current?.OPEN) {
        socketRef.current.close();
      }
    };
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <h2>Active devices</h2>
      <ul>
        {state.devices.map((device) => (
          <li key={device._id}>{device.deviceId}</li>
        ))}
        {state.devices.length === 0 ? <li>There are no active devices</li> : ''}
      </ul>
      <Button
          disabled={state.devices.length === 0}
          type="button"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            socketRef.current?.send(JSON.stringify({ command: "START_DEVICES" }));
          }}
        >
          Start
        </Button>
        <Button
          disabled={state.devices.length === 0}
          type="button"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            socketRef.current?.send(JSON.stringify({ command: "STOP_DEVICES" }));
          }}
        >
          Stop
        </Button>
    </>
  );
};

const mapStateToProps = (state: AppState, ownProps: any): any => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
