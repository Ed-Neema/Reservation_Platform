const express = require("express");
const router = express.Router();
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
} = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/verifyToken");

// CREATE
router.post("/", verifyAdmin, createHotel);
// UPDATE
router.patch("/:id",verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
// GET
router.get("/find/:id", getHotel);
// GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

module.exports = router;
