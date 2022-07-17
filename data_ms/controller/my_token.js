const jwt = require("jsonwebtoken");

const JWT_Secret ="jwtSecret"
const JWT_ExpiresDay="7 days"

class my_token {
	constructor() {
        console.log("-----------: my_token constructor");
    }

	Token_Create({ id ,name, role }) {
		const payload = {id:id,user: name,role: role};
		// console.log("Token_Create : ",{id:id,user: name,role: role})
		const token = jwt.sign(payload, JWT_Secret, { expiresIn: JWT_ExpiresDay });
		// console.log({ token: token})
		return token;
	}
	
	Token_Verifay(_token){
		try {
			const tv = jwt.verify(_token, JWT_Secret);
			// console.log("Token_Verifay : ",tv)
			return tv;
		} catch (error) {// console.log('------------- anonymous');
			return {id: null,user: 'anonymous',role: null}
		}
	}
}

module.exports = new my_token();