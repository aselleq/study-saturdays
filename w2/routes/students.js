const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
 try {
     const all = await Student.findAll()
     res.json(all)//or .send === but it returs not an object
     // res.status(200).json(all)
 } catch (error) {
     next(error)
 }
})

router.get('/:id', async (req, res, next) => {
    try {
        const one = req.params.id;
        const result =  await Student.findById(one)
        if (!result) return res.sendStatus(404)
        // {
        //     res.json(result)}
        // else {
        //     return res.status(404).json({ message: 'Not Found'})
            res.json(result)
        
    } catch (error){
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        //longer way:
    //     const newLastName = req.body.lastName
    //     const newFirstName = req.body.firstName
    //     const newEmail = req.body.email
    //    const newStudent = await Student.create({
    //         lastName: newLastName,
    //         firstName: newFirstName,
    //         email: newEmail
    //     })
    //     .then((student)=>{
    //         res.status(201).json(student)
    //     })
//shorter way:

    const newStudent  = await Student.create(req.body)
    res.status(201).json(newStudent)

    } catch (error){
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id 
        const reqStudent = await Student.findById(id)
        
        const updatedStudent = await reqStudent.update(req.body)
        res.json(updatedStudent)

    } catch (error){
        next(error)
    }
})
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id 
        const reqStudent = await Student.findById(id)
        //abother way:
        //const studentToKill = await Student.destroy({
        //     where: {id: req.params.id}
        // })
        const deleted = reqStudent.destroy(id)
        res.status(204).json(deleted)

    } catch (error){
        next(error)
    }
})



module.exports = router;