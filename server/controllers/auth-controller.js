// controllers are typically used to process incoming requests, interaacts with models(data sources),
// and send responses back to clients.
//// =>They help organise your application by separating concerns and following the
// MVC(Modal-View_Architecture) design patterns.

const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// Home Logic
const home = async(req,res)=>{
    try{
        res
        .status(200)
        .send("Router concept in mern stack");
    }
    catch(error){
        console.log(error);
    }
};

// registration logic 
const register = async(req,res)=>{
    try{
        console.log(req.body);
        const { username, email, phone, password } = req.body; 

        const userExist = await User.findOne({ email });

        if(userExist){
            return res.status(400).json({ message: "email already exists" });
        }

        // Hash the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);
 
            // it is a method to hash the password
        // const userCreated = await User.create({ username, email, phone, password: hash_password, });

        const userCreated = await User.create({ username, email, phone, password, });





        res.status(201).json({ 
            // msg: userCreated, 
            msg: "Regestration Successfull", 
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(), 
        });
        
        // console.log(req.body);
        // res.status(200).json({message:"welcome to mern stack learning register page using controllers."});
        // res.status(200).json({message:req.body});
    }   
    catch(error){
        // res.status(500).json({msg:"Internal Server Error."});
        next(error);
    } 
};


// User login logic

const login = async (req, res) =>{
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // const user =  await bcrypt.compare(password, userExist.password);
        const user = await userExist.comaparePassword(password);



        if(user){
            res.status(200).json({
                message:"Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }
        else{
            res.status(401).json({
                message: "Invalid email or password"
            });
        }


    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

// user logic to send the user data

const user = async (req, res) =>{
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(`error form the user root ${error}`);
    }
}


module.exports = { home, register, login, user };