const express = require('express');
const { getCourses, getCourseById, addCourse, updateCourse, deleteCourse } = require('../models/course');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', addCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.get('/courses', verifyToken, getCourses); // Protected route

module.exports = router;
