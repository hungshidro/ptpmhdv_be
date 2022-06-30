const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const runService = require('../util/run_service')

module.exports = async () => {
    const service = await prisma.service.findMany();
    if (service.length > 0) {
        service.map((item) => {
            runService(item.id);
        })
    }
}