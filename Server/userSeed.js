import User from "./models/User.js";
import bcrypt from 'bcrypt';
import connectToDB from "./db/db.js";

const userRegister = async () => {
    connectToDB()
    try {
        const hashPassword = await bcrypt.hash("admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch (error) {
        console.log(error);

    }
}

userRegister()

//to create this run node --env-file=.env userSeed.js on terminal(node-->run node , --env-file=.env-->loads env variables from env file  ,userSeed.js-->run this file)
//this code can use to add anitial data to db