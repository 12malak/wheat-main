const AboutUs = require("../models/aboutUs");

const aboutUs = (req, res) => {
  AboutUs.find()
      .then((data) => {
       
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };
  
  const updateAboutUs = async (req, res) => {
    const updatedAboutUsData = req.body;
    try {
      const aboutUs = await AboutUs.findByIdAndUpdate(
        "64e912bba398a252c045a336",
        updatedAboutUsData,
        { new: true }
      );
      if (!aboutUs) {
        return res.status(404).json({ error: "AboutUs not found" });
      }
      const updatedAboutUs = await aboutUs.save();
      res.json(updatedAboutUs);
    } catch (error) {
      // Handle the error appropriately
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  module.exports = {
    aboutUs,
    updateAboutUs, 
  }; 
  