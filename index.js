require('./private/config/config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const user = require('./private/routes/user');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// rutas
app.use(require('./private/routes/index'));
app.use('/', user);

app.listen(process.env.PORT, () => console.log('corriendo'));