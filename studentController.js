const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// Create
router.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
});

// Read
router.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Update
router.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
});

// Delete
router.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
});

module.exports = router;
