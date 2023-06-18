const invoiceController = require("../controllers/invoiceController");

const router = require("express").Router();

//ADD A Invoice
router.post("/", invoiceController.addInvoice);

//GET ALL invoice
router.get("/", invoiceController.getAllInvoice);

//GET ALL invoice
router.get("/:id", invoiceController.getInvoiceByUserid);

//Update a Invoice
router.put("/:id", invoiceController.updateInvoice);

module.exports = router; 