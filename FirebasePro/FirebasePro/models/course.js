const { db } = require('../admin/admin');

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const snapshot = await db.collection('courses').get();
    const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// Get a specific course by ID
exports.getCourseById = async (req, res) => {
  try {
    const doc = await db.collection('courses').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const newCourse = req.body;
    const docRef = await db.collection('courses').add(newCourse);
    res.status(201).json({ id: docRef.id, ...newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add course" });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    await db.collection('courses').doc(req.params.id).update(req.body);
    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update course" });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    await db.collection('courses').doc(req.params.id).delete();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete course" });
  }
};
