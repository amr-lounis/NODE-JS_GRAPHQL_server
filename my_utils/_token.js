require('dotenv').config();
const jwt = require("jsonwebtoken");

function Token_Create({ id ,name, role }) {
	const payload = {
		id:id,
		user: name,
		role: role
	};
	const token = jwt.sign(payload, process.env.JWT_Secret, { expiresIn: process.env.JWT_ExpiresDay });
	console.log({ token: token})
	return token;
}

function Token_Verifay(_token) {
	try {
		// console.log('token : ',_token)
		return jwt.verify(_token, process.env.JWT_Secret);
	} catch (error) {
		error_msg = " error : Token_Verifay : "+ error.message ;
		console.log(error_msg);
		throw new Error(error_msg);
	}
}

async function Token_GraphqlMiddleware(resolve, root, args, context, info) {
	try {
		// console.log("Token_GraphqlMiddleware : context : ",context)
		// console.log("Token_GraphqlMiddleware : fieldName : ",info.fieldName)
		//-------------
		switch(info.fieldName){
			case 'user_signin' : {
				console.log('---------- not need to check authorization :  user_signin');
				break;
			}
			case 'user_create' : {
				console.log('---------- not need to check authorization :  user_create');
				break;
			}
			default : {
				context.decoded = Token_Verifay(context.headers.authorization);
				// console.log("Token_GraphqlMiddleware : decoded : ",context.decoded)
				break;
			}
		}
	} catch (error) {
		error_msg = " error : Token_GraphqlMiddleware : "+ error.message ;
		// console.log(error_msg);
		throw new Error(error_msg);
	}
	const result = await resolve(root, args, context, info)
	return result
}

module.exports = {Token_Create,Token_Verifay,Token_GraphqlMiddleware }