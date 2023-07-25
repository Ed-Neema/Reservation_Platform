const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel")
router.get("/", (req, res) => {
  res.send("This is an auth endpoint");
});

// CREATE
router.post("/", async (req,res)=>{
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);        
    } catch (error) {
        res.status(500).json(err)
    }
})
// UPDATE
// DELETE
// GET
// GETA ALL

module.exports = router;
