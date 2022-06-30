const {PrismaClient} = require('@prisma/client');
const classController = require('./ClassController');
const prisma = new PrismaClient()
const convertToHour = require('../util/period_to_hour')
const convertWeekDay = require('../util/day_of_week');
const convertToClass = require('../util/code_to_class')
const send_mess = require('../util/send_message');
const day_of_week = require('../util/day_of_week');
const runService = require('../util/run_service')
const axios = require('axios').default;
const { Worker, workerData } = require("worker_threads");

class ServiceController{

    async startService(req, res){

        try {

            const startService = await prisma.registeredService.create({
                data: {
                    student_id: Number(req.body.stu_id),
                    service_id: Number(req.body.service_id),
                    day_of_week: Number(req.body.day),
                    from: Number(req.body.from),
                    to: Number(req.body.to),
                }
            })

            if(Object.keys(startService).length === 0) return res.json({ok:false, messaage: 'Fail'});
            else {
                res.json({ok:true, messaage: startService});
            }
            
        } catch (error) {
            res.status(500).json({
                ok: false,
                error: error
              });
        }
        finally{
            async () => await prisma.$disconnect()
        }

    }

    async stopService(req, res){

        try {
            
            const stop = await prisma.registeredService.update({
                where :{id: Number(req.body.id)},
                data:{is_running: Number(0)}
            })

            if(Object.keys(stop).length === 0) return res.json({ok:false, messaage: 'Fail'});
            else return res.json({ok:true, messaage: stop});

        } catch (error) {
            res.status(500).json({
                ok: false,
                error: error
              });
        }

        finally{
            async () => await prisma.$disconnect()
        }

    }

    async restartService(req, res){

        try {
            
            const stop = await prisma.registeredService.update({
                where :{id: Number(req.body.id)},
                data:{is_running: Number(1)}
            })

            if(Object.keys(stop).length === 0) return res.json({ok:false, messaage: 'Fail'});
            else {
                res.json({ok:true, messaage: stop});
            }

        } catch (error) {
            res.status(500).json({
                ok: false,
                error: error
              });
        }

        finally{
            async () => await prisma.$disconnect()
        }

    }

    async getService(req,res){

        try {

            const arrayservice = await prisma.registeredService.findMany({
                where: {
                    student_id: Number(req.params.id),
                    // is_running: Number(1)
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

            if (arrayservice.length === 0){
                return res.json({ok: true, messaage:"Fail"});
            }
            else return res.json({ok:true, messaage: arrayservice});
            
            // const getService = await prisma.service.findMany({
            //     where: {
            //         id: Number(req.params.id),
            //     },
            //     include: {
            //         class: true
            //     }
            // })
            
            // if(getService.length === 0) {

            //     return res.json({ok:true, messaage: "Fail"});
                
            // }
            // else return res.json({ok:true, message: getService});

        } catch (error) {

            res.status(500).json({
                ok: false,
                error: error
              });

        }

        finally{
            async () => await prisma.$disconnect()
        }

    }

}

module.exports = new ServiceController;