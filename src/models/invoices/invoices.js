const mongoose = require("mongoose");

const invoicesSchema = new mongoose.Schema({
    _id: { type: Number, require: true },
    userId: { type: Number, require: true },
    tranQty: { type: Number, require: true },
    courseId: {type: Number, default: 0},
    tranDate: { type: Number, require: true },
    status: { type: Number, require: true }, // 2: deny 1: approve 0: pending
    tranContent: { type: String, default: '' },
    note: { type: String, default: '' },
    tranType: { type: Number, require: true }, // 0: Nap 1: Rut
}, {
    _id: false,
    timestamp: true
});

let Invoices = mongoose.model("Invoices", invoicesSchema);

module.exports = { Invoices };