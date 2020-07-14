import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { bindApiToServer } from './api';
import { bindWsToServer } from './ws';

const app = express();
app.use(express.static('public'))
app.use(bodyParser.json());

//initialize a simple http server
const server = http.createServer(app);

bindWsToServer(server);
bindApiToServer(app);

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on ${JSON.stringify(server.address())} :)`);
});
