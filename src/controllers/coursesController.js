const { Courses } = require("../models/courses/courses.js");
const { Users } = require("../models/users/users.js")
const { ServiceType } = require("../models/courses/serviceType.js");
const { CourseSchedule } = require("../models/courses/coursesShedule.js");

const CoursesController = {
    //ADD A Courses
    addACourses: async (req, res) => {
        try {
            const course = await Courses.findOne({}).sort({ _id: -1 });
            if (course) {
                req.body._id = course._id + 1;
            } else {
                req.body._id = 1;
            }
            const newCourses = new Courses(req.body);
            newCourses
                .save()
                .then(() => {
                    var courseScheduleID = 0;
                    CourseSchedule.findOne({})
                        .sort({ _id: 'desc' })
                        .then(async lastCourseSchedule => {
                            if (lastCourseSchedule) {
                                courseScheduleID = lastCourseSchedule._id + 1;
                            }
                            else {
                                courseScheduleID = 1;
                            }
                            let courseScheduleList = await genCourseSchedule(req.body.stringSchedule, req.body._id);
                            courseScheduleList.forEach((el, index) => {
                                const newCourseSchedule = new CourseSchedule({
                                    ...el,
                                    _id: courseScheduleID + index
                                });
                                newCourseSchedule
                                    .save()
                                    .then(() => { })
                            })
                        })
                    res.status(200).json(newCourses);
                })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET ALL Courses
    getAllCourses: async (req, res) => {
        try {
            // const allCourses = await Courses.find();
            const allCourses = await Courses.find({ isDeleted: false }).sort({ startDate: -1 });
            res.status(200).json(allCourses);
        } catch (err) {
            res.status(500).json(err);

        }
    },

    //GET A Courses
    getACourses: async (req, res) => {
        try {
            const courses = await Courses.findById(req.params.id);
            let trainerinfo = await findTrainer(courses.trainerId);
            let serviceinfo = await findService(courses.serviceTypeId);
            res.status(200).json({ courses, trainerinfo, serviceinfo });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get by trainer id
    getCoursesbyTranerID: async (req, res) => {
        try {
            const allCourses = await Courses.find({ $and: [{ isDeleted: false }, { trainerId: req.params.id }] }).sort({ startDate: -1 })
            res.status(200).json(allCourses);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE Courses
    UpdateACourses: async (req, res) => {
        try {
            const courses = await Courses.findById(req.params.id);
            await courses.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete A Courses
    DeleteACourses: async (req, res) => {
        try {
            const courses = await Courses.findById(req.params.id);
            await courses.updateOne({ isDeleted: true });
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).error(err);

        }
    }
};
async function findTrainer(userId) {
    const userinfo = await Users.findById(userId);
    return userinfo;
}

async function findService(serviceId) {
    const serviceinfo = await ServiceType.findById(serviceId);
    return serviceinfo;
}
function timeToSeconds(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 3600) + (minutes * 60);
}
function timestampToDate(timestamp) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
function createCalendar(date1, date2) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const calendar = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        // const weekIndex = Math.floor((currentDate.getDate() - startDate.getDate()) / 7);
        // const dayIndex = currentDate.getDay();
        // if (!calendar[weekIndex]) {
        //     calendar[weekIndex] = new Array(7).fill(null);
        // }
        // calendar[weekIndex][dayIndex] = new Date(currentDate);
        calendar.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendar;
}
function getDayOfWeek(dateString) {
    const dateObj = new Date(dateString);
    const dayIndex = dateObj.getDay();
    const daysOfWeek = ['t8', 't2', 't3', 't4', 't5', 't6', 't7'];
    const dayOfWeek = daysOfWeek[dayIndex];
    return dayOfWeek;
}
function genCourseSchedule(scheduledString, courseId) {
    //   const scheduledString = "1685577600000-1688083200000-1-0-1-0-1-0-0-19:00-21:00";
    //   const courseId = "2";

    const fromdate = scheduledString.split("-")[0];
    const todate = scheduledString.split("-")[1];

    var days = []
    parseInt(scheduledString.split("-")[2]) == 1 ? days.push("t2") : 1;
    parseInt(scheduledString.split("-")[3]) == 1 ? days.push("t3") : 1;
    parseInt(scheduledString.split("-")[4]) == 1 ? days.push("t4") : 1;
    parseInt(scheduledString.split("-")[5]) == 1 ? days.push("t5") : 1;
    parseInt(scheduledString.split("-")[6]) == 1 ? days.push("t6") : 1;
    parseInt(scheduledString.split("-")[7]) == 1 ? days.push("t7") : 1;
    parseInt(scheduledString.split("-")[8]) == 1 ? days.push("t8") : 1;

    let starttime = timeToSeconds(scheduledString.split("-")[9])*1000;
    let endtime = timeToSeconds(scheduledString.split("-")[10])*1000;

    const date1 = timestampToDate(parseInt(fromdate));
    const date2 = timestampToDate(parseInt(todate));
    
    const calendar = createCalendar(date1, date2);

    var courseScheduleList = [];

    calendar.forEach((el) => {
        // el.forEach((el1) => {
            if (el) {
                let dayOfWeek = getDayOfWeek(el);
                console.log(Date.parse(el))
                if (days.includes(dayOfWeek)) {
                    courseScheduleList.push({
                        note: "",
                        courseId: courseId,
                        fromDateTime: Date.parse(el) + starttime - 25200000,
                        toDateTime: Date.parse(el) + endtime - 25200000,
                    })
                }
            }
        // })
    });
    return courseScheduleList;
}
module.exports = CoursesController;