const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

// CREATE
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(err);
  }
});
// UPDATE

router.patch("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, //update the fields based on the data in req.body
      { new: true } //method will return the updated document after the update is applied. if false, old doc
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/:id", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
   res.status(500).json(err);
  }
});

// GET ALL
router.get("/", async (req, res) => {

  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
