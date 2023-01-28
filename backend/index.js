const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dbConnect = require("./db");
const UserModel = require("./src/model/user");
const jwt =require("jsonwebtoken")



require("dotenv").config()
const PORT = process.env.PORT ;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.send("welcome home")
})

app.use(cors())
//sign up request

app.post("/signup", async (req, res) => {
	const { name,email,password } = req.body;
	try {
		const new_user = new UserModel({ name,email,password})
		await new_user.save();
		res.json({msg:"sign up successful"})
	} catch (error) {
		res.send("something went wrong")
	}
})
	

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await UserModel.findOne({ email,password });
		if(!user){
			res.send("user not found")
		}else{
			res.send({message:"user login succesfull",token:`${email}:${password}`})
		}
	} catch (error) {
	}
})

app.post("/logout",async(req,res)=>{
	res.send("logout succesful")
})

app.get("/calbmi",(req,res)=>{
	const {weight,height}=req.body;
	try {
		const bmi= weight/ height
		if(bmi<18.5){
		return	res.send({bmi:bmi,result:"UnderWeight"})
		}else if(bmi>=18.5&& bmi<=24.9){
			return	res.send({bmi:bmi,result:"Normalweight"})
		}else if(bmi>=25&& bmi<=29.9){
			return	res.send({bmi:bmi,result:"OverWeight"})
			}
			else if(bmi>=30&& bmi<=34.9){
				return	res.send({bmi:bmi,result:"Obesity"})
				}
				else if(bmi>=35&& bmi<=39.9){
					return	res.send({bmi:bmi,result:"ExtremeObesity"})
					}
	} catch (error) {
		res.send("please enter valid value")
	}
})

dbConnect().then(()=>{
	app.listen(PORT || 6000, () => {
		console.log(`Server started on port ${PORT}`);
})
});