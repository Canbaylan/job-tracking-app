/*import cors from 'cors';
import express from 'express';

const app = express();
const allowedOrigins=['http://localhost:4200'];
options: cors.CorsOptions ={
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Access-Control-Allow-Origin'
      ],
      credentials:true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: allowedOrigins,
};
app.use(cors(options));*/
import express from 'express';
const app = express();
let cors = require('cors');
app.use(cors())
