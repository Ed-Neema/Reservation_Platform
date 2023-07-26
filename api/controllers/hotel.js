const Hotel = require("../models/Hotel");


//CREATE HOTEL
const createHotel = async(req,res,next)=>{
    const newHotel = new Hotel(req.body);
    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (error) {
      next(err);
    }
}

//UPDATE HOTEL
const updateHotel = async (req,res,next)=>{
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body }, //update the fields based on the data in req.body
        { new: true } //method will return the updated document after the update is applied. if false, old doc
      );
      res.status(200).json(updatedHotel);
    } catch (err) {
      next(err);
    }
 }

 //DELETE HOTEL
const deleteHotel = async(req,res,next)=>{
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("Hotel has been deleted.");
    } catch (err) {
      next(err);
    }
 }

 const getHotel = async (req,res,next)=>{
     const newHotel = new Hotel(req.body);
     try {
       const hotel = await Hotel.findById(req.params.id);
       res.status(200).json(hotel);
     } catch (err) {
       next(err);
     }
 }


 const getHotels = async (req, res) => {
   try {
     const hotels = await Hotel.find();
     res.status(200).json(hotels);
   } catch (err) {
     res.status(500).json(err);
   }
 };

 module.exports = {
   createHotel,
   updateHotel,
   deleteHotel,
   getHotel,
   getHotels,
 };