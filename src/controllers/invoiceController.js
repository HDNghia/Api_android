const { Invoices } = require("../models/invoices/invoices.js")
const { Users } = require("../models/users/users.js");
const { Courses } = require("../models/courses/courses.js");
const invoiceController = {
    //ADD A USER
    addInvoice: (req, res) => {
        try {
            Invoices.findOne({})
                .sort({ _id: 'desc' })
                .then(lastInvoice => {
                    if (lastInvoice) {
                        req.body._id = lastInvoice._id + 1;
                        const newInvoice = new Invoices(req.body);
                        newInvoice
                            .save()
                            .then(() => {
                                res.status(200).json(newInvoice);
                            })
                    }
                    else {
                        req.body._id = 1
                        const newInvoice = new Invoices(req.body);
                        newInvoice
                            .save()
                            .then(() => res.status(200).json(newInvoice))
                    }
                })
        } catch (err) {
            res.status(500).json(err);
        }
    },
   //GET ALL USERS
    getAllInvoice: async (req, res) => {
        try {
            const allInvoice = await Invoices.find({}).sort({ _id: -1 });
            let responList = [];

            if (allInvoice) {
                await Promise.all(allInvoice.map(async (el) => {
                    let userInfo = await Users.findById(el.userId);
                    let item = {};
                    if (el.courseId != 0) {
                        let courseInfo = await Courses.findById(el.courseId);
                        item = {
                            ...el._doc,
                            courseInfo,
                            userInfo
                        }
                    }
                    else {
                        item = {
                            ...el._doc,
                            userInfo
                        }
                    }
                    responList.push(item);
                }))
            }
            responList.sort((a, b) => { if (a._id > b._id) return -1; return 1 });
            res.status(200).json(responList);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getInvoiceByUserid: async (req, res) => {
        try {
            const allInvoice = await Invoices.find({ userId: req.params.id }).sort({ _id: -1 });
            let responList = [];

            if (allInvoice) {
                await Promise.all(allInvoice.map(async (el) => {
                    let userInfo = await Users.findById(el.userId);
                    let item = {};
                    if (el.courseId != 0) {
                        let courseInfo = await Courses.findById(el.courseId);
                        item = {
                            ...el._doc,
                            courseInfo,
                            userInfo
                        }
                    }
                    else {
                        item = {
                            ...el._doc,
                            userInfo
                        }
                    }
                    responList.push(item);
                }))
            }
            responList.sort((a, b) => { if (a._id > b._id) return -1; return 1 });
            res.status(200).json(responList);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateInvoice: async (req, res) => {
        try {
            const invoice = await Invoices.findById(req.params.id);
            await invoice.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = invoiceController;