const Path = require('path')
const { Worker, workerData } = require("worker_threads");

const runService = (id) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(Path.join(__dirname, '../worker/service.js'),{workerData: id})
        worker.on('message', resolve);
        worker.on('error', reject);

        
    })
}

module.exports = async (id) => {
    const run = await runService(id)
    console.log(run)
}