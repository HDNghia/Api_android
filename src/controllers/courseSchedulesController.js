const { CourseSchedule } = require("../models/courses/coursesShedule.js");
const { Courses } = require("../models/courses/courses.js");
const { CourseUsers } = require("../models/courses/coursesUsers.js");

const CourseScheduleController = {
    //ADD A CourseSchedule
    addACourseSchedule: (req, res) => {
        try {
            CourseSchedule.findOne({})
                .sort({ _id: 'desc' })
                .then(lastCourseSchedule => {
                    if (lastCourseSchedule) {
                        req.body._id = lastCourseSchedule._id + 1;
                        // 
                        const newCourseSchedule = new CourseSchedule(req.body);
                        newCourseSchedule
                            .save()
                            .then(() => res.status(200).json(newCourseSchedule))
                    } else {
                        req.body._id = 1
                        const newCourseSchedule = new CourseSchedule(req.body);
                        newCourseSchedule
                            .save()
                            .then(() => res.status(200).json(newCourseSchedule))
                    }

                })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET ALL CourseSchedule
    GetACourseSchedule: async (req, res) => {
        try {
            let CourseID = req.query.courseId;
            if (CourseID != null) {
                const GetCourseSchedule = await CourseSchedule.find({ courseId: CourseID })
                let courseInfo = await Courses.findById(CourseID)
                res.status(200).json({ GetCourseSchedule, courseInfo });
            }
            else {
                const allCourseSchedule = await CourseSchedule.find()
                res.status(200).json(allCourseSchedule);
            }
        } catch (err) {
            res.status(200).json(err);

        }
    },

    GetACourseScheduleByTrainerID: async (req, res) => {
        try {
            const getCourses = await Courses.find({ trainerId: req.params.id });
            let responeList = [];
            if (getCourses) {
                await Promise.all(getCourses.map(async (el) => {
                    let courseSheduleinfo = await findCourseSchedule(el._id);
                    let item = {
                        ...el._doc,
                        courseSheduleinfo
                    }
                    responeList.push(item);
                }));
            }
            res.status(200).json(responeList);
        } catch (err) {
            res.status(200).json(err);

        }
    },

    GetACourseScheduleByUserID: async (req, res) => {
        try {
            const getCourseUsers = await CourseUsers.find({ userId: req.params.id });
            let responeList = [];
            if (getCourseUsers) {
                await Promise.all(getCourseUsers.map(async (el) => {
                    let courseSheduleinfo = await findCourseSchedule(el.courseId);
                    let courseinfo = await findCourse(el.courseId);
                    let item = {
                        courseSheduleinfo,
                        courseinfo
                    }
                    responeList.push(item);
                }));
            }
            res.status(200).json(responeList);
        } catch (err) {
            res.status(200).json(err);

        }
    },

    //UPDATE CourseSchedule
    UpdateACourseSchedule: async (req, res) => {
        try {
            const courseSchedule = await CourseSchedule.findById(req.params.id);
            await courseSchedule.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete CourseSchedule
    DeleteACourseSchedule: async (req, res) => {
        try {
            const courseSchedule = await CourseSchedule.findById(req.params.id);
            // await CourseSchedule.deleteOne();
            await courseSchedule.deleteOne();
            res.status(200).json("Deleted successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
async function findCourseSchedule(courseID) {
    const courseScheduleinfo = await CourseSchedule.find({ courseId: courseID });
    return courseScheduleinfo;
}
async function findCourse(courseID) {
    const courseinfo = await Courses.findById(courseID);
    return courseinfo;
}
async function findUser(userId) {
    const userinfo = await Users.findById(userId);
    return userinfo;
}
module.exports = CourseScheduleController;