const User =require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs')
const dotenv =require('dotenv')

dotenv.config();

const secretKey = process.env.JWT_SECRET;


const userRegister = async(req, res)=>{
 const {username, email, password} = req.body;
   try {
        const userEmail = await User.findOne({email});
        if (userEmail) {
            return res.status(400).json("Email already taken");
        } 
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({message: "User Registered successfuly!"});
        console.log('Registered');

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
}


const userLogin =async(req, res)=>{
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({message: 'Invalid username or password'})
        }
         const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: '1h'})


        res.status(200).json({success: 'Login successful', token});
        console.log(email, "this is token", token);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
}

module.exports ={userRegister, userLogin}