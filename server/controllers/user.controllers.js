import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import Seller from './../modals/seller.modal.js'
import User from './../modals/user.modal.js'

export const register = async (req, res) => {
    try {
        const { name, password, email } = req.body.userData;
        if (!password || !email || !name) {
            return res.status(404).json({ success: false, error: "Email, Name and Password all are required." })
        }
        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            return res.status(404).json({ success: false, error: "User already exist, try login." })
        }
        const hashedPassword = await bcrypt.hashSync(password, 10)
        const user = new User({
            name, email, password: hashedPassword
        })
        await user.save();
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        return res.status(201).json({ success: true, message: 'Registeration Successfull, No need to login.', token, user: { id: user._id, name: user.name, email: user.email, role: "user" } })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something Went Wrong." })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body.userData;
        if (!email || !password) {
            return res.status(404).json({ success: false, error: "Email and password both are required." })
        }
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            return res.status(404).json({ success: false, error: "User not exist, Check your email." })
        }
        const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password)
        if (!isPasswordCorrect) {
            return res.status(404).json({ success: false, error: "Password is incorrect." })
        }
        const token = await jwt.sign({ userId: isUserExist._id }, process.env.JWT_SECRET)
        return res.status(200).json({ success: true, message: 'Login Successfull.', token, user: { id: isUserExist._id, name: isUserExist.name, email: isUserExist.email, role: "user" } })
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
}

export const sellerRegister = async (req, res) => {
    try {
        const { name, password, email } = req.body.sellerData;
        if (!password || !email || !name) {
            return res.status(404).json({ success: false, error: "Email, Name and Password all are required." })
        }
        const isEmailExist = await Seller.findOne({ email });
        if (isEmailExist) {
            return res.status(404).json({ success: false, error: "User already exist, try login." })
        }
        const hashedPassword = await bcrypt.hashSync(password, 10)
        const user = new Seller({
            name, email, password: hashedPassword
        })
        await user.save();
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        return res.status(201).json({ success: true, message: 'Registeration Successfull, No need to login.', token, user: { id: user._id, name: user.name, email: user.email, role: "seller" } })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something Went Wrong." })
    }
}

export const sellerLogin = async (req, res) => {
    try {
        const { password, email } = req.body.sellerData;
        if (!email || !password) {
            return res.status(404).json({ success: false, error: "Email and password both are required." })
        }
        const isUserExist = await Seller.findOne({ email });
        if (!isUserExist) {
            return res.status(404).json({ success: false, error: "User not exist, Check your email." })
        }
        const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password)
        if (!isPasswordCorrect) {
            return res.status(404).json({ success: false, error: "Password is incorrect." })
        }
        const token = await jwt.sign({ userId: isUserExist._id }, process.env.JWT_SECRET)
        return res.status(200).json({ success: true, message: 'Login Successfull.', token, user: { id: isUserExist._id, name: isUserExist.name, email: isUserExist.email, role: "seller" } })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something Went Wrong." })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const token = req.token;
        if (!token) {
            return res.status(404).json({ success: false, error: "Token is required." })
        }
        const { userId } = await jwt.verify(token, process.env.JWT_SECRET);
        if (!userId) {
            return res.status(404).json({ success: false, error: "Token not valid." })
        }
        const isUserValid = await User.findById(userId);
        if (!isUserValid) {
            const isSellerValid = await Seller.findById(userId);
            if (!isSellerValid) {
                return res.status(404).json({ success: false, error: "Token not valid." })
            } else {
                return res.status(200).json({ success: true, user: { id: isSellerValid._id, name: isSellerValid.name, email: isSellerValid.email, role: "seller" } })
            }
        } else {
            return res.status(200).json({ success: true, user: { id: isUserValid._id, name: isUserValid.name, email: isUserValid.email, role: "user" } })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something Went Wrong." })
    }
}