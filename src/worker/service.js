const { parentPort, workerData } = require('worker_threads');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios').default;
const prisma = new PrismaClient();
const convertToHour = require('../util/period_to_hour')
const convertWeekDay = require('../util/day_of_week')
const convertToClass = require('../util/code_to_class')
const day_of_week = require('../util/day_of_week');
const send_mess = require('../util/send_message')

parentPort.on('message', async (id) => {
})

const runService = async (id) => {
    try {

        parentPort.postMessage('service running, id: ' + id)
        let stt = false;

        while (true) {

            const arrayservice = await prisma.registeredService.findMany({
                where: {
                    service_id: Number(id),
                    is_running: Number(1)
                },
                include: {
                    student: {
                        select: {
                            id: true,
                            student_code: true,
                            telegram: true
                        }
                    },
                    service: true
                }
            })

            if (arrayservice.length > 0) {
                const class_code = arrayservice[0].service.class_code;

                const response = await axios.get('http://duc29.pythonanywhere.com/api/listclass/' + class_code)
                const data = await response.data
                const result = data.result

                arrayservice.map((service) => {

                    const from = service.from;
                    const to = service.to;
                    const day = service.day_of_week;

                    let list = [];
                    result.map((item) => {
                        const hour = convertToHour(item.period)
                        if (item.day_of_week === day && hour.start >= from && hour.end <= to && item.total_slot > 0) {
                            list = [...list, item]
                        }
                    })

                    if (list.length > 0) {
                            //stt = true;
                            const text = 'Môn học ' + convertToClass(class_code) + ' ngày ' + convertWeekDay(day) + ' Từ ' + String(from)
                                + 'h đến ' + String(to) + 'h có thể đăng kí\n';
                            send_mess(service.student.telegram, text)

                    }

                })
            }

            //do every 60s
            await new Promise(r => setTimeout(r, 60000));
        }

    } catch (error) {
        console.log(error)
    }

    finally {
        async () => await prisma.$disconnect()
    }
}

runService(workerData)