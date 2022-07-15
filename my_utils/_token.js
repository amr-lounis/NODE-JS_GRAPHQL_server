require('dotenv').config();
const jwt = require("jsonwebtoken");

function Token_Create({ id ,name, role }) {
	const payload = {id:id,user: name,role: role};
	const token = jwt.sign(payload, process.env.JWT_Secret, { expiresIn: process.env.JWT_ExpiresDay });
	console.log({ token: token})
	return token;
}

function Token_Verifay(_token){
	try {
		return jwt.verify(_token, process.env.JWT_Secret); 
	} catch (error) {// console.log('------------- anonymous');
		return {id: null,user: 'anonymous',role: null}
	}
}

module.exports = {Token_Create,Token_Verifay }