const express = require("express");
const router = express.Router();
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/verifyToken");

// CREATE
router.post("/", verifyAdmin, createHotel);
// UPDATE
router.patch("/:id",verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
// GET
router.get("/:id", getHotel);
// GET ALL
router.get("/", getHotels);

module.exports = router;
