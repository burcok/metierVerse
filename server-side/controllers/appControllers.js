import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import ENV from "../config.js";

/** middleware for verify user */
export async function verifyUser(req, res, next) {
    try {
        const { email } = req.method == "GET" ? req.query : req.body;

        let exist = await UserModel.findOne({ email });
        if (!exist) return res.status(400).json({ error: "User not found!" });

        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized." });
    }
}

//todo : eksik bilgi gönderilmesi durumlarına aksiyon al
/** POST: http://localhost:8080/api/register
 * @params : {
  "username": "example123",
  "password": "admin123",
  "email": "example@gmail.com",
  "firstName": "bill",
  "lastName": "william",
  "phone": "05555555555",
  "profile": ""
}
*/
export async function register(req, res) {
    try {
        const { username, password, email, profile } = req.body;

        // Check for username
        const existingUsername = await UserModel.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({ error: "Please use a valid username." });
        }

        // Check for email
        const existingEmail = await UserModel.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ error: "Please use a valid email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email
        });

        // Save the user to the database
        await user.save();

        // Return a success response
        return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}

/** POST: http://localhost:8080/api/login
 * @params : {
  "username": "example123",
  "password": "admin123",
}
*/
export async function login(req, res) {
    const { email, password } = req.body;
    try {
        // Check for username
        const user = await UserModel.findOne({ email }).exec();

        if (!user) {
            return res.status(400).json({ error: "Username or password is incorrect." });
        }

        // Check for password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Username or password is incorrect." });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            ENV.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return a success response with token and username
        return res.status(200).json({
            message: "User logged in successfully.",
            username: user.username,
            token
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res){
    const { username } = req.params;
    try {
        const user = await UserModel.findOne({ username });
        
        if (!user) return res.status(404).send("User not found.");

        // mongoose return unnecessary data with object so convert it into json
        const { password, ...rest } = Object.assign({}, user.toJSON());

        return res.status(200).json(rest);
   
    } catch (error) {
        return res.status(404).send("User data not found.");
    } 
}

/** PUT: http://localhost:8080/api/updateUser
 * @params : {
    "firstName": "",
    profile: ""
} 
*/
export async function updateUser(req, res){
    try {
        
        //const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;
            const user = await UserModel.findOneAndUpdate({_id: userId}, body, {new: true});
            return res.status(200).json(user);
        }
        else{
            return res.status(404).json({ error: "User id not found." });
        }

    } catch (error) {
        return res.status(401).json({ error });
    }
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res){
    req.app.locals.OTP = await otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(200).send({ code: req.app.locals.OTP })
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession= true;
        return res.status(200).send({ message: "OTP Verified." })
    }
    return res.status(401).send({ message: "OTP Verification Failed." })
}

// succesfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res){
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false;
        return res.status(200).send({ message: "Session created." })
    }
    return res.status(401).send({ message: "Session expired." })
}

/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
    try {
        if(!req.app.locals.resetSession) return res.status(401).send({ message: "Session expired." });
        const { username, password } = req.body;

        try {
            const user = await UserModel.findOne({ username });

            if (!user) {
                return res.status(404).send({ error: "Username not found!" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

            return res.status(200).send({ message: "Password updated." });

        } catch (error) {
            return res.status(500).send({ error: "Unable to hash password." });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}