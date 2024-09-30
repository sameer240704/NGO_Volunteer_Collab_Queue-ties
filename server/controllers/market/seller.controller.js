import Seller from "../../models/market/seller.model.js";
import cloudinary from "cloudinary";

export const getSellerById = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.sellerId);
        res.json(seller);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSeller = async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.json(sellers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSellerByUserId = async (req, res) => {
    try {
        const seller = await Seller.findOne({ userId: req.params.userId });
        res.json(seller);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSeller = async (req, res) => {
    const {name, type, rating, donationType, donationAmount, contact, email, products, ngoList} = req.body;

    
    try {
        if (!name || !type || !rating || !donationType || !donationAmount || !contact || !email || !products || !ngoList) {
            return res.status(400).json({ message: "All fields are required" });
        }
    
        const existingSeller = await Seller.findOne({ email });
    
            if (existingSeller) {
                return res.status(400).json({ message: "Seller already exists" });
            }
    
            let imageUrl = '';
            if (req.file) {
                try {
                    // Convert image to base64 and upload to Cloudinary
                    const b64 = Buffer.from(req.file.buffer).toString("base64");
                    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        
                    const cldRes = await cloudinary.uploader.upload(dataURI, {
                        resource_type: "auto",
                    });
        
                    imageUrl = cldRes.secure_url;
                    
                } catch (uploadError) {
                    console.error("Error uploading primary image to Cloudinary:", uploadError);
                    return res.status(500).json({ error: "Error uploading primary image" });
                }
            }
    
        const newSeller = new Seller({
            name,
            type,
            rating,
            donationType,
            donationAmount,
            contact,
            email,
            products,
            ngoList,
            image: imageUrl
        });
        await newSeller.save();
        res.status(201).json(newSeller);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateSeller = async (req, res) => {
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(req.params.sellerId, req.body, { new: true });
        res.json(updatedSeller);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteSeller = async (req, res) => {
    try {
        await Seller.findByIdAndRemove(req.params.sellerId);
        res.json({ message: "Seller deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
