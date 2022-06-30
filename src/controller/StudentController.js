const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const axios = require('axios').default;
//import fetch from 'node-fetch';

class StudentController {

    async addNewStudent(req,res) {
        try {

            
            const stu = await prisma.student.findMany({
                where: {
                    student_code: String(req.body.code)
                }
            })

            if(stu.length > 0) return res.json({ok: false, message: "Student was exist"});

            else {
                console.log(req.body.code)
                const newStu = await prisma.student.create({
                    data: {
                        student_code: req.body.code,
                        telegram: req.body.telegram,
                        password: req.body.pass
                    }
                })

                if(Object.values(newStu).length > 0) return res.json({ok: true, message: newStu });
                else return res.json({ok: false,message:"Fail"})
               
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                error: "Something went wrong!"
              });
        }
        finally{
            async () => await prisma.$disconnect()
        }
    }

    async getStudent(req,res) {
        try {

            
            const getStudent = await prisma.student.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            })

            if(Object.values(getStudent).length > 0) return res.json({ok: true, data: getStudent});
            else 
            return res.json({ok: false,message:"Fail"})

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

    async validateStudent(req, res){
        try {
            
            const validateStudent = await prisma.student.findMany({
                where:{
                    student_code: req.body.code ,
                    password: req.body.pass
                }
            })

            if(validateStudent.length === 0) return res.json({ok:false, message: "Validate Fail"}) 
            else 
            return res.json({ok: true, message: validateStudent})

        } catch (error) {
            res.status(500).json({
                ok: false,
                error: "Something went wrong!"
              });
        }
        finally{
            async () => await prisma.$disconnect()
        }
    }

    async getAllServiceOfStudent(req, res){
        try {

            const arrayservice = await prisma.registeredService.findMany({
                where: {
                    student_id: Number(req.params.id),
                    // is_running: Number(1)
                },
                include: {
                    service: true
                }
            })

            if(arrayservice.length > 0) return res.json({ok: true, data: arrayservice})
            else return res.json({ok:false, message: "Fail"})
            
        } catch (error) {
            res.status(500).json({
                ok: false,
                error: "Something went wrong!"
              });
        }
        finally{
            async () => await prisma.$disconnect()
        }
    }
    async updateStudent(req, res){

        try {
            
            const update = await prisma.student.update({
                where :{id: Number(req.body.id)},
                data:{
                    telegram: req.body.telegram
                }
            })

            console.log(update)

            if(Object.keys(update).length === 0) return res.json({ok:false, messaage: 'Fail'});
            else return res.json({ok:true, messaage: update});

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

module.exports = new StudentController;