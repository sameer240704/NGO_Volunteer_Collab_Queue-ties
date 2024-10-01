import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import cloudinary from "cloudinary";

const JWT_SECRET = process.env.JWT_SECRET || 'jeetenge_hum_hum_hi_jeetenge';

export const registerUser = async (req, res) => {
    const { name, password, email, phone, role, address1, address2, city, state } = req.body;

    const primaryImageFile = req.files.primaryImage ? req.files.primaryImage[0] : null;
    const ngoImagesFiles = req.files.ngoImages || [];

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let primaryImageUrl = null;
        let ngoImagesUrls = [];

        if (primaryImageFile) {
            try {
                const b64 = Buffer.from(primaryImageFile.buffer).toString("base64");
                const dataURI = "data:" + primaryImageFile.mimetype + ";base64," + b64;

                const cldRes = await cloudinary.uploader.upload(dataURI, {
                    resource_type: "auto",
                });

                primaryImageUrl = cldRes.secure_url;
            } catch (uploadError) {
                console.error("Error uploading primary image to Cloudinary:", uploadError);
                return res.status(500).json({ error: "Error uploading primary image" });
            }
        }

        if (ngoImagesFiles.length > 0) {
            for (const imageFile of ngoImagesFiles) {
                try {
                    const b64 = Buffer.from(imageFile.buffer).toString("base64");
                    const dataURI = "data:" + imageFile.mimetype + ";base64," + b64;

                    const cldRes = await cloudinary.uploader.upload(dataURI, {
                        resource_type: "auto",
                    });

                    ngoImagesUrls.push(cldRes.secure_url);
                } catch (uploadError) {
                    console.error("Error uploading NGO image to Cloudinary:", uploadError);
                    return res.status(500).json({ error: "Error uploading NGO images" });
                }
            }
        }

        const userData = {
            name,
            password: hashedPassword,
            email,
            phone,
            role,
            city,
            state,
            primaryImage: primaryImageUrl,
        };

        if (role === 'admin') {
            userData.address1 = address1;
            userData.address2 = address2;
            userData.ngoImages = ngoImagesUrls || [];
        }

        const newUser = new User(userData);
        await newUser.save();

        const qrData = JSON.stringify({ email, hashedPassword });
        const qrCode = await QRCode.toDataURL(qrData);

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ message: "User created successfully", token, userId: newUser._id, qrCode: qrCode });
    } catch (error) {
        console.error("Error in sign up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
            expiresIn: "1h",
        });


        return res.status(200).json({
            message: "Login successful",
            token,
            userId: existingUser._id,
            role: existingUser.role,
            name: existingUser.name,
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Authentication Check
export const checkAuthentication = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No authentication token found" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User authenticated",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.error("Error in authentication check:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get the user based on id
export const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                address1: user.address1,
                address2: user.address2,
                city: user.city,
                state: user.state,
                primaryImage: user.primaryImage,
                ngoImages: user.ngoImages,
                skills: user.skills
            }
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};  

export const addAdditionalUserDetails = (req, res, next) => {
    const { address, dateOfBirth } = req.body;
    try {

    } catch (error) {
        console.log("Error adding additional details: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logoutUser = async (req, res) => {
    res.clearCookie('token').json({ message: "Logged out successfully" });
};

export const getVolunteerById = async (req, res) => {
    try {
        const { volunteerId } = req.params;
        const volunteer = await User.findById(volunteerId).select('name');

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        res.status(200).json(volunteer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPrimaryImageByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from request parameters
        const user = await User.findById(userId).select('primaryImage'); // Select only the primaryImage field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ primaryImage: user.primaryImage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await User.find({ role: 'volunteer' });

        res.status(200).json(volunteers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving volunteers', error: error.message });
    }
};