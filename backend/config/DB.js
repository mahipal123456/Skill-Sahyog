const mongoose= require('mongoose');
require('dotenv').config();
async function ConnectDb() {
    try {
        await mongoose.connect(process.env.MongoDB_Url);
        console.log("sucesfully connected to database");
    } catch (error) {
        console.log("internal server error",error);
    }
}
module.exports= ConnectDb;