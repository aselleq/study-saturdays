const router = require('express').Router();
const Test = require('../db/models/test');
//const Student = require('.student')

router.get('/', async (req, res, next) => {
    try {
        const allTests = await Test.findAll()
        res.status(200).json(allTests)
    } catch (error) {
        next(error)
    }
   })

router.get('/:id', async (req, res, next) => {
    try {
        const one = req.params.id;
        const result =  await Test.findById(one)
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
//      - POST and new student
router.post('/:studentId', async (req, res, next) => {
    try {
        const id = await Test.findById(req.params.studentId)
        const newTest = await Test.create(req.body)
        await newTest.setStudent(id)
        res.status(201).json(newTest)
    } catch (error){
        next(error)
    }
})

// 		- Delete a test
router.delete('/:id', async (req, res, next) => {
    try {
        res.status(204).json(await Test.destroy({where: {id: req.params.id}}))
    } catch (error){
        next(error)
    }
})

module.exports = router;
