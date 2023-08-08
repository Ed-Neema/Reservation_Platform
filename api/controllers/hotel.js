const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

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
  const {min, max, featured, ...others} = req.query
  const limit = Number(req.query.limit);//convert it from string to number
  
   try {  
     const hotels = await Hotel.find({
       ...others,
      //  featured: { $eq: featured },
       cheapestPrice: { $gt: min || 1, $lt: max || 10000 },
     });
     res.status(200).json(hotels);
   } catch (err) {
     res.status(500).json(err);
   }
 };
 const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",")//get the cities query params, return array
   try {
    const list = await Promise.all(cities.map(city=>{
      // return Hotel.find({city:city}).length //this can work but it is expensive since it fetches all the documents then counts
      return Hotel.countDocuments({ city: city });//not fetching, just shows it's count
    }))
     res.status(200).json(list);
   } catch (err) {
     res.status(500).json(err);
   }
 };
 const countByType = async (req, res) => {
   try {
     const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
     const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
     const resortCount = await Hotel.countDocuments({ type: "Resort" });
     const villaCount = await Hotel.countDocuments({ type: "Villa" });
     const cabinCount = await Hotel.countDocuments({ type: "Cabin" });

     res.status(200).json([
       { type: "Hotels", count: hotelCount },
       { type: "Apartments", count: apartmentCount },
       { type: "Resorts", count: resortCount },
       { type: "Villas", count: villaCount },
       { type: "Cabins", count: cabinCount },
     ]);
   } catch (err) {
     next(err);
   }
 };

 const getHotelRooms = async (req, res, next) => {
  //  each hotel has a list of rooms. 
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      // map through the rooms array in the hotel
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    // in the end, we have a list of room type, the room numbers available in each of the room types
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};


 module.exports = {
   createHotel,
   updateHotel,
   deleteHotel,
   getHotel,
   getHotels,
   countByCity,
   countByType,
   getHotelRooms,
 };