const express = require("express");
const router = express.Router();
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels } = require("../controllers/hotel");

// CREATE
router.post("/", createHotel);
// UPDATE
router.patch("/:id", updateHotel);

// DELETE
router.delete("/:id", deleteHotel);
// GET
router.get("/:id", getHotel);
// GET ALL
router.get("/", getHotels);


module.exports = router;
