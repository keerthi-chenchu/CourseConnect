const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const {
    getCourses,
    getCoursesById,
    createCourses,
    deleteCourses,
    updateCourses
} = require("../controllers/courseControllers")
const courseRoute = express.Router()
courseRoute.get("/", getCourses)
courseRoute.post("/", createCourses)
courseRoute.get("/:id", getCoursesById)
courseRoute.put("/:id", updateCourses)
courseRoute.delete("/:id", deleteCourses)
module.exports = courseRoute