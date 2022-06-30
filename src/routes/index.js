const classRouter = require('./classes');
const studentRouter = require('./student');
const serviceRouter = require('./service');

function route(app){
    app.use('/class', classRouter);
    app.use('/student', studentRouter);
    app.use('/service', serviceRouter);
}

module.exports = route;