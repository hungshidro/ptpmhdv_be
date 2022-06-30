//import { PrismaClient } from '@prisma/client';
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

class ClassController{

    async addNewClass(req, res) {
        try {
            const newClass = await prisma.class.create({
                data:{
                    class_code: req.body.class_code,
                    name: req.body.name,
                    day_of_week: req.body.day_of_week,
                    from: req.body.from,
                    to: req.body.to
                },
            })
    
            if(newClass) return res.json({ok: true, message: "200"});   
            else return res.json({ok: false,message:"Fail"}) 
        }
        catch (error) {
            res.status(500).json({
                ok: false,
                error: "Something went wrong!"
              });
        }
        finally{
            async () => await prisma.$disconnect()
        }
    }

    async getClass(req, res) {
        try {
            const get_class = await prisma.class.findUnique({
                where: {id : Number(req.params.id)}
            })

            if(get_class.length === 0) return res.json({ok: false,message:"Fail"})
            else return res.json({ok: true, data: get_class});
        }
        catch (error) {
            res.status(500).json({
                ok: false,
                error: "Something went wrong!"
              });
        }
        finally{
            async () => await prisma.$disconnect()
        }
    }

}

module.exports = new ClassController;