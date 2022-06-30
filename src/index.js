const startServices = require('./util/start')
const express = require('express');
const cors = require('cors');
const route = require('./routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const port = 8000;

route(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

startServices();
