const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("This is an auth endpoint")
})

module.exports = router;