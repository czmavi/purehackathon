const logs = [];

var log = (value) => {
  var output = document.getElementById('output');
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
  logs.push(stringValue);
  if (logs.length > 15) {
    logs.splice(0, 1);
  }
  output.innerHTML = logs.join('<br>');
  console.log(value);
}

var connection;

  (function() {
    var txtCommand = document.getElementById('txtCommand');
    var btnSubmit = document.getElementById('btnSubmit');
    var btnClear = document.getElementById('btnClear');
    var btnConnect = document.getElementById('btnConnect');
    var output = document.getElementById('output');
  
    btnSubmit.onclick = (e) => {
      e.preventDefault();

      log('SENDING:');
      log(txtCommand.value);
      connection.send(txtCommand.value);
      txtCommand.value = '';
    }

    btnClear.onclick = (e) => {
      e.preventDefault();

      output.innerHTML = '';
    }

    btnConnect.onclick = (e) => {
      e.preventDefault();

      fetch('/api/auth/user', { method: 'POST', body: JSON.stringify({ email: 'mail@martinvich.net' }), headers: { 'Content-Type': 'application/json' } })
        .then((response) => response.json())
        .then((value) => {
          log('Logged in with token: ' + value.token);

          connection = new WebSocket('ws://127.0.0.1:8999/');

  connection.onopen = function () {
    // connection is opened and ready to use
    log('Connection is open!');
    connection.send(JSON.stringify({
      command: 'SET_TOKEN',
      payload: value.token,
    }));
  };

  connection.onerror = function (error) {
    // an error occurred when sending/receiving data
  };

  connection.onclose = function () {
    log('Connection closed');
  }

  connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
    log('RECEIVED:');
    try {
      var json = JSON.parse(message.data);
      log(json);
    } catch (e) {
      log(message.data);
      return;
    }
    // handle incoming message
  };
        });
    }
  })();